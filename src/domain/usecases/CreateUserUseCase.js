/**
 * Domain Use Case: CreateUserUseCase
 * Lógica de negócio para criar um novo usuário
 * Interface Segregation: depende de abstração, não de implementação
 */

export default class CreateUserUseCase {
  constructor(userService) {
    if (!userService) {
      throw new Error('UserService é obrigatório');
    }
    this.userService = userService;
  }

  /**
   * Executa a criação de um novo usuário
   * @param {Object} userData - Dados do usuário { name, email, password }
   * @returns {Promise<User>} - Usuário criado
   * @throws {Error} - Se os dados forem inválidos
   */
  async execute(userData) {
    this.validate(userData);
    return await this.userService.createUser(userData);
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

    if (!userData.name || !userData.name.trim()) {
      throw new Error('Nome é obrigatório');
    }

    if (userData.name.trim().length < 3) {
      throw new Error('Nome deve ter no mínimo 3 caracteres');
    }

    if (!userData.email || !userData.email.trim()) {
      throw new Error('Email é obrigatório');
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error('Email inválido');
    }

    if (!userData.password || userData.password.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
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
