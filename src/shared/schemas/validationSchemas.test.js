import {
  loginSchema,
  createUserSchema,
  updateUserSchema,
} from '../validationSchemas';

/**
 * Testes para validação com Zod
 * Executar com: npm test
 */

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('deve validar um login válido', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar email inválido', () => {
      const data = {
        email: 'invalid-email',
        password: 'password123',
      };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toBe('Email inválido');
    });

    it('deve rejeitar senha muito curta', () => {
      const data = {
        email: 'test@example.com',
        password: '123',
      };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toContain('6 caracteres');
    });

    it('deve rejeitar campos vazios', () => {
      const data = {
        email: '',
        password: '',
      };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('createUserSchema', () => {
    it('deve validar um usuário válido', () => {
      const data = {
        name: 'João Silva',
        email: 'joao@example.com',
      };
      const result = createUserSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar nome muito curto', () => {
      const data = {
        name: 'Jo',
        email: 'joao@example.com',
      };
      const result = createUserSchema.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toContain('3 caracteres');
    });

    it('deve rejeitar nome muito longo', () => {
      const data = {
        name: 'a'.repeat(101),
        email: 'joao@example.com',
      };
      const result = createUserSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar email inválido', () => {
      const data = {
        name: 'João Silva',
        email: 'invalid',
      };
      const result = createUserSchema.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toBe('Email inválido');
    });

    it('deve aceitar nomes com caracteres especiais', () => {
      const data = {
        name: 'João da Silva',
        email: 'joao@example.com',
      };
      const result = createUserSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('updateUserSchema', () => {
    it('deve validar uma atualização válida', () => {
      const data = {
        name: 'Novo Nome',
        email: 'novo@example.com',
      };
      const result = updateUserSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('deve ter mesmas regras que createUserSchema', () => {
      const invalidData = {
        name: 'AB',
        email: 'invalid-email',
      };
      const createResult = createUserSchema.safeParse(invalidData);
      const updateResult = updateUserSchema.safeParse(invalidData);
      expect(createResult.success).toBe(updateResult.success);
    });
  });

  describe('Error Messages', () => {
    it('deve retornar mensagens em português', () => {
      const result = loginSchema.safeParse({
        email: 'invalid',
        password: '123',
      });
      expect(result.success).toBe(false);
      const messages = result.error?.issues.map((i) => i.message) || [];
      expect(messages.some((m) => m.includes('português') || m.includes('Email'))).toBe(true);
    });
  });
});
