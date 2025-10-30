import React, { useState } from 'react';
import './Editor.css';
import RichTextEditor from './RichTextEditor';

function Editor({ onPublish, streak, user, onAuthClick }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [wordCountHover, setWordCountHover] = useState(false);
  const [clearButtonHover, setClearButtonHover] = useState(false);
  const [wordCountHoverTimer, setWordCountHoverTimer] = useState(null);
  const [clearButtonPressTimer, setClearButtonPressTimer] = useState(null);

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

      // Show streak celebration if streak >= 2
      if (streak >= 1) {
        setShowStreakCelebration(true);
        setTimeout(() => {
          setShowStreakCelebration(false);
        }, 3000);
      }

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

  // Word count hover easter egg
  const handleWordCountMouseEnter = () => {
    const timer = setTimeout(() => {
      setWordCountHover(true);
    }, 3000); // Show after 3 seconds
    setWordCountHoverTimer(timer);
  };

  const handleWordCountMouseLeave = () => {
    if (wordCountHoverTimer) {
      clearTimeout(wordCountHoverTimer);
    }
    setWordCountHover(false);
  };

  // Clear button long-press easter egg
  const handleClearMouseDown = () => {
    const timer = setTimeout(() => {
      setClearButtonHover(true);
    }, 2000); // Show after 2 seconds
    setClearButtonPressTimer(timer);
  };

  const handleClearMouseUp = () => {
    if (clearButtonPressTimer) {
      clearTimeout(clearButtonPressTimer);
    }
    setTimeout(() => {
      setClearButtonHover(false);
    }, 2000);
  };

  const handleClearMouseLeave = () => {
    if (clearButtonPressTimer) {
      clearTimeout(clearButtonPressTimer);
    }
    setClearButtonHover(false);
  };

  const getWordCount = () => {
    // Strip HTML tags for word count
    const text = content.replace(/<[^>]*>/g, '').trim();
    return text ? text.split(/\s+/).length : 0;
  };

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="editor">
        <div className="editor-login-prompt">
          <pre className="login-art">
{`╔═══════════════════════════════╗
║  login required to write      ║
╚═══════════════════════════════╝`}
          </pre>
          <p className="login-text">
            you need to be logged in to create and publish essays.
          </p>
          <button onClick={onAuthClick} className="login-button">
            [ login ]
          </button>
          <p className="browse-hint">
            you can still browse published essays!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor">
      <div className="editor-controls">
        <button onClick={handlePublish}>
          ┌─┐ publish
        </button>
        <button
          onClick={handleClear}
          onMouseDown={handleClearMouseDown}
          onMouseUp={handleClearMouseUp}
          onMouseLeave={handleClearMouseLeave}
          className={clearButtonHover ? 'clear-hover-active' : ''}
        >
          └─┘ clear
          {clearButtonHover && (
            <span className="button-tooltip">
              (are you sure? there's no undo)
            </span>
          )}
        </button>
        <div
          className="word-count"
          onMouseEnter={handleWordCountMouseEnter}
          onMouseLeave={handleWordCountMouseLeave}
        >
          {getWordCount()} words
          {wordCountHover && (
            <span className="word-count-tooltip">
              (yes, we're counting)
            </span>
          )}
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
        
        <RichTextEditor
          className="content-input"
          placeholder="start writing..."
          value={content}
          onChange={setContent}
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

      {showStreakCelebration && (
        <div className="streak-celebration">
          <div className="streak-content">
            <div className="streak-fire">🔥</div>
            <div className="streak-text">
              {streak + 1} day streak!
            </div>
            <div className="streak-message">
              {streak + 1 === 1 && "nice start!"}
              {streak + 1 === 2 && "two in a row!"}
              {streak + 1 === 3 && "on fire!"}
              {streak + 1 === 4 && "keep it up!"}
              {streak + 1 === 5 && "5 days strong!"}
              {streak + 1 === 7 && "a full week!"}
              {streak + 1 === 10 && "double digits!"}
              {streak + 1 === 14 && "two weeks!"}
              {streak + 1 === 21 && "three weeks!"}
              {streak + 1 === 30 && "a whole month!"}
              {streak + 1 === 69 && "nice."}
              {streak + 1 === 100 && "legend status!"}
              {streak + 1 > 100 && "absolute legend!"}
              {![1, 2, 3, 4, 5, 7, 10, 14, 21, 30, 69, 100].includes(streak + 1) && streak + 1 <= 100 && "keep going!"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editor;
