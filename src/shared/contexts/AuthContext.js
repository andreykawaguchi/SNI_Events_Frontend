import React, { createContext, useContext, useState } from 'react';
import AuthService from '../../infrastructure/http/AuthService';
import LoginUseCase from '../../application/auth/LoginUseCase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const authService = new AuthService();
  const loginUseCase = new LoginUseCase({ authService });

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
      if (result && result.user) {
        setUser(result.user);
      } else if (result && result.token) {
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
