/**
 * Interface (contrato) para o AuthService
 * Qualquer implementação deve seguir este contrato
 */
export default class IAuthService {
  /**
   * Realiza login com email e password
   * @param {Object} params - { email, password }
   * @returns {Promise<{user: User, token: string}>}
   */
  async login({ email, password }) {
    throw new Error('Method not implemented');
  }

  /**
   * Realiza logout
   * @returns {Promise<boolean>}
   */
  async logout() {
    throw new Error('Method not implemented');
  }
}
