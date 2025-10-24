import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../shared/contexts/AuthContext.jsx';
import { loginSchema } from '../../shared/schemas/validationSchemas.js';
import '../components/components.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'kawaguchi.andrey@gmail.com',
      password: 'teste',
    },
  });

  const submit = async (data) => {
    try {
      await login(data);
      navigate('/home');
    } catch (err) {
      setFormError('root', { message: err.message });
    }
  };

  return (
    <div className="flex-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="form-container">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">SNI Events</h1>
          <p className="text-gray-600 mt-2">Acesse sua conta</p>
        </div>

        {errors.root && (
          <div className="alert alert-error mb-4" role="alert">
            <span>{errors.root.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              {...register('email')}
              disabled={loading}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <div className="form-error">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              {...register('password')}
              disabled={loading}
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="form-error">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-large w-full"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Credenciais de demonstração:
          </p>
          <div className="mt-3 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <p className="mb-1">
              <strong>Email:</strong> user@example.com
            </p>
            <p>
              <strong>Senha:</strong> password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
