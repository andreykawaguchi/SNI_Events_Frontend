import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateUserPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        // Simulate API call
        await new Promise((r) => setTimeout(r, 600));
        // In a real app, call UsersService.create({ name, email })
        setSaving(false);
        navigate('/users');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Criar usuário</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
                <label>
                    Nome
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
                </label>

                <label>
                    Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
                </label>

                <div>
                    <button type="submit" disabled={saving} className="px-3 py-1 rounded bg-green-600 text-white">
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button type="button" onClick={() => navigate('/users')} className="ml-2 px-3 py-1 rounded border">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
