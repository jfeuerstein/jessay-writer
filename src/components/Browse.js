import React, { useState } from 'react';
import './Browse.css';

function Browse({ essays, onDelete }) {
  const [selectedEssay, setSelectedEssay] = useState(null);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`delete "${title}"? this cannot be undone.`)) {
      onDelete(id);
      if (selectedEssay?.id === id) {
        setSelectedEssay(null);
      }
    }
  };

  if (selectedEssay) {
    return (
      <div className="essay-view">
        <button className="back-button" onClick={() => setSelectedEssay(null)}>
          ← back to all essays
        </button>
        <div className="essay-header">
          <h1 className="essay-title">{selectedEssay.title}</h1>
          <div className="essay-meta">
            published {formatDate(selectedEssay.publishedAt)}
          </div>
        </div>
        <div
          className="essay-content"
          dangerouslySetInnerHTML={{ __html: selectedEssay.content }}
        />
        <div className="essay-actions">
          <button 
            onClick={() => handleDelete(selectedEssay.id, selectedEssay.title)}
            className="delete-button"
          >
            ✗ delete essay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="browse">
      <div className="browse-header">
        <h2>published essays</h2>
        <div className="essay-count">
          {essays.length} {essays.length === 1 ? 'essay' : 'essays'}
        </div>
      </div>
      
      {essays.length === 0 ? (
        <div className="empty-state">
          <pre className="empty-art">
{`┌─────────────────────────┐
│  no essays yet...       │
│  start writing!         │
└─────────────────────────┘`}
          </pre>
        </div>
      ) : (
        <div className="essay-list">
          {essays.map((essay) => (
            <div 
              key={essay.id} 
              className="essay-card"
              onClick={() => setSelectedEssay(essay)}
            >
              <div className="card-border-top">┌{'─'.repeat(50)}┐</div>
              <div className="card-content">
                <h3 className="card-title">{essay.title}</h3>
                <div className="card-date">{formatDate(essay.publishedAt)}</div>
                <div className="card-preview">
                  {stripHtml(essay.content).substring(0, 150)}
                  {stripHtml(essay.content).length > 150 ? '...' : ''}
                </div>
              </div>
              <div className="card-border-bottom">└{'─'.repeat(50)}┘</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Browse;
