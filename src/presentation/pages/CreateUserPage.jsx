import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '../../shared/schemas/validationSchemas.js';
import '../components/components.css';

export default function CreateUserPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError: setFormError,
    } = useForm({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            // Simulate API call
            await new Promise((r) => setTimeout(r, 600));
            // In a real app, call UsersService.create(data)
            navigate('/users');
        } catch (err) {
            setFormError('root', { message: err.message });
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="page-header">
                <h1>Criar Novo Usuário</h1>
                <p>Preencha os dados abaixo para criar um novo usuário</p>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.root && (
                        <div className="alert alert-error mb-4">
                            {errors.root.message}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Nome Completo
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="form-input"
                            {...register('name')}
                            placeholder="João Silva"
                            disabled={isSubmitting}
                        />
                        {errors.name && (
                            <div className="form-error">{errors.name.message}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            {...register('email')}
                            placeholder="joao@example.com"
                            disabled={isSubmitting}
                        />
                        {errors.email && (
                            <div className="form-error">{errors.email.message}</div>
                        )}
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            onClick={() => navigate('/users')}
                            className="btn btn-ghost"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Salvando...
                                </>
                            ) : (
                                'Salvar Usuário'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
