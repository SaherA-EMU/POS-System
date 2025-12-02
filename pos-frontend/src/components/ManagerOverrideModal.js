// src/components/ManagerOverrideModal.js
import React, { useState } from 'react';

export default function ManagerOverrideModal({ onApprove, onCancel }) {
  const [managerId, setManagerId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!managerId) {
      setError('Please enter a manager ID');
      setTimeout(() => setError(''), 2000);
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch('http://localhost:5000/auth/verify-manager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ managerId: managerId })
      });

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        setError(body.error || 'Manager verification failed');
        setTimeout(() => setError(''), 2000);
        setLoading(false);
        return;
      }

      const data = await resp.json();
      if (data && data.success && data.manager) {
        onApprove(data.manager);
      } else {
        setError('Manager verification failed');
        setTimeout(() => setError(''), 2000);
      }
    } catch (err) {
      console.error('Manager verify error', err);
      setError('Unable to contact server');
      setTimeout(() => setError(''), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        background: '#293746ff', color: 'white', padding: '40px', borderRadius: '16px',
        width: '80%', maxWidth: '500px', textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>
          Manager Approval Required
        </h2>

        <input
          type="text"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
          placeholder="Manager ID (1-5)"
          style={{
            width: '80%', padding: '20px', fontSize: '28px', textAlign: 'center',
            borderRadius: '12px', border: 'none', margin: '20px 0'
          }}
        />

        {error && <p style={{ color: '#e74c3c' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleSubmit} style={{
            flex: 1, padding: '16px', background: '#27ae60', color: 'white',
            border: 'none', borderRadius: '8px', fontSize: '18px'
          }}>
            Approve
          </button>
          <button onClick={onCancel} style={{
            flex: 1, padding: '16px', background: '#dc3545', color: 'white',
            border: 'none', borderRadius: '8px', fontSize: '18px'
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}