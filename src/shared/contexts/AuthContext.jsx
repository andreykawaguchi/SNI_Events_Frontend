import React, { createContext, useContext, useState } from 'react';
import serviceLocator from '../../infrastructure/factories/ServiceLocator';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Obtém instâncias únicas dos serviços (Singleton)
  const loginUseCase = serviceLocator.get('loginUseCase');
  const storageService = serviceLocator.get('storage');

  const [user, setUser] = useState(() => {
    try {
      const token = storageService.getItem('authToken');
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
    const authService = serviceLocator.get('authService');
    await authService.logout();
    storageService.removeItem('authToken');
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
