import React, { useState } from 'react';
import './Header.css';

function Header({ currentView, setCurrentView, user, onAuthClick }) {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const logoVariations = [
    // Hunter x Hunter
    {
      art: `     ★                    ★
  ░▒▓█ ███ ███ ███  █  █ █ █▓▒░
     █ █▄  █▄  █▄  █▄█ █ █
     █ █▄▄ ▄▄█ ▄▄█ █ █ ▀▄▀
                            ★
        [ HUNTER LICENSE ]`,
      tagline: "(this isn't the hunter exam)"
    },
    // Seinfeld
    {
      art: `╔═══════════════════════════════╗
║  _                            ║
║ |_|  ___  __  __  ___  _  _  ║
║ | | / -_)(_-< (_-</ _ \\| || | ║
║_/ | \\___|/__/ /__/\\___/ \\_, | ║
  |__/                    |__/  ║
╚═══════════════════════════════╝`,
      tagline: "(an essay about nothing)"
    },
    // Avatar: The Last Airbender
    {
      art: `  ≋≋≋  ☁☁☁  ▲▲▲  ※※※
    __
   |  | ___ ___ ___ __ _ _ _
 ≋ | _|| -_|_ -|_ -|  ´  | | | ☁
 ▲ |__||___|___|___|_|_|_|_  | ※
                         |___|
  ≋≋≋  ☁☁☁  ▲▲▲  ※※※`,
      tagline: "(still working on the avatar state)"
    },
    // Stardew Valley
    {
      art: `╔═══════════════════════════════╗
║ ✿ ▓▓█ ███ ███ ███  █  █ █ ✿ ║
║    ▓█ █▄  █▄  █▄  █▄█ █ █   ║
║ ✿  ▓█ █▄▄ ▄▄█ ▄▄█ █ █ ▀▄▀ ✿ ║
║         [Spring, Day 1]      ║
╚═══════════════════════════════╝`,
      tagline: "(no sprinklers for writer's block)"
    },
    // Minecraft
    {
      art: `▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓
▓ ▓█  ███ ███ ███  █  █ █  ▓ ▓
▓ ▓█  █▄  █▄  █▄  █▄█ █ █  ▓ ▓
▓ ▓█  █▄▄ ▄▄█ ▄▄█ █ █ ▀▄▀  ▓ ▓
▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓`,
      tagline: "(no creative mode here)"
    },
    // Harry Potter
    {
      art: `      _______________
     ╱                ╲
    ╱  ϟ                ϟ
   │  𝕵𝖊𝖘𝖘𝖆𝖞            │
   │                     │
    ╲    Platform 9¾    ╱
     ╲________________╱`,
      tagline: "(they don't teach this at hogwarts)"
    },
    // Into the Spiderverse
    {
      art: `░▒▓ JESSAY ▓▒░
▒░  /█\\ /█\\ /█\\  ░▒
░  /███\\███\\███\\  ░
  /═════════════\\
 ║ █ ███ ███ █ █ ║
 ║ █ █▄  █▄  █▀█ ║
 ║ █ █▄▄ ▄▄█ █ █ ║
  \\═════════════/`,
      tagline: "(wrong kind of web)"
    },
    // Zelda: Breath of the Wild
    {
      art: `       ▲
      ▲ ▲
    ▲  ▲  ▲
  ═══════════════
   ⟨ JESSAY ⟩
  ╱█╲ ███ ███ █ █
 │ █  █▄  █▄  █▀█ │
  ╲█  █▄▄ ▄▄█ █ █╱
   ═══════════════`,
      tagline: "(no save points)"
    },
    // Demon Slayer
    {
      art: `        ╱╲
       ╱  ╲    ╱
   ___╱____╲__╱______
   █ ███ ███ ███  █ █
   █ █▄  █▄  █▄  █▀█
   █ █▄▄ ▄▄█ ▄▄█ █ █
  ━━━━━━━━━━━━━━━━━━`,
      tagline: "(writer's block is the real demon)"
    },
    // Fullmetal Alchemist
    {
      art: `       ◉
   ╱───────╲
  │  ◢███◣  │
 ◉│ █ ███ █ │◉
  │ █ █▄  █ │
  │ █ █▄█ █ │
   ╲───────╱
       ◉`,
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
