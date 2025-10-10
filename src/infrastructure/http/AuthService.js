// Infra: AuthService - performs HTTP calls to the authentication API.
import User from '../../domain/entities/User';

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
      const msg = payload && payload.message ? payload.message : (typeof payload === 'string' ? payload : 'Authentication failed');
      throw new Error(msg);
    }

    const userData = payload || {};

    if (userData.token) {
      try {
        localStorage.setItem('authToken', userData.token);
      } catch (e) {
        // ignore storage errors
      }
    }

    if (userData.id) {
      return { user: new User({ id: String(userData.id), name: userData.name || '', email: userData.email || email }), token: userData.token };
    }

    if (userData.token) {
      return { user: null, token: userData.token };
    }

    throw new Error('Invalid response from authentication server');
  }

  async logout() {
    return true;
  }
}
