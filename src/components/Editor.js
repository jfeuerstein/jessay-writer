import React, { useState, useEffect } from 'react';
import './Editor.css';

function Editor({ onPublish, streak }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [titleEasterEgg, setTitleEasterEgg] = useState('');
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [wordCountHover, setWordCountHover] = useState(false);
  const [clearButtonHover, setClearButtonHover] = useState(false);
  const [wordCountHoverTimer, setWordCountHoverTimer] = useState(null);
  const [clearButtonPressTimer, setClearButtonPressTimer] = useState(null);

  // Special title easter eggs
  useEffect(() => {
    const lowerTitle = title.toLowerCase().trim();
    const specialTitles = {
      'untitled': '(how original)',
      'test': '(this is only a test)',
      'help': '(we all need it sometimes)',
      'hello': '(world)',
      'essay': '(that\'s what we do here)',
      'josh': '(that\'s me!)',
      'diary': '(dear diary...)',
      'journal': '(captain\'s log, stardate...)',
      'thoughts': '(penny for your thoughts?)',
      'todo': '(to do or not to do)',
      'untitled essay': '(very meta)',
      'my essay': '(not mine)',
      'essay 1': '(there will be more)',
      'draft': '(version 0.1)',
      'new essay': '(it certainly is)',
      'lorem ipsum': '(dolor sit amet)',
      'the': '(the what?)',
      'a': '(just one letter? bold choice)',
      '': '(no thoughts, head empty)',
      'readme': '(or write me)',
      'secret': '(shh, don\'t tell anyone)',
      'confession': '(forgive me, for i have sinned)',
      'manifesto': '(viva la revolucion)',
      'poem': '(roses are red...)',
      'song': '(la la la)',
      'story': '(once upon a time...)',
      'chapter 1': '(the beginning)',
      'note to self': '(don\'t forget)',
      'ideas': '(good ones, hopefully)',
      'wisdom': '(with great power...)',
      'truth': '(you can\'t handle it)',
      'lies': '(pants on fire)',
      'rant': '(let it all out)',
      'vibe': '(check)',
      'mood': '(big mood)',
    };

    if (lowerTitle in specialTitles) {
      setTitleEasterEgg(specialTitles[lowerTitle]);
    } else if (lowerTitle === '' && title === '') {
      setTitleEasterEgg('(no thoughts, head empty)');
    } else {
      setTitleEasterEgg('');
    }
  }, [title]);

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
          {content.trim() ? content.trim().split(/\s+/).length : 0} words
          {wordCountHover && (
            <span className="word-count-tooltip">
              (yes, we're counting)
            </span>
          )}
        </div>
      </div>
      
      <div className="editor-container">
        <div className="title-section">
          <input
            type="text"
            className="title-input"
            placeholder="untitled..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleEasterEgg && (
            <span className="title-easter-egg">{titleEasterEgg}</span>
          )}
        </div>

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
