import React from 'react';
import { useAuth } from '../../shared/contexts/AuthContext.jsx';
import '../components/components.css';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="page-header">
        <h1>Bem-vindo, {user?.name || user?.email}!</h1>
        <p>Gerenciador de Eventos SNI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Eventos</p>
              <p className="text-3xl font-bold text-primary-600">0</p>
            </div>
            <div className="text-4xl text-primary-100">📅</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Usuários Registrados</p>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
            <div className="text-4xl text-blue-100">👥</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Participantes</p>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="text-4xl text-green-100">🎟️</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <p className="text-3xl font-bold text-yellow-600">Ativo</p>
            </div>
            <div className="text-4xl text-yellow-100">✅</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Visão Geral</h2>
        </div>
        <div className="py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Nenhum dado disponível no momento</p>
          </div>
        </div>
      </div>
    </div>
  );
}
