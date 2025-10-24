import React, { useEffect, useState } from 'react';
import '../components/components.css';
import serviceLocator from '../../infrastructure/factories/ServiceLocator';
import UserModal from '../components/UserModal';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        
        const userService = serviceLocator.get('userService');
        
        userService.getPagedUsers(1, 100)
            .then((data) => {
                if (mounted) setUsers(data);
            })
            .catch((err) => {
                if (mounted) setError(err.message || String(err));
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => (mounted = false);
    }, []);

    /**
     * Abre a modal para criar novo usuário
     */
    const handleOpenCreateModal = () => {
        setSelectedUser(null);
        setModalMode('create');
        setIsModalOpen(true);
    };

    /**
     * Abre a modal para editar usuário
     */
    const handleOpenEditModal = (user) => {
        setSelectedUser(user);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    /**
     * Fecha a modal
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    /**
     * Callback quando o usuário é criado ou atualizado com sucesso
     */
    const handleModalSuccess = () => {
        // Recarregar a lista de usuários
        const userService = serviceLocator.get('userService');
        userService.getPagedUsers(1, 100)
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                setError(err.message || String(err));
            });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1>Usuários</h1>
                    <p>Gerenciamento de usuários do sistema</p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="btn btn-primary"
                >
                    + Novo Usuário
                </button>
            </div>

            {error && (
                <div className="alert alert-error mb-4" role="alert">
                    {error}
                </div>
            )}

            {loading && (
                <div className="card text-center py-12">
                    <div className="flex justify-center mb-4">
                        <div className="spinner"></div>
                    </div>
                    <p className="text-gray-600">Carregando usuários...</p>
                </div>
            )}

            {!loading && !error && users.length === 0 && (
                <div className="card text-center py-12">
                    <p className="text-gray-600 mb-4">Nenhum usuário encontrado</p>
                    <button
                        onClick={handleOpenCreateModal}
                        className="btn btn-outline"
                    >
                        Criar o primeiro usuário
                    </button>
                </div>
            )}

            {!loading && !error && users.length > 0 && (
                <div className="card">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th style={{ width: '100px' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="text-gray-500 text-sm">{u.id}</td>
                                        <td className="font-medium">{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button 
                                                    className="btn btn-ghost btn-small"
                                                    onClick={() => handleOpenEditModal(u)}
                                                >
                                                    Editar
                                                </button>
                                                <button className="btn btn-danger btn-small">
                                                    Deletar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <UserModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleModalSuccess}
                mode={modalMode}
                initialData={selectedUser}
                createUserUseCase={serviceLocator.get('createUserUseCase')}
                updateUserUseCase={serviceLocator.get('updateUserUseCase')}
            />
        </div>
    );
}
