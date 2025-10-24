import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/contexts/AuthContext.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('kawaguchi.andrey@gmail.com');
  const [password, setPassword] = useState('teste');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            aria-label="Email input"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            aria-label="Password input"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging...' : 'Login'}
        </button>
        {error && <div style={{ color: 'red' }} role="alert">{error}</div>}
      </form>
      <p>
        Use <b>user@example.com</b> / <b>password</b> to login (demo)
      </p>
    </div>
  );
}
