import React from 'react';
import { useAuth } from '../../shared/contexts/AuthContext.jsx';

export default function HomePage() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <p>Welcome, {user?.name || user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
