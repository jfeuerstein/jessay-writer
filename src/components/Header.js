import React from 'react';
import './Header.css';

function Header({ currentView, setCurrentView }) {
  return (
    <header className="header">
      <div className="header-content">
        <pre className="logo">
{`   _
  (_) ___  ___ ___  __ _ _   _
  | |/ _ \\/ __/ __|/ _\` | | | |
  | |  __/\\__ \\__ \\ (_| | |_| |
 _/ |\\___||___/___/\\__,_|\\__, |
|__/                     |___/ `}
        </pre>
        <nav className="nav">
          <button 
            className={currentView === 'editor' ? 'active' : ''}
            onClick={() => setCurrentView('editor')}
          >
            [ write ]
          </button>
          <button 
            className={currentView === 'browse' ? 'active' : ''}
            onClick={() => setCurrentView('browse')}
          >
            [ browse ]
          </button>
        </nav>
      </div>
      <div className="header-border">
        {'─'.repeat(100)}
      </div>
    </header>
  );
}

export default Header;
