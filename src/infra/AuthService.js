// Infra: AuthService - performs HTTP calls to the authentication API.
import User from '../domain/User';

const API_BASE = 'http://localhost:5222';

export default class AuthService {
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const url = `${API_BASE}/api/auth/login`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const contentType = res.headers.get('content-type') || '';
    let payload = null;
    if (contentType.includes('application/json')) {
      payload = await res.json();
    } else {
      payload = await res.text();
    }

    if (!res.ok) {
      // Try to extract meaningful message from payload
      const msg = payload && payload.message ? payload.message : (typeof payload === 'string' ? payload : 'Authentication failed');
      throw new Error(msg);
    }

    // If backend returns a token, persist it. Backend may return either
    // { token: string } or { id, name, email, token }.
    const userData = payload || {};

    if (userData.token) {
      try {
        localStorage.setItem('authToken', userData.token);
      } catch (e) {
        // ignore storage errors, but log in dev
        // console.warn('Could not persist auth token', e);
      }
    }

    // If user info is present, return User instance; otherwise return token only
    if (userData.id) {
      return { user: new User({ id: String(userData.id), name: userData.name || '', email: userData.email || email }), token: userData.token };
    }

    if (userData.token) {
      // token-only response
      return { user: null, token: userData.token };
    }

    throw new Error('Invalid response from authentication server');
  }

  async logout() {
    // Optionally call API to invalidate session / token. Keep simple for now.
    return true;
  }
}
