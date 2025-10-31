import React, { useState } from 'react';
import './Browse.css';
import RichTextEditor from './RichTextEditor';

function Browse({ essays, onDelete, onUpdate, user }) {
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

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

  const handleEdit = () => {
    setEditedTitle(selectedEssay.title);
    setEditedContent(selectedEssay.content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      alert('title cannot be empty');
      return;
    }
    if (!editedContent.trim()) {
      alert('content cannot be empty');
      return;
    }

    await onUpdate(selectedEssay.id, {
      title: editedTitle,
      content: editedContent
    });

    // Update local state to reflect changes
    setSelectedEssay({
      ...selectedEssay,
      title: editedTitle,
      content: editedContent
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle('');
    setEditedContent('');
  };

  if (selectedEssay) {
    if (isEditing) {
      return (
        <div className="essay-view essay-edit">
          <button className="back-button" onClick={handleCancelEdit}>
            ✗ cancel
          </button>
          <div className="essay-header">
            <input
              type="text"
              className="essay-title-input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="essay title..."
            />
            <div className="essay-meta">
              editing essay published {formatDate(selectedEssay.publishedAt)}
            </div>
          </div>
          <RichTextEditor
            value={editedContent}
            onChange={setEditedContent}
            placeholder="start writing your essay..."
            className="essay-content-editor"
            autoFocus={false}
          />
          <div className="essay-actions">
            <button
              onClick={handleSave}
              className="save-button"
            >
              ✓ save changes
            </button>
            <button
              onClick={handleCancelEdit}
              className="cancel-button"
            >
              ✗ cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="essay-view">
        <button className="back-button" onClick={() => { setSelectedEssay(null); setIsEditing(false); }}>
          ← back to all essays
        </button>
        <div className="essay-header">
          <h1 className="essay-title">{selectedEssay.title}</h1>
          <div className="essay-meta">
            published {formatDate(selectedEssay.publishedAt)}
            {selectedEssay.updatedAt && ` • edited ${formatDate(selectedEssay.updatedAt)}`}
          </div>
        </div>
        <div
          className="essay-content"
          dangerouslySetInnerHTML={{ __html: selectedEssay.content }}
        />
        {user && (
          <div className="essay-actions">
            <button
              onClick={handleEdit}
              className="edit-button"
            >
              ✎ edit essay
            </button>
            <button
              onClick={() => handleDelete(selectedEssay.id, selectedEssay.title)}
              className="delete-button"
            >
              ✗ delete essay
            </button>
          </div>
        )}
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
