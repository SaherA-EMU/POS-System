// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: employeeId })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || 'Login failed');
        setTimeout(() => setError(''), 2000);
        return;
      }

      const data = await res.json();
      if (data && data.success && data.user) {
        login(data.user);
        navigate('/');
      } else {
        setError('Invalid employee ID');
        setTimeout(() => setError(''), 2000);
      }
    } catch (err) {
        console.error('Login error', err);
        setError('Unable to contact server');
        setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        padding: '50px', borderRadius: '16px',
        textAlign: 'center', width: '90%', maxWidth: '500px'
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '30px' }}>POS System</h1>
        <p style={{ fontSize: '20px', marginBottom: '30px' }}>Enter Your Employee ID</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="e.g. 6 for Joe"
            autoFocus
            style={{
              width: '100%', padding: '20px', fontSize: '28px', textAlign: 'center',
              borderRadius: '12px', border: 'none', marginBottom: '20px'
            }}
          />
          {error && <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{error}</p>}
          <button type="submit" style={{
            width: '100%', padding: '20px', fontSize: '24px', background: '#27ae60',
            color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer'
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}