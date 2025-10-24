/**
 * Interface (contrato) para o StorageService
 * Abstrai a implementação de armazenamento (localStorage, sessionStorage, etc)
 */
export default class IStorageService {
  /**
   * Armazena um valor
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    throw new Error('Method not implemented');
  }

  /**
   * Recupera um valor armazenado
   * @param {string} key
   * @returns {string | null}
   */
  getItem(key) {
    throw new Error('Method not implemented');
  }

  /**
   * Remove um valor armazenado
   * @param {string} key
   */
  removeItem(key) {
    throw new Error('Method not implemented');
  }

  /**
   * Limpa todo o armazenamento
   */
  clear() {
    throw new Error('Method not implemented');
  }
}
