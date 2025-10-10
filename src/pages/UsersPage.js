import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple mock fetch - replace with real service call later
const mockFetchUsers = () =>
    Promise.resolve([
        { id: '1', name: 'Andrey Kawaguchi', email: 'andrey@example.com' },
        { id: '2', name: 'Maria Silva', email: 'maria@example.com' },
    ]);

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        mockFetchUsers()
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

    return (
        <div style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
                <h2>Usuários</h2>
                <div>
                    <button onClick={() => navigate('/users/create')} className="px-3 py-1 rounded bg-sky-600 text-white">
                        Criar usuário
                    </button>
                </div>
            </div>

            {loading && <div>Carregando usuários...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {!loading && !error && (
                <table className="min-w-full text-left border-collapse" style={{ borderSpacing: 0 }}>
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">ID</th>
                            <th className="p-2">Nome</th>
                            <th className="p-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b hover:bg-slate-50">
                                <td className="p-2">{u.id}</td>
                                <td className="p-2">{u.name}</td>
                                <td className="p-2">{u.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
