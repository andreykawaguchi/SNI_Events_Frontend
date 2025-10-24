/**
 * Exemplo Avançado: Formulário com múltiplas validações e campos condicionais
 * Este arquivo é apenas para referência e demonstração
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Schema com validações avançadas
 */
const advancedFormSchema = z
  .object({
    name: z
      .string('Nome é obrigatório')
      .min(3, 'Mínimo 3 caracteres'),
    email: z
      .string('Email é obrigatório')
      .email('Email inválido'),
    password: z
      .string('Senha é obrigatória')
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Deve conter letra maiúscula')
      .regex(/[0-9]/, 'Deve conter número'),
    confirmPassword: z.string('Confirmação obrigatória'),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Deve aceitar os termos',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

/**
 * Componente exemplo de uso
 */
export function AdvancedFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm({
    resolver: zodResolver(advancedFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log('Form data:', data);
      // Simular envio
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      setFormError('root', { message: 'Erro ao enviar formulário' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome</label>
        <input {...register('name')} placeholder="Seu nome" />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input {...register('email')} type="email" placeholder="seu@email.com" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Senha</label>
        <input {...register('password')} type="password" placeholder="Senha forte" />
        {errors.password && <span>{errors.password.message}</span>}
        <small>
          Requisitos: Mínimo 8 caracteres, 1 maiúscula, 1 número
        </small>
      </div>

      <div>
        <label>Confirmar Senha</label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirme a senha"
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      <div>
        <label>
          <input {...register('acceptTerms')} type="checkbox" />
          Aceito os termos de uso
        </label>
        {errors.acceptTerms && <span>{errors.acceptTerms.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Registrar
      </button>
    </form>
  );
}
