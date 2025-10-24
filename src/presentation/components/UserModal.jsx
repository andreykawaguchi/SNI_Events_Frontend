/**
 * Presentation Component: UserModal
 * Modal para criação e edição de usuários
 * Princípio: Single Responsibility - responsável apenas por apresentação
 * Princípio: Dependency Injection - recebe os use cases como props
 * 
 * Utiliza React Hook Form + Zod para validações
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, updateUserSchema } from '../../shared/schemas/validationSchemas';
import FormInput from './FormInput';
import './components.css';

const UserModal = ({
  isOpen,
  onClose,
  onSuccess,
  mode = 'create', // 'create' | 'edit'
  initialData = null,
  createUserUseCase,
  updateUserUseCase,
}) => {
  // Selecionar schema baseado no modo
  const schema = mode === 'create' ? createUserSchema : updateUserSchema;

  const {
    register,
    handleSubmit,
    reset,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      id: '',
      name: '',
      email: '',
      cpf: '',
      password: '',
    },
  });

  // Log de erros de validação
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('❌ Erros de validação:', errors);
    }
  }, [errors]);

  // Log do modo e schema
  useEffect(() => {
    console.log('🔄 UserModal renderizado:', { mode, initialData, schema: schema._def });
  }, [mode, initialData, schema]);

  // Inicializar dados quando modal abre em modo edição
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        reset({
          id: initialData.id || '',
          name: initialData.name || '',
          email: initialData.email || '',
          cpf: initialData.cpf || '',
          password: '', // Senha em branco para edição
        });
      } else {
        reset({
          id: '',
          name: '',
          email: '',
          cpf: '',
          password: '',
        });
      }
    }
  }, [isOpen, mode, initialData, reset]);

  /**
   * Manipula o envio do formulário
   */
  const onSubmit = async (formData) => {
    try {
      console.log('� Formulário submetido:', { mode, formData });
      
      if (mode === 'create') {
        if (!createUserUseCase) {
          throw new Error('CreateUserUseCase não está disponível');
        }
        console.log('✅ Criando usuário...');
        await createUserUseCase.execute(formData);
        console.log('✅ Usuário criado com sucesso!');
      } else if (mode === 'edit') {
        if (!updateUserUseCase) {
          throw new Error('UpdateUserUseCase não está disponível');
        }

        // Em modo edição, enviamos apenas os campos que foram alterados
        const updateData = {
          name: formData.name,
          email: formData.email,
        };

        if (formData.cpf) {
          updateData.cpf = formData.cpf;
        }

        if (formData.password) {
          updateData.password = formData.password;
        }

        const userId = formData.id || initialData?.id;
        console.log('📝 ID do usuário:', userId);
        console.log('📝 Dados a atualizar:', updateData);
        
        if (!userId) {
          throw new Error('ID do usuário é obrigatório');
        }

        console.log('✅ Atualizando usuário...');
        await updateUserUseCase.execute(userId, updateData);
        console.log('✅ Usuário atualizado com sucesso!');
      }

      console.log('🎉 Encerrando modal...');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('❌ Erro ao salvar usuário:', err);
      setFormError('root', {
        message: err.message || 'Erro ao salvar usuário',
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  const title = mode === 'create' ? 'Novo Usuário' : 'Editar Usuário';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="modal-close"
            disabled={isSubmitting}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            {errors.root && (
              <div className="alert alert-error mb-4" role="alert">
                {errors.root.message}
              </div>
            )}

            {/* Campo hidden para o ID em modo edição */}
            {mode === 'edit' && (
              <input type="hidden" {...register('id')} />
            )}

            <FormInput
              label="Nome Completo"
              id="name"
              type="text"
              placeholder="João Silva"
              field={register('name')}
              error={errors.name}
              disabled={isSubmitting}
            />

            <FormInput
              label="Email"
              id="email"
              type="email"
              placeholder="joao@example.com"
              field={register('email')}
              error={errors.email}
              disabled={isSubmitting}
            />

            <FormInput
              label="CPF"
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              field={register('cpf')}
              error={errors.cpf}
              disabled={isSubmitting}
            />

            <FormInput
              label={mode === 'create' ? 'Senha' : 'Senha (deixe em branco para manter)'}
              id="password"
              type="password"
              placeholder={mode === 'create' ? 'Digite sua senha' : ''}
              field={register('password')}
              error={errors.password}
              disabled={isSubmitting}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
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
                mode === 'create' ? 'Criar Usuário' : 'Atualizar Usuário'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  mode: PropTypes.oneOf(['create', 'edit']),
  initialData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    cpf: PropTypes.string,
  }),
  createUserUseCase: PropTypes.object,
  updateUserUseCase: PropTypes.object,
};

export default UserModal;
