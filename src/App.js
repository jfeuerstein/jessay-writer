import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';
import Browse from './components/Browse';
import Header from './components/Header';

function App() {
  const [currentView, setCurrentView] = useState('editor');
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    // Load essays from localStorage on mount
    const savedEssays = localStorage.getItem('essays');
    if (savedEssays) {
      setEssays(JSON.parse(savedEssays));
    }
  }, []);

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
          <Editor onPublish={publishEssay} />
        ) : (
          <Browse essays={essays} onDelete={deleteEssay} />
        )}
      </main>
    </div>
  );
}

export default App;
