import React, { createContext, useContext, useState } from 'react';
import AuthService from '../infra/AuthService';
import LoginUseCase from '../domain/LoginUseCase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const authService = new AuthService();
  const loginUseCase = new LoginUseCase({ authService });

  // Initialize user from token if available (optionally you could fetch /me here)
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('authToken');
      return token ? { id: null, name: '', email: null } : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await loginUseCase.execute({ email, password });
      // result can be { user, token } or { user: null, token }
      if (result && result.user) {
        setUser(result.user);
      } else if (result && result.token) {
        // token-only response: mark as authenticated with minimal user info
        setUser({ id: null, name: '', email });
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    try {
      localStorage.removeItem('authToken');
    } catch (e) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
