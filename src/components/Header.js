import React, { useState } from 'react';
import './Header.css';

function Header({ currentView, setCurrentView, user, onAuthClick }) {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const logoVariations = [
    // Hunter x Hunter
    {
      art: `   _          ★
  (_) ___  ___ ___  __ _ _   _
  | |/ _ \\/ __/ __|/ _\` | | | |
  | |  __/\\__ \\__ \\ (_| | |_| |
 _/ |\\___||___/___/\\__,_|\\__, |
|__/                     |___/ `,
      tagline: "(this isn't the hunter exam)"
    },
    // Seinfeld
    {
      art: `   _
  (_) ___  ___  ___  __ _ _   _
  | |/ _ \\/ __|/ __|/ _\` | | | |
  | | (_) \\__ \\ (__| (_| | |_| |
 _/ |\\___/|___/\\___|\\__,_|\\__, |
|__/                      |___/
    [bass riff plays]`,
      tagline: "(an essay about nothing)"
    },
    // Avatar: The Last Airbender
    {
      art: ` __ _  ___ ___ ___  __ _ _   _  ≋
|  \\ \\/ _/ __/ __|/ _\` | | | | ☁
| |\\ \\  _\\__ \\__ \\ (_| | |_| | ▲
|_/ \\_\\_||___/___/\\__,_|\\__, | ※
                        |___/ `,
      tagline: "(still working on the avatar state)"
    },
    // Stardew Valley
    {
      art: `  ✿  ___ ___ ___ ___   ___   __ __
  _ | | __/ __/ __| /_\\ \\ \\ / /
 | || | _|\\__ \\__ \\/ _ \\ \\ V /
  \\__/|___|___/___/_/ \\_\\ |_|
    [spring, day 1]`,
      tagline: "(no sprinklers for writer's block)"
    },
    // Minecraft
    {
      art: ` _
▓▒░___ ___ ___ __ _ _ _
▓ / -_|_-<_-</ _\` | | |
▓▒___/__/__/\\__,_|_|_|
    [survival mode]`,
      tagline: "(no creative mode here)"
    },
    // Harry Potter
    {
      art: `  ϟ  █ ███ ███ ███  █  █ █
     █ █▄  █▄  █▄  █▄█ █ █
█ █  █ █▄▄ ▄▄█ ▄▄█ █ █ ▀▄▀
 ▀  █▀
    platform 9¾`,
      tagline: "(they don't teach this at hogwarts)"
    },
    // Into the Spiderverse
    {
      art: `   ╔╦╗    ╱╲
 ┬┌─┐┌─┐┌─┐┌─┐┬ ┬  ╱  ╲
 │├┤ └─┐└─┐├─┤└┬┘ ╱    ╲
└┘└─┘└─┘└─┘┴ ┴ ┴  ╲    ╱
                    ╲  ╱
                     ╲╱`,
      tagline: "(wrong kind of web)"
    },
    // Zelda: Breath of the Wild
    {
      art: `    ▲
   ▲ ▲  _            _     _
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
      tagline: "(no save points)"
    },
    // Demon Slayer
    {
      art: `   _          ╱
  (_) ___  ___ ___  __ _ _   _
  | |/ _ \\/ __/ __|/ _\` | | | |
  | |  __/\\__ \\__ \\ (_| | |_| |
 _/ |\\___||___/___/\\__,_|\\__, |
|__/                     |___/ `,
      tagline: "(writer's block is the real demon)"
    },
    // Fullmetal Alchemist
    {
      art: `   _    ◉
  (_) ___  ___ ___  __ _ _   _
  | |/ _ \\/ __/ __|/ _\` | | | |
  | |  __/\\__ \\__ \\ (_| | |_| |
 _/ |\\___||___/___/\\__,_|\\__, |
|__/           ◉         |___/ `,
      tagline: "(the first draft requires sacrifice)"
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
