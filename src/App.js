import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';
import Browse from './components/Browse';
import Header from './components/Header';

function App() {
  const [currentView, setCurrentView] = useState('editor');
  const [essays, setEssays] = useState([]);
  const [publishStreak, setPublishStreak] = useState(0);

  useEffect(() => {
    // Load essays from localStorage on mount
    const savedEssays = localStorage.getItem('essays');
    if (savedEssays) {
      setEssays(JSON.parse(savedEssays));
    }
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

  const publishEssay = (essay) => {
    const newEssay = {
      ...essay,
      id: Date.now(),
      publishedAt: new Date().toISOString(),
    };
    const updatedEssays = [newEssay, ...essays];
    setEssays(updatedEssays);
    localStorage.setItem('essays', JSON.stringify(updatedEssays));
    return newEssay;
  };

  const deleteEssay = (id) => {
    const updatedEssays = essays.filter(e => e.id !== id);
    setEssays(updatedEssays);
    localStorage.setItem('essays', JSON.stringify(updatedEssays));
  };

  return (
    <div className="App">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {currentView === 'editor' ? (
          <Editor onPublish={publishEssay} streak={publishStreak} />
        ) : (
          <Browse essays={essays} onDelete={deleteEssay} />
        )}
      </main>
    </div>
  );
}

export default App;
