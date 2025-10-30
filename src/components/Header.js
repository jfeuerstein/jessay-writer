import React, { useState } from 'react';
import './Header.css';

function Header({ currentView, setCurrentView, user, onAuthClick }) {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const logoVariations = [
    // Hunter x Hunter
    {
      art: `   _
  (_) ___  ___ ___  __ _ _   _
  | |/ _ \\/ __/ __|/ _\` | | | |
  | |  __/\\__ \\__ \\ (_| | |_| |
 _/ |\\___||___/___/\\__,_|\\__, |
|__/                     |___/ `,
      tagline: "(i can use nen to write better essays)"
    },
    // Seinfeld
    {
      art: `   _
  (_) ___  ___  ___  __ _ _   _
  | |/ _ \\/ __|/ __|/ _\` | | | |
  | | (_) \\__ \\ (__| (_| | |_| |
 _/ |\\___/|___/\\___|\\__,_|\\__, |
|__/                      |___/ `,
      tagline: "(an essay about nothing)"
    },
    // Avatar: The Last Airbender
    {
      art: ` __ _  ___ ___ ___  __ _ _   _
|  \\ \\/ _/ __/ __|/ _\` | | | |
| |\\ \\  _\\__ \\__ \\ (_| | |_| |
|_/ \\_\\_||___/___/\\__,_|\\__, |
                        |___/ `,
      tagline: "(master of all four writing styles)"
    },
    // Stardew Valley
    {
      art: `     ___ ___ ___ ___   ___   __ __
  _ | | __/ __/ __| /_\\ \\ \\ / /
 | || | _|\\__ \\__ \\/ _ \\ \\ V /
  \\__/|___|___/___/_/ \\_\\ |_|  `,
      tagline: "(just one more essay before bed)"
    },
    // Minecraft
    {
      art: ` _
(_)___ ___ ___ __ _ _ _
| / -_|_-<_-</ _\` | | |
|_\\___/__/__/\\__,_|_|_|`,
      tagline: "(crafting words one block at a time)"
    },
    // Harry Potter
    {
      art: `     █ ███ ███ ███  █  █ █
     █ █▄  █▄  █▄  █▄█ █ █
█ █  █ █▄▄ ▄▄█ ▄▄█ █ █ ▀▄▀
 ▀  █▀                     `,
      tagline: "(expecto essayum!)"
    },
    // Into the Spiderverse
    {
      art: `   ╔╦╗
 ┬┌─┐┌─┐┌─┐┌─┐┬ ┬
 │├┤ └─┐└─┐├─┤└┬┘
└┘└─┘└─┘└─┘┴ ┴ ┴ `,
      tagline: "(anyone can write an essay)"
    },
    // Zelda: Breath of the Wild
    {
      art: ` _            _     _
(_) ___  ___| |__ ( )___
| |/ _ \\/ __| '_ \\|// __|
| | (_) \\__ \\ | | | \\__ \\
| |\\___/|___/_| |_| |___/
\\__|
 ___  ___ ___  __ _ _   _
/ __|/ __/ __|/ _\` | | | |
\\__ \\\\__ \\__ \\ (_| | |_| |
|___/|___/___/\\__,_|\\__, |
                    |___/ `,
      tagline: "(it's dangerous to write alone, take this)"
    },
    // Demon Slayer
    {
      art: `   _
  (_) ___  ___ ___  __ _ _   _
  | |/ _ \\/ __/ __|/ _\` | | | |
  | |  __/\\__ \\__ \\ (_| | |_| |
 _/ |\\___||___/___/\\__,_|\\__, |
|__/                     |___/ `,
      tagline: "(total concentration: writing breathing)"
    },
    // Fullmetal Alchemist
    {
      art: `   _
  (_) ___  ___ ___  __ _ _   _
  | |/ _ \\/ __/ __|/ _\` | | | |
  | |  __/\\__ \\__ \\ (_| | |_| |
 _/ |\\___||___/___/\\__,_|\\__, |
|__/                     |___/ `,
      tagline: "(equivalent exchange: words for wisdom)"
    }
  ];

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);

    if (newCount === 7) {
      setShowSecret(true);
      setTimeout(() => setShowSecret(false), 5000);
    }

    if (newCount >= logoVariations.length) {
      setLogoClicks(0);
    }
  };

  const currentLogo = logoVariations[logoClicks];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <pre className={`logo ${showSecret ? 'logo-secret' : ''}`}>
{currentLogo.art}
          </pre>
          <p className={`tagline ${showSecret ? 'tagline-secret' : ''}`}>
            {currentLogo.tagline}
          </p>
        </div>
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
          <button
            className="auth-btn"
            onClick={onAuthClick}
          >
            {user ? `[ ${user.email} ]` : '[ login ]'}
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
