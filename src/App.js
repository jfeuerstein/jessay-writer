import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';
import Browse from './components/Browse';
import Header from './components/Header';
import Auth from './components/Auth';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

function App() {
  const [currentView, setCurrentView] = useState('browse'); // Default to browse mode
  const [essays, setEssays] = useState([]);
  const [publishStreak, setPublishStreak] = useState(0);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firestore essays collection
  useEffect(() => {
    const q = query(collection(db, 'essays'), orderBy('publishedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const essaysData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEssays(essaysData);
    }, (error) => {
      console.error('Error loading essays:', error);
      // Fallback to localStorage if Firestore fails
      const savedEssays = localStorage.getItem('essays');
      if (savedEssays) {
        setEssays(JSON.parse(savedEssays));
      }
    });

    return () => unsubscribe();
  }, []);

  // Calculate publish streak
  useEffect(() => {
    const calculateStreak = () => {
      if (essays.length === 0) return 0;

      // Sort essays by date (newest first)
      const sortedEssays = [...essays].sort((a, b) =>
        new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let streak = 0;
      let currentDate = new Date(today);

      for (let i = 0; i < sortedEssays.length; i++) {
        const essayDate = new Date(sortedEssays[i].publishedAt);
        essayDate.setHours(0, 0, 0, 0);

        const daysDiff = Math.floor((currentDate - essayDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
          // Essay published today
          if (streak === 0) streak = 1;
        } else if (daysDiff === 1) {
          // Essay published yesterday
          streak++;
          currentDate = new Date(essayDate);
        } else if (streak === 0 && daysDiff < 0) {
          // Essay published in the future (edge case)
          continue;
        } else {
          // Gap in streak
          break;
        }
      }

      return streak;
    };

    setPublishStreak(calculateStreak());
  }, [essays]);

  const publishEssay = async (essay) => {
    if (!user) {
      setShowAuth(true);
      return null;
    }

    try {
      const newEssay = {
        ...essay,
        publishedAt: new Date().toISOString(),
        userId: user.uid,
        userEmail: user.email
      };

      const docRef = await addDoc(collection(db, 'essays'), newEssay);
      return { id: docRef.id, ...newEssay };
    } catch (error) {
      console.error('Error publishing essay:', error);
      // Fallback to localStorage
      const newEssay = {
        ...essay,
        id: Date.now(),
        publishedAt: new Date().toISOString(),
      };
      const updatedEssays = [newEssay, ...essays];
      setEssays(updatedEssays);
      localStorage.setItem('essays', JSON.stringify(updatedEssays));
      return newEssay;
    }
  };

  const updateEssay = async (id, updatedData) => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    try {
      const essayRef = doc(db, 'essays', id);
      await updateDoc(essayRef, {
        title: updatedData.title,
        content: updatedData.content,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating essay:', error);
      // Fallback to localStorage
      const updatedEssays = essays.map(e =>
        e.id === id ? { ...e, ...updatedData, updatedAt: new Date().toISOString() } : e
      );
      setEssays(updatedEssays);
      localStorage.setItem('essays', JSON.stringify(updatedEssays));
    }
  };

  const deleteEssay = async (id) => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    try {
      await deleteDoc(doc(db, 'essays', id));
    } catch (error) {
      console.error('Error deleting essay:', error);
      // Fallback to localStorage
      const updatedEssays = essays.filter(e => e.id !== id);
      setEssays(updatedEssays);
      localStorage.setItem('essays', JSON.stringify(updatedEssays));
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onAuthClick={() => setShowAuth(true)}
      />
      <main className="main-content">
        {currentView === 'editor' ? (
          <Editor
            onPublish={publishEssay}
            streak={publishStreak}
            user={user}
            onAuthClick={() => setShowAuth(true)}
          />
        ) : (
          <Browse
            essays={essays}
            onDelete={deleteEssay}
            onUpdate={updateEssay}
            user={user}
          />
        )}
      </main>
      {showAuth && (
        <Auth user={user} onClose={() => setShowAuth(false)} />
      )}
    </div>
  );
}

export default App;
