# Firebase Setup Guide

This guide will help you set up Firebase for jessay-writer to enable online storage and authentication.

## Prerequisites

- A Google account
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "jessay-writer")
4. Disable Google Analytics (optional, not needed for this app)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Click on "Email/Password" under "Sign-in method"
4. Enable "Email/Password"
5. Click "Save"

## Step 3: Add Your User Account

1. Still in the Authentication section, click on the "Users" tab
2. Click "Add user"
3. Enter your email and password
4. Click "Add user"

This will be the account you use to log in and edit essays.

## Step 4: Create a Firestore Database

1. Click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in production mode" (we'll set up rules next)
4. Choose a location close to you
5. Click "Enable"

## Step 5: Set Up Firestore Security Rules

1. In Firestore Database, click on the "Rules" tab
2. Replace the default rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read essays (public browsing)
    match /essays/{essay} {
      allow read: if true;
      // Only authenticated users can write/update/delete
      allow write, update, delete: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

These rules allow:
- **Anyone** to read essays (browse mode)
- **Only authenticated users** to create, update, or delete essays

## Step 6: Get Your Firebase Configuration

1. Click on the gear icon (⚙️) next to "Project Overview" in the left sidebar
2. Select "Project settings"
3. Scroll down to "Your apps"
4. Click on the web icon (`</>`) to add a web app
5. Enter an app nickname (e.g., "jessay-writer-web")
6. Click "Register app"
7. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Step 7: Configure Your Local Environment

1. In your project root, create a `.env` file (if it doesn't exist)
2. Copy the contents from `.env.example`
3. Fill in your Firebase credentials:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

**Important**: Add `.env` to your `.gitignore` file to keep your credentials secret!

## Step 8: Test Your Setup

1. Start your development server:
   ```bash
   npm start
   ```

2. The app should load and show the browse page
3. Click "login" in the header
4. Enter the email and password you created in Step 3
5. Click "write" to create a new essay
6. Write and publish an essay
7. Check your Firebase Console > Firestore Database to see the essay stored

## Deployment

When deploying to GitHub Pages (or another hosting service), make sure to set the environment variables in your deployment settings.

### For GitHub Actions

Add the Firebase environment variables as secrets in your GitHub repository:

1. Go to your repository on GitHub
2. Click Settings > Secrets and variables > Actions
3. Add each Firebase config value as a secret:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`

## Troubleshooting

### "Permission denied" errors
- Check your Firestore security rules
- Make sure you're logged in when trying to publish/delete

### "Firebase not configured" errors
- Verify all environment variables are set correctly
- Make sure you've restarted your development server after adding `.env`

### Can't log in
- Verify you've enabled Email/Password authentication
- Check that you've created a user account in Firebase Console

## Security Notes

- The app allows public read access to essays (anyone can browse)
- Only authenticated users (you) can create, edit, or delete essays
- Your Firebase credentials should never be committed to version control
- The authentication system is simple and designed for a single user
- For multi-user support, you'd need to add user registration and role-based access control

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth/web/start)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
