/**
 * Infra: UserService - Realiza chamadas HTTP para a API de usuários
 */

const API_BASE = 'http://localhost:5222';

export default class UserService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  /**
   * Busca usuários paginados da API
   * @param {number} page - Número da página (padrão: 1)
   * @param {number} pageSize - Tamanho da página (padrão: 10)
   * @returns {Promise<Array>} - Lista de usuários
   */
  async getPagedUsers(page = 1, pageSize = 10) {
    const url = `${API_BASE}/api/user/paged?page=${page}&pageSize=${pageSize}`;
    const token = this.storageService.getItem('authToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      const errorMsg = `Erro ao buscar usuários: ${res.status}`;
      throw new Error(errorMsg);
    }

    const data = await res.json();
    
    // Normalizar a resposta da API
    return data.data || data.items || data || [];
  }

  /**
   * Busca um usuário pelo ID
   * @param {string} userId - ID do usuário
   * @returns {Promise<Object>} - Dados do usuário
   */
  async getUserById(userId) {
    const url = `${API_BASE}/api/user/${userId}`;
    const token = this.storageService.getItem('authToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar usuário: ${res.status}`);
    }

    return await res.json();
  }

  /**
   * Atualiza um usuário existente
   * @param {string} userId - ID do usuário
   * @param {Object} userData - Dados a atualizar { name, email, password }
   * @returns {Promise<Object>} - Usuário atualizado
   */
  async updateUser(userId, userData) {
    const url = `${API_BASE}/api/user/${userId}`;
    const token = this.storageService.getItem('authToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorMsg = `Erro ao atualizar usuário: ${res.status}`;
      throw new Error(errorMsg);
    }

    return await res.json();
  }

  /**
   * Cria um novo usuário
   * @param {Object} userData - Dados do usuário { name, email, password }
   * @returns {Promise<Object>} - Usuário criado
   */
  async createUser(userData) {
    const url = `${API_BASE}/api/user`;
    const token = this.storageService.getItem('authToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorMsg = `Erro ao criar usuário: ${res.status}`;
      throw new Error(errorMsg);
    }

    return await res.json();
  }

  /**
   * Deleta um usuário
   * @param {string} userId - ID do usuário
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    const url = `${API_BASE}/api/user/${userId}`;
    const token = this.storageService.getItem('authToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    if (!res.ok) {
      throw new Error(`Erro ao deletar usuário: ${res.status}`);
    }
  }
}
