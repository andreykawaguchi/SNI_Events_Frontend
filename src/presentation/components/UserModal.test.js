/**
 * Example Test: UserModal Component Tests
 * Este arquivo serve como referência para escrever testes
 * 
 * Executar com: npm test
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserModal from '../UserModal';

describe('UserModal - Create Mode', () => {
  let mockCreateUseCase;
  let mockOnClose;
  let mockOnSuccess;

  beforeEach(() => {
    mockCreateUseCase = {
      execute: jest.fn().mockResolvedValue({
        id: '1',
        name: 'João Silva',
        email: 'joao@example.com',
      }),
    };

    mockOnClose = jest.fn();
    mockOnSuccess = jest.fn();
  });

  it('deve renderizar modal aberta', () => {
    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        mode="create"
        createUserUseCase={mockCreateUseCase}
      />
    );

    expect(screen.getByText('Novo Usuário')).toBeInTheDocument();
  });

  it('deve não renderizar quando isOpen é false', () => {
    const { container } = render(
      <UserModal
        isOpen={false}
        onClose={mockOnClose}
        mode="create"
        createUserUseCase={mockCreateUseCase}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('deve exibir erro ao tentar submeter form vazio', async () => {
    const user = userEvent.setup();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        mode="create"
        createUserUseCase={mockCreateUseCase}
      />
    );

    const submitBtn = screen.getByText('Criar Usuário');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
    });

    expect(mockCreateUseCase.execute).not.toHaveBeenCalled();
  });

  it('deve exibir erro ao submeter email inválido', async () => {
    const user = userEvent.setup();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        mode="create"
        createUserUseCase={mockCreateUseCase}
      />
    );

    const nameInput = screen.getByPlaceholderText('João Silva');
    const emailInput = screen.getByPlaceholderText('joao@example.com');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');

    await user.type(nameInput, 'João Silva');
    await user.type(emailInput, 'email-invalido');
    await user.type(passwordInput, 'senha123');

    const submitBtn = screen.getByText('Criar Usuário');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument();
    });

    expect(mockCreateUseCase.execute).not.toHaveBeenCalled();
  });

  it('deve criar usuário com dados válidos', async () => {
    const user = userEvent.setup();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        mode="create"
        createUserUseCase={mockCreateUseCase}
      />
    );

    const nameInput = screen.getByPlaceholderText('João Silva');
    const emailInput = screen.getByPlaceholderText('joao@example.com');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');

    await user.type(nameInput, 'João Silva');
    await user.type(emailInput, 'joao@example.com');
    await user.type(passwordInput, 'senha123');

    const submitBtn = screen.getByText('Criar Usuário');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockCreateUseCase.execute).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      });
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('deve fechar modal ao clicar cancel', async () => {
    const user = userEvent.setup();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        mode="create"
        createUserUseCase={mockCreateUseCase}
      />
    );

    const cancelBtn = screen.getByText('Cancelar');
    await user.click(cancelBtn);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('deve exibir erro de use case', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Email já existe';

    mockCreateUseCase.execute.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        mode="create"
        createUserUseCase={mockCreateUseCase}
      />
    );

    const nameInput = screen.getByPlaceholderText('João Silva');
    const emailInput = screen.getByPlaceholderText('joao@example.com');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');

    await user.type(nameInput, 'João Silva');
    await user.type(emailInput, 'joao@example.com');
    await user.type(passwordInput, 'senha123');

    const submitBtn = screen.getByText('Criar Usuário');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('deve limpar erro ao digitar no campo', async () => {
    const user = userEvent.setup();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        mode="create"
        createUserUseCase={mockCreateUseCase}
      />
    );

    const submitBtn = screen.getByText('Criar Usuário');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText('João Silva');
    await user.type(nameInput, 'J');

    await waitFor(() => {
      expect(screen.queryByText('Nome é obrigatório')).not.toBeInTheDocument();
    });
  });
});

describe('UserModal - Edit Mode', () => {
  let mockUpdateUseCase;
  let mockOnClose;
  let mockOnSuccess;
  const mockUser = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
  };

  beforeEach(() => {
    mockUpdateUseCase = {
      execute: jest.fn().mockResolvedValue(mockUser),
    };

    mockOnClose = jest.fn();
    mockOnSuccess = jest.fn();
  });

  it('deve renderizar como Edit', () => {
    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        mode="edit"
        initialData={mockUser}
        updateUserUseCase={mockUpdateUseCase}
      />
    );

    expect(screen.getByText('Editar Usuário')).toBeInTheDocument();
  });

  it('deve pré-preencher dados do usuário', () => {
    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        mode="edit"
        initialData={mockUser}
        updateUserUseCase={mockUpdateUseCase}
      />
    );

    const nameInput = screen.getByDisplayValue('João Silva');
    const emailInput = screen.getByDisplayValue('joao@example.com');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it('deve permitir deixar senha em branco na edição', async () => {
    const user = userEvent.setup();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        mode="edit"
        initialData={mockUser}
        updateUserUseCase={mockUpdateUseCase}
      />
    );

    const nameInput = screen.getByDisplayValue('João Silva');
    await user.clear(nameInput);
    await user.type(nameInput, 'Maria Silva');

    const submitBtn = screen.getByText('Atualizar Usuário');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateUseCase.execute).toHaveBeenCalledWith('1', {
        name: 'Maria Silva',
        email: 'joao@example.com',
      });
    });
  });

  it('deve enviar senha apenas se preenchida', async () => {
    const user = userEvent.setup();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        mode="edit"
        initialData={mockUser}
        updateUserUseCase={mockUpdateUseCase}
      />
    );

    const passwordInput = screen.getByPlaceholderText('');
    await user.type(passwordInput, 'novasenha123');

    const submitBtn = screen.getByText('Atualizar Usuário');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateUseCase.execute).toHaveBeenCalledWith('1', {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'novasenha123',
      });
    });
  });
});
