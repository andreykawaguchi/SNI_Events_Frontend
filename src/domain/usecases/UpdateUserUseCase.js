/**
 * Domain Use Case: UpdateUserUseCase
 * Lógica de negócio para atualizar um usuário existente
 * Single Responsibility: responsável apenas pela validação e orquestração da atualização
 */

export default class UpdateUserUseCase {
  constructor(userService) {
    if (!userService) {
      throw new Error('UserService é obrigatório');
    }
    this.userService = userService;
  }

  /**
   * Executa a atualização de um usuário
   * @param {string} userId - ID do usuário
   * @param {Object} userData - Dados a atualizar { name, email }
   * @returns {Promise<User>} - Usuário atualizado
   * @throws {Error}
   */
  async execute(userId, userData) {
    if (!userId) {
      throw new Error('ID do usuário é obrigatório');
    }

    this.validate(userData);
    return await this.userService.updateUser(userId, userData);
  }

  /**
   * Valida os dados de entrada
   * @private
   * @param {Object} userData
   * @throws {Error}
   */
  validate(userData) {
    if (!userData) {
      throw new Error('Dados do usuário são obrigatórios');
    }

    if (userData.name !== undefined) {
      if (!userData.name || !userData.name.trim()) {
        throw new Error('Nome é obrigatório');
      }

      if (userData.name.trim().length < 3) {
        throw new Error('Nome deve ter no mínimo 3 caracteres');
      }
    }

    if (userData.email !== undefined) {
      if (!userData.email || !userData.email.trim()) {
        throw new Error('Email é obrigatório');
      }

      if (!this.isValidEmail(userData.email)) {
        throw new Error('Email inválido');
      }
    }
  }

  /**
   * Valida formato de email
   * @private
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
