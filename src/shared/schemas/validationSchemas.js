import { z } from 'zod';

/**
 * Função auxiliar para validar CPF
 */
const isValidCPF = (cpf) => {
  if (!cpf) return false;
  
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Calcula primeiro dígito verificador
  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;
  
  // Calcula segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;
  
  return true;
};

/**
 * Schema de validação para Login
 */
export const loginSchema = z.object({
  email: z
    .string('Email é obrigatório')
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string('Senha é obrigatória')
    // .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .min(1, 'Senha é obrigatória'),
});

/**
 * Schema de validação para Criar Usuário
 */
export const createUserSchema = z.object({
  name: z
    .string('Nome é obrigatório')
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres'),
  email: z
    .string('Email é obrigatório')
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  cpf: z
    .string('CPF é obrigatório')
    .min(1, 'CPF é obrigatório')
    .refine(isValidCPF, 'CPF inválido'),
  password: z
    .string('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .min(1, 'Senha é obrigatória'),
});

/**
 * Schema de validação para Atualizar Usuário
 */
export const updateUserSchema = z.object({
  id: z
    .union([z.string(), z.number()])
    .optional(),
  name: z
    .string('Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres'),
  email: z
    .string('Email é obrigatório')
    .email('Email inválido'),
  cpf: z
    .string()
    .optional()
    .refine(
      (val) => !val || isValidCPF(val),
      'CPF inválido'
    ),
  password: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 6,
      'Senha deve ter no mínimo 6 caracteres'
    ),
});
