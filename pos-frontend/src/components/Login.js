// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Html&Css/style/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Mock user database (replace with real API later)
    const users = {
      cashier: { username: 'cashier', password: '123', role: 'cashier' },
      manager: { username: 'manager', password: '123', role: 'manager' },
      admin: { username: 'admin', password: 'admin123', role: 'manager' }
    };

    const user = users[username];

    if (user && user.password === password) {
      // Save user session
      localStorage.setItem('user', JSON.stringify({
        username: user.username,
        role: user.role
      }));
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>POS System</h1>
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>

          <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#555' }}>
            <p><strong>Test Accounts:</strong></p>
            <p>Cashier: username <code>cashier</code> / password <code>123</code></p>
            <p>Manager: username <code>manager</code> / password <code>123</code></p>
          </div>
        </form>
      </div>
    </div>
  );
}