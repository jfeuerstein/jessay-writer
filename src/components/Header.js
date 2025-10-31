import React, { useState } from 'react';
import './Header.css';

function Header({ currentView, setCurrentView, user, onAuthClick }) {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [currentEasterEggIndex, setCurrentEasterEggIndex] = useState(null);

  const normalLogo = {
    art: `     _
    | |
    | | ___  ___ ___  __ _ _   _
 _  | |/ _ \\/ __/ __|/ _\` | | | |
| |_| |  __/\\__ \\__ \\ (_| | |_| |
 \\___/ \\___||___/___/\\__,_|\\__, |
                            |___/`,
    tagline: "(its a portmantaeu of josh and essay)"
  };

  const easterEggVariations = [
    // Hunter x Hunter
    {
      art: `     ★                    ★
  ░▒▓█ ███ ███ ███  █  █ █ █▓▒░
     █ █▄  █▄  █▄  █▄█ █ █
   ▄▄█ █▄▄ ▄▄█ ▄▄█ █ █ ▀▄▀
                            ★
        [ HUNTER LICENSE ]`,
      tagline: "(jessay has the properties of both josh and essay)"
    },
    // Seinfeld
    {
      art: `                                                          
              O  ____     ____     ____     ____          
            /' /'    )  /'    )--/'    )--/'    )  /'    /
          /' /(___,/'  '---,    '---,   /'    /' /'    /' 
        /(__(________(___,/   (___,/   (___,/(__(___,/(__ 
______/'___________________________________________/'____________     
    /'                                     /     /'       
(,/'                                      (___,/'         `,
      tagline: "                       (an essay about nothing)"
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
      art: `╔═══════════════════════════════════╗
║ ✿ ▓▓█  ▓███ ▓███ ▓███  ▓█  █▓ █ ✿ ║
║    ▓█  ▓█▄  ▓█▄▄ ▓█▄▄ ▓█▄█ ▓█ █   ║
║ ✿  ▓█  ▓█     ▓█   ▓█ ▓█ █  ▀▄▀ ✿ ║
║  ▓███  ▓█▄▄ ▓▄▄█ ▓▄▄█ ▓█ █  ▓█    ║
║                                   ║
║       ✿ [Spring, Day 1] ✿         ║
╚═══════════════════════════════════╝`,
      tagline: "(no sprinklers for writer's block)"
    },
    // Minecraft
    {
      art: `  __                                
 |__|.-----.-----.-----.---.-.--.--.
 |  ||  -__|__ --|__ --|  _  |  |  |
 |  ||_____|_____|_____|___._|___  |
|___|                        |_____|
`,
      tagline: "(no creative mode here)"
    },
    // Harry Potter
    {
      art: `      _______________
     ╱                ╲
    ╱  ϟ               ╲
   │  𝕵𝖊𝖘𝖘𝖆𝖞            │
   │                    │
    ╲                  ╱
     ╲________________╱`,
      tagline: "(it's pronounced jess-ayh)"
    },
    // Zelda
    {
      art: `            ▲
           ▲ ▲
  ═══════════════════
   ⟨ JESSAY ⟩
   █ ███ ███ ███  █  █ █
   █ █▄  █▄  █▄  █▀█  █ 
  ██ █▄▄ ▄▄█ ▄▄█ █ █  █
  ═══════════════════`,
      tagline: "(no save points)"
    },
    // halloween
    {
      art: `            ('-.    .-')     .-')     ('-.                 
          _(  OO)  ( OO ).  ( OO ).  ( OO ).-.             
     ,--.(,------.(_)---\\_)(_)---\\_) / . --. /  ,--.   ,--.
 .-')| ,| |  .---'/    _ | /    _ |  | \\-.  \\    \\  '.''  / 
( OO |(_| |  |    \\  :'. '. \\  :'. '..-'-'  |  | .-')     /  
| '-'|  |(|  '--.  '..'''.) '..'''.)\\| |_.'  |(OO  \\   /   
,--. |  | |  .--' .-._)   \\.-._)   \\ |  .-.  | |   /  /\\_  
|  '-'  / |  '---.\\       /\\       / |  | |  | '-./  /.__) 
 '-----'  '------' '-----'  '-----'  '--' '--'   '--'      `,
      tagline: "(spooky!)"
    }
  ];

  const handleLogoClick = () => {
    if (showEasterEgg) {
      // If easter egg is showing, return to normal logo
      setShowEasterEgg(false);
      setCurrentEasterEggIndex(null);
      setLogoClicks(0);
    } else {
      // Increment click counter
      const newCount = logoClicks + 1;
      setLogoClicks(newCount);

      // Every 5 clicks, show a random easter egg
      if (newCount === 5) {
        const randomIndex = Math.floor(Math.random() * easterEggVariations.length);
        setCurrentEasterEggIndex(randomIndex);
        setShowEasterEgg(true);
      }
    }
  };

  const currentLogo = showEasterEgg ? easterEggVariations[currentEasterEggIndex] : normalLogo;

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <pre className="logo">
{currentLogo.art}
          </pre>
          <p className="tagline">
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
