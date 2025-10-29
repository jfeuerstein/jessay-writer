# essay writer

a minimalist, distraction-free essay writing app with ascii art aesthetic.

## features

- **distraction-free editor** - clean interface for writing essays, notes, journal entries, and songs
- **publish & store** - save your work to your collection
- **browse essays** - view all your published work
- **two-toned aesthetic** - simple black & grey with ascii art decorations
- **localStorage persistence** - essays saved locally in your browser

## setup

1. clone this repo:
```bash
git clone https://github.com/joshfeuerstein/essay-writer.git
cd essay-writer
```

2. install dependencies:
```bash
npm install
```

3. run locally:
```bash
npm start
```

## deployment to github pages

1. update the `homepage` field in `package.json` with your username:
```json
"homepage": "https://YOUR-USERNAME.github.io/essay-writer"
```

2. deploy:
```bash
npm run deploy
```

this will build the app and push it to the `gh-pages` branch.

3. enable github pages:
   - go to your repo settings
   - navigate to "pages" section
   - set source to `gh-pages` branch
   - save

your app will be live at `https://YOUR-USERNAME.github.io/essay-writer`

## future enhancements (optional)

to add git commits for published essays, you could:

1. set up a backend service (netlify functions, vercel, etc.)
2. use github api to commit essays to a `/essays` folder
3. each publish would create a new markdown file

this would require:
- github personal access token
- backend endpoint to handle commits
- updating the publish function to call your api

## tech stack

- react 18
- vanilla css
- localStorage for data persistence
- gh-pages for deployment

## usage

**write mode:**
- enter title and content
- word count displayed in real-time
- click "publish" to save
- click "clear" to start over

**browse mode:**
- see all published essays
- click any essay to read in full
- delete essays if needed

## styling notes

the app uses:
- courier new monospace font
- #0a0a0a background (near black)
- #e0e0e0 text (light grey)
- ascii box drawing characters for borders
- minimal ui elements

all text is lowercase for aesthetic consistency.

---

made with ♥ and courier new
