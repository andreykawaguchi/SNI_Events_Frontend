// Use case: Login
// Accepts an authService (injected) so we follow Dependency Inversion (SOLID)
export default class LoginUseCase {
  constructor({ authService }) {
    this.authService = authService;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    // Business rules could go here (e.g., throttling, validation)
    const result = await this.authService.login({ email, password });
    return result;
  }
}
