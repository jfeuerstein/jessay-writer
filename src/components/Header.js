import React, { useState } from 'react';
import './Header.css';

function Header({ currentView, setCurrentView }) {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const logoVariations = [
    // Original
    {
      art: `   _
  (_) ___  ___ ___  __ _ _   _
  | |/ _ \\/ __/ __|/ _\` | | | |
  | |  __/\\__ \\__ \\ (_| | |_| |
 _/ |\\___||___/___/\\__,_|\\__, |
|__/                     |___/ `,
      tagline: "(its a portmantaeu of josh and essay)"
    },
    // Variation 1: Spaced out
    {
      art: `   _
  (_) ___  ___  ___  __ _ _   _
  | |/ _ \\/ __|/ __|/ _\` | | | |
  | | (_) \\__ \\ (__| (_| | |_| |
 _/ |\\___/|___/\\___|\\__,_|\\__, |
|__/                      |___/ `,
      tagline: "(j o s h   e s s a y)"
    },
    // Variation 2: Different style
    {
      art: ` __ _  ___ ___ ___  __ _ _   _
|  \\ \\/ _/ __/ __|/ _\` | | | |
| |\\ \\  _\\__ \\__ \\ (_| | |_| |
|_/ \\_\\_||___/___/\\__,_|\\__, |
                        |___/ `,
      tagline: "(minimal mode activated)"
    },
    // Variation 3: All caps
    {
      art: `     ___ ___ ___ ___   ___   __ __
  _ | | __/ __/ __| /_\\ \\ \\ / /
 | || | _|\\__ \\__ \\/ _ \\ \\ V /
  \\__/|___|___/___/_/ \\_\\ |_|  `,
      tagline: "(why are we yelling?)"
    },
    // Variation 4: Tiny
    {
      art: ` _
(_)___ ___ ___ __ _ _ _
| / -_|_-<_-</ _\` | | |
|_\\___/__/__/\\__,_|_|_|`,
      tagline: "(smol writer)"
    },
    // Variation 5: Blocky
    {
      art: `     █ ███ ███ ███  █  █ █
     █ █▄  █▄  █▄  █▄█ █ █
█ █  █ █▄▄ ▄▄█ ▄▄█ █ █ ▀▄▀
 ▀  █▀                     `,
      tagline: "(block party mode)"
    },
    // Variation 6: Matrix-y
    {
      art: `   ╔╦╗
 ┬┌─┐┌─┐┌─┐┌─┐┬ ┬
 │├┤ └─┐└─┐├─┤└┬┘
└┘└─┘└─┘└─┘┴ ┴ ┴ `,
      tagline: "(neo, is that you?)"
    },
    // Variation 7: The secret
    {
      art: ` _            _     _
(_) ___  ___| |__ ( )___
| |/ _ \\/ __| '_ \\|// __|
| | (_) \\__ \\ | | | \\__ \\
| |\\___/|___/_| |_| |___/
\\__|
     ___ ___ ___ _ __ ___ _   _
 _  / __/ __/ _ \\ '__/ _ \\ | | |
| | \\__ \\  __/ | |  __/ |_| |
| | |___/\\___|_|  \\___|\\__, |
|_|                    |___/
 ___ ___ ___ _ __ ___ _   _
/ __/ __/ _ \\ '__/ _ \\ | | |
\\__ \\  __/ | |  __/ |_| |
|___/\\___|_|  \\___|\\__, |
                   |___/ `,
      tagline: "✨ (you found josh's secret essay essay essay) ✨"
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
        </nav>
      </div>
      <div className="header-border">
        {'─'.repeat(100)}
      </div>
    </header>
  );
}

export default Header;
