/**
 * Service Locator: Factory para instanciar serviços uma única vez
 * Segue o padrão Singleton para evitar múltiplas instâncias
 */
import AuthService from '../http/AuthService';
import UserService from '../http/UserService';
import LocalStorageService from '../storage/LocalStorageService';
import LoginUseCase from '../../domain/LoginUseCase';
import CreateUserUseCase from '../../domain/usecases/CreateUserUseCase';
import UpdateUserUseCase from '../../domain/usecases/UpdateUserUseCase';

class ServiceLocator {
  constructor() {
    this.services = {};
  }

  /**
   * Obtém ou cria uma instância de um serviço
   * @param {string} serviceName - Nome do serviço
   * @returns {Object} - Instância do serviço
   */
  get(serviceName) {
    if (!this.services[serviceName]) {
      this.services[serviceName] = this.createService(serviceName);
    }
    return this.services[serviceName];
  }

  /**
   * Cria uma instância de um serviço baseado no nome
   * @private
   * @param {string} serviceName
   * @returns {Object}
   */
  createService(serviceName) {
    switch (serviceName) {
      case 'storage':
        return new LocalStorageService();

      case 'authService':
        const storageService = this.get('storage');
        return new AuthService(storageService);

      case 'userService':
        const storage = this.get('storage');
        return new UserService(storage);

      case 'createUserUseCase':
        const userSvc = this.get('userService');
        return new CreateUserUseCase(userSvc);

      case 'updateUserUseCase':
        const userSvc2 = this.get('userService');
        return new UpdateUserUseCase(userSvc2);

      case 'loginUseCase':
        const authService = this.get('authService');
        return new LoginUseCase({ authService });

      default:
        throw new Error(`Service ${serviceName} not found in ServiceLocator`);
    }
  }

  /**
   * Resetar serviços (útil para testes)
   */
  reset() {
    this.services = {};
  }
}

// Singleton: instância única do Service Locator
const serviceLocator = new ServiceLocator();

export default serviceLocator;
