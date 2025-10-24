/**
 * EXEMPLO PRÁTICO: Como usar a Modal em outros componentes
 * 
 * Este arquivo demonstra como integrar a UserModal em qualquer página
 */

import React, { useState, useCallback } from 'react';
import serviceLocator from '../../infrastructure/factories/ServiceLocator';
import UserModal from '../components/UserModal';

/**
 * Exemplo 1: Componente simples que só cria usuários
 */
export function CreateUserOnly() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = useCallback(() => {
    console.log('✅ Usuário criado com sucesso!');
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary">
        Criar Novo Usuário
      </button>

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handleSuccess}
        mode="create"
        createUserUseCase={serviceLocator.get('createUserUseCase')}
      />
    </div>
  );
}

/**
 * Exemplo 2: Componente com edição em linha (inline editing)
 */
export function UserListWithInlineEdit() {
  const [users, setUsers] = useState([
    { id: '1', name: 'João', email: 'joao@example.com' },
    { id: '2', name: 'Maria', email: 'maria@example.com' },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsOpen(true);
  };

  const handleSuccess = useCallback(() => {
    // Recarregar lista após sucesso
    const userService = serviceLocator.get('userService');
    userService.getPagedUsers(1, 50).then(setUsers);
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary mb-4">
        + Novo
      </button>

      <table className="w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleEditClick(user)}
                  className="btn btn-small"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handleSuccess}
        mode={modalMode}
        initialData={selectedUser}
        createUserUseCase={serviceLocator.get('createUserUseCase')}
        updateUserUseCase={serviceLocator.get('updateUserUseCase')}
      />
    </div>
  );
}

/**
 * Exemplo 3: Dialog modal (material-ui style)
 */
export function UserDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('create');

  const handleCreateClick = () => {
    setMode('create');
    setIsOpen(true);
  };

  const handleSuccess = useCallback(() => {
    alert('✅ Operação realizada com sucesso!');
  }, []);

  return (
    <>
      <button onClick={handleCreateClick} className="btn btn-primary">
        Novo Usuário
      </button>

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handleSuccess}
        mode={mode}
        createUserUseCase={serviceLocator.get('createUserUseCase')}
        updateUserUseCase={serviceLocator.get('updateUserUseCase')}
      />
    </>
  );
}

/**
 * Exemplo 4: Hook customizado para reutilizar lógica
 */
export function useUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);

  const openCreate = useCallback(() => {
    setSelectedUser(null);
    setMode('create');
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((user) => {
    setSelectedUser(user);
    setMode('edit');
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    mode,
    selectedUser,
    openCreate,
    openEdit,
    close,
  };
}

/**
 * Exemplo 5: Usando o hook customizado
 */
export function UserAdminPanel() {
  const modal = useUserModal();
  const [users, setUsers] = useState([]);

  const handleSuccess = useCallback(() => {
    // Recarregar
    const userService = serviceLocator.get('userService');
    userService.getPagedUsers(1, 50).then(setUsers);
  }, []);

  return (
    <div className="p-8">
      <h1>Admin de Usuários</h1>

      <button onClick={modal.openCreate} className="btn btn-primary mb-4">
        + Novo Usuário
      </button>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex justify-between items-center p-4 border rounded">
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <button
              onClick={() => modal.openEdit(user)}
              className="btn btn-secondary"
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      <UserModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        onSuccess={handleSuccess}
        mode={modal.mode}
        initialData={modal.selectedUser}
        createUserUseCase={serviceLocator.get('createUserUseCase')}
        updateUserUseCase={serviceLocator.get('updateUserUseCase')}
      />
    </div>
  );
}

/**
 * Exemplo 6: Modal com callbacks customizados
 */
export function AdvancedUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = useCallback(() => {
    setSuccessMessage('✅ Usuário salvo com sucesso!');
    
    // Mostrar mensagem por 3 segundos
    setTimeout(() => {
      setSuccessMessage('');
      setIsOpen(false);
    }, 3000);
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary">
        Criar
      </button>

      {successMessage && (
        <div className="alert alert-success mb-4">
          {successMessage}
        </div>
      )}

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handleSuccess}
        mode="create"
        createUserUseCase={serviceLocator.get('createUserUseCase')}
      />
    </div>
  );
}

/**
 * Exemplo 7: Modal com validações customizadas (antes de enviar)
 */
export function ValidatedUserModal() {
  const [isOpen, setIsOpen] = useState(false);

  const createUserWithValidation = {
    execute: async (userData) => {
      // Validação customizada
      if (userData.name.length > 50) {
        throw new Error('Nome muito longo');
      }

      // Chamar use case normal
      const useCase = serviceLocator.get('createUserUseCase');
      return await useCase.execute(userData);
    },
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary">
        Criar com Validação Extra
      </button>

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode="create"
        createUserUseCase={createUserWithValidation}
      />
    </div>
  );
}

/**
 * Exemplo 8: Integração com formulários maiores
 */
export function LargeFormWithUserModal() {
  const [formData, setFormData] = useState({
    companyName: '',
    adminName: '',
    adminEmail: '',
  });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleCreateAdmin = () => {
    setIsUserModalOpen(true);
  };

  const handleUserSuccess = useCallback(() => {
    alert('Admin criado! Agora complete o formulário de empresa.');
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2>Registrar Nova Empresa</h2>

        <div className="form-group">
          <label>Nome da Empresa</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Administrador</label>
          <button
            onClick={handleCreateAdmin}
            className="btn btn-secondary"
          >
            Criar Novo Admin
          </button>
        </div>

        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          onSuccess={handleUserSuccess}
          mode="create"
          createUserUseCase={serviceLocator.get('createUserUseCase')}
        />
      </div>
    </div>
  );
}

/**
 * Exemplo 9: Modal com estado externo sincronizado
 */
export function SyncedUserModal({ onUserCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  const handleSuccess = useCallback(async () => {
    setIsOpen(false);
    
    // Sincronizar com componente pai
    if (onUserCreated) {
      onUserCreated(createdUser);
    }
  }, [createdUser, onUserCreated]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary">
        Novo Usuário
      </button>

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handleSuccess}
        mode="create"
        createUserUseCase={serviceLocator.get('createUserUseCase')}
      />

      {createdUser && <p>Último usuário: {createdUser.name}</p>}
    </div>
  );
}

export default {
  CreateUserOnly,
  UserListWithInlineEdit,
  UserDialog,
  useUserModal,
  UserAdminPanel,
  AdvancedUserModal,
  ValidatedUserModal,
  LargeFormWithUserModal,
  SyncedUserModal,
};
