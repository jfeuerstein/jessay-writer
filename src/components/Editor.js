import React, { useState } from 'react';
import './Editor.css';

function Editor({ onPublish }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert('please add a title and content before publishing');
      return;
    }
    setShowPublishModal(true);
  };

  const confirmPublish = () => {
    setPublishing(true);
    const essay = {
      title: title.trim(),
      content: content.trim(),
    };
    onPublish(essay);
    
    setTimeout(() => {
      setPublishing(false);
      setShowPublishModal(false);
      setTitle('');
      setContent('');
    }, 500);
  };

  const handleClear = () => {
    if (window.confirm('clear everything? this cannot be undone.')) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="editor">
      <div className="editor-controls">
        <button onClick={handlePublish}>
          ┌─┐ publish
        </button>
        <button onClick={handleClear}>
          └─┘ clear
        </button>
        <div className="word-count">
          {content.trim() ? content.trim().split(/\s+/).length : 0} words
        </div>
      </div>
      
      <div className="editor-container">
        <input
          type="text"
          className="title-input"
          placeholder="untitled..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <textarea
          className="content-input"
          placeholder="start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />
      </div>

      {showPublishModal && (
        <div className="modal-overlay" onClick={() => !publishing && setShowPublishModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <pre className="modal-art">
{`╔═══════════════════════╗
║   publish essay?      ║
╚═══════════════════════╝`}
            </pre>
            <p className="modal-text">
              this will save "{title}" to your collection.
            </p>
            <div className="modal-buttons">
              <button onClick={confirmPublish} disabled={publishing}>
                {publishing ? '...' : '✓ yes'}
              </button>
              <button onClick={() => setShowPublishModal(false)} disabled={publishing}>
                ✗ no
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editor;
