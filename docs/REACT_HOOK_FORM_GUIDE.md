# React Hook Form + Zod - Guia de Uso

## 📚 Visão Geral

Este projeto utiliza **React Hook Form** + **Zod** para validações robustas e de alta performance.

### Benefícios

✅ Validações centralizadas em schemas  
✅ Mensagens de erro consistentes  
✅ Menor número de re-renders  
✅ Melhor performance  
✅ Código mais limpo e maintível  
✅ Type-safe com Zod  

---

## 🚀 Como Usar

### 1. Definir Schema de Validação

No arquivo `src/shared/schemas/validationSchemas.js`:

```javascript
import { z } from 'zod';

export const myFormSchema = z.object({
  email: z
    .string('Email é obrigatório')
    .email('Email inválido'),
  name: z
    .string('Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
});
```

### 2. Usar em um Componente

```javascript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { myFormSchema } from '../../shared/schemas/validationSchemas.js';

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm({
    resolver: zodResolver(myFormSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Fazer algo com os dados
      console.log(data);
    } catch (err) {
      setFormError('root', { message: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Enviar
      </button>
    </form>
  );
}
```

### 3. Usar Componente FormInput (Opcional)

Para ainda mais simplicidade, use o componente `FormInput`:

```javascript
import { FormInput } from '../../presentation/components/FormInput.jsx';

<FormInput
  label="Email"
  id="email"
  type="email"
  placeholder="seu@email.com"
  field={register('email')}
  error={errors.email}
  disabled={isSubmitting}
/>
```

---

## 📋 Schemas Disponíveis

### loginSchema
- `email`: string, email válido
- `password`: string, mínimo 6 caracteres

### createUserSchema
- `name`: string, 3-100 caracteres
- `email`: string, email válido

### updateUserSchema
- `name`: string, 3-100 caracteres
- `email`: string, email válido

---

## 🎯 Validações Comuns

### Email

```javascript
email: z
  .string('Email é obrigatório')
  .email('Email inválido')
  .min(1, 'Email é obrigatório'),
```

### Senha

```javascript
password: z
  .string('Senha é obrigatória')
  .min(6, 'Mínimo 6 caracteres')
  .min(1, 'Senha é obrigatória'),
```

### URL

```javascript
url: z
  .string('URL é obrigatória')
  .url('URL inválida'),
```

### Número

```javascript
age: z
  .number('Idade deve ser um número')
  .min(18, 'Deve ter pelo menos 18 anos'),
```

### Confirmação de Senha

```javascript
const mySchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });
```

---

## 📚 Referências

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Docs](https://zod.dev/)
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers)

---

## ✨ Próximos Passos

1. Adicionar mais schemas conforme necessário
2. Criar componentes específicos para cada tipo de input
3. Adicionar validações customizadas se necessário
4. Integrar com backend API
