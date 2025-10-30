import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Auth.css';

function Auth({ user, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err) {
      setError(err.message || 'failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (err) {
      setError(err.message || 'failed to logout');
    }
  };

  if (user) {
    return (
      <div className="auth-modal-overlay" onClick={onClose}>
        <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
          <h2>┌─────────────────┐</h2>
          <h2>│ logged in       │</h2>
          <h2>└─────────────────┘</h2>
          <p className="auth-user-email">{user.email}</p>
          <button onClick={handleLogout} className="auth-button">
            logout
          </button>
          <button onClick={onClose} className="auth-button auth-button-secondary">
            close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <h2>┌─────────────────┐</h2>
        <h2>│ login to edit   │</h2>
        <h2>└─────────────────┘</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'logging in...' : 'login'}
          </button>
          <button type="button" onClick={onClose} className="auth-button auth-button-secondary">
            cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
