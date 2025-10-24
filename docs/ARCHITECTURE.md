# Arquitetura Modal de Usuários - Clean Architecture & SOLID

## Visão Geral

Esta implementação segue os princípios de **Clean Architecture** e **SOLID**, separando as responsabilidades em camadas distintas:

```
┌─────────────────────────────────────────┐
│      Presentation Layer (React)         │
│  UsersPage.jsx → UserModal.jsx          │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│      Domain Layer (Business Logic)      │
│  CreateUserUseCase                      │
│  UpdateUserUseCase                      │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  Infrastructure Layer (External APIs)   │
│  UserService → HTTP/API Calls           │
└─────────────────────────────────────────┘
```

---

## Estrutura de Arquivos

```
src/
├── domain/
│   ├── entities/
│   │   └── User.js                  # Entidade de domínio
│   └── usecases/
│       ├── CreateUserUseCase.js     # Lógica de criação
│       └── UpdateUserUseCase.js     # Lógica de atualização
│
├── infrastructure/
│   ├── http/
│   │   └── UserService.js           # Chamadas HTTP
│   └── factories/
│       └── ServiceLocator.js        # Injeção de dependências
│
└── presentation/
    ├── pages/
    │   └── UsersPage.jsx            # Página principal
    └── components/
        └── UserModal.jsx            # Modal reutilizável
```

---

## Princípios SOLID Aplicados

### 1. **S** - Single Responsibility Principle

Cada classe/componente tem uma única responsabilidade:

- **UserModal.jsx**: Apenas apresentação da modal
- **UserService.js**: Apenas comunicação HTTP
- **CreateUserUseCase.js**: Apenas validação e orquestração de criação
- **UpdateUserUseCase.js**: Apenas validação e orquestração de atualização

### 2. **O** - Open/Closed Principle

Aberto para extensão, fechado para modificação:

```javascript
// UserModal aceita qualquer use case que siga a interface
<UserModal
  createUserUseCase={createUserUseCase}
  updateUserUseCase={updateUserUseCase}
/>
```

Podemos mudar a implementação dos use cases sem alterar UserModal.

### 3. **L** - Liskov Substitution Principle

UserService pode ser substituído por outro serviço com mesma interface:

```javascript
// Interface consistente
async getPagedUsers(page, pageSize)
async createUser(userData)
async updateUser(userId, userData)
async deleteUser(userId)
```

### 4. **I** - Interface Segregation Principle

Componentes recebem apenas as dependências que usam:

```javascript
// UserModal não precisa conhecer sobre autenticação
<UserModal
  createUserUseCase={...}  // Apenas o necessário
  updateUserUseCase={...}
/>
```

### 5. **D** - Dependency Inversion Principle

Componentes dependem de abstrações, não de implementações concretas:

```javascript
// UserModal recebe as dependências como props (injeção)
// Não cria as dependências diretamente
const handleSubmit = async (e) => {
  await createUserUseCase.execute(formData);  // Chamando a abstração
};
```

---

## Fluxo de Dados

### Criação de Usuário

```
1. Usuário clica "Novo Usuário"
   ↓
2. UsersPage abre UserModal em modo 'create'
   ↓
3. Usuário preenche formulário e clica "Salvar"
   ↓
4. UserModal valida localmente (frontend)
   ↓
5. UserModal chama createUserUseCase.execute(formData)
   ↓
6. CreateUserUseCase valida os dados (business logic)
   ↓
7. CreateUserUseCase chama userService.createUser(userData)
   ↓
8. UserService faz POST request para /api/user
   ↓
9. Modal fecha e atualiza lista
```

### Edição de Usuário

```
1. Usuário clica "Editar" em um usuário
   ↓
2. UsersPage abre UserModal em modo 'edit' com dados do usuário
   ↓
3. UserModal pre-preenche formulário
   ↓
4. Usuário altera dados e clica "Atualizar"
   ↓
5. UserModal chama updateUserUseCase.execute(userId, updateData)
   ↓
6. UpdateUserUseCase valida apenas campos alteráveis
   ↓
7. UpdateUserUseCase chama userService.updateUser(userId, updateData)
   ↓
8. UserService faz PUT request para /api/user/{id}
   ↓
9. Modal fecha e atualiza lista
```

---

## Validações

### Camada de Apresentação (UserModal)
- Validação em tempo real (real-time feedback)
- Feedback visual de erros
- Desabilita campos durante envio

### Camada de Domínio (Use Cases)
- Validação de regras de negócio
- Validação de formato de email
- Validação de comprimento mínimo de senha

### Camada de Infraestrutura (UserService)
- Tratamento de erros HTTP
- Gestão de tokens de autenticação

---

## Injeção de Dependências

O **ServiceLocator** segue o padrão **Singleton** para gerenciar instâncias:

```javascript
// Criação única das dependências
case 'createUserUseCase':
  const userSvc = this.get('userService');
  return new CreateUserUseCase(userSvc);
```

Uso na página:

```javascript
<UserModal
  createUserUseCase={serviceLocator.get('createUserUseCase')}
  updateUserUseCase={serviceLocator.get('updateUserUseCase')}
/>
```

---

## Como Estender

### Adicionar Validação Customizada

```javascript
// src/domain/usecases/CreateUserUseCase.js
validate(userData) {
  // ... validações existentes ...
  
  // Nova validação
  if (userData.email.includes('+')) {
    throw new Error('Email não pode conter +');
  }
}
```

### Adicionar Novo Campo

```javascript
// 1. Atualizar UserModal.jsx
<div className="form-group">
  <label htmlFor="phone" className="form-label">
    Telefone
  </label>
  <input
    id="phone"
    type="tel"
    value={formData.phone}
    onChange={(e) => handleChange('phone', e.target.value)}
  />
</div>

// 2. Atualizar CreateUserUseCase
validate(userData) {
  // ... validações existentes ...
  if (!userData.phone) {
    throw new Error('Telefone é obrigatório');
  }
}

// 3. UserService.createUser() já é genérico
// Apenas passa userData como está
```

### Implementar Outro Backend

```javascript
// Criar novo serviço
class GraphQLUserService {
  async getPagedUsers(page, pageSize) {
    // Query GraphQL
  }
  
  async createUser(userData) {
    // Mutation GraphQL
  }
}

// Atualizar ServiceLocator
case 'userService':
  return new GraphQLUserService();
```

---

## Testes

### Testando Use Case (Isolado)

```javascript
describe('CreateUserUseCase', () => {
  let useCase;
  let mockUserService;

  beforeEach(() => {
    mockUserService = {
      createUser: jest.fn().mockResolvedValue({ id: '1', name: 'João', email: 'joao@test.com' })
    };
    useCase = new CreateUserUseCase(mockUserService);
  });

  it('deve validar email inválido', async () => {
    await expect(useCase.execute({
      name: 'João',
      email: 'invalid-email',
      password: 'senha123'
    })).rejects.toThrow('Email inválido');
  });

  it('deve criar usuário válido', async () => {
    await useCase.execute({
      name: 'João Silva',
      email: 'joao@example.com',
      password: 'senha123'
    });
    
    expect(mockUserService.createUser).toHaveBeenCalled();
  });
});
```

### Testando Componente (Com Mock)

```javascript
describe('UserModal', () => {
  it('deve chamar createUserUseCase ao submeter', async () => {
    const mockUseCase = {
      execute: jest.fn().mockResolvedValue({})
    };

    const { getByText, getByPlaceholderText } = render(
      <UserModal
        isOpen={true}
        onClose={jest.fn()}
        onSuccess={jest.fn()}
        createUserUseCase={mockUseCase}
        updateUserUseCase={null}
        mode="create"
      />
    );

    fireEvent.change(getByPlaceholderText('João Silva'), {
      target: { value: 'João Silva' }
    });
    fireEvent.click(getByText('Criar Usuário'));

    await waitFor(() => {
      expect(mockUseCase.execute).toHaveBeenCalled();
    });
  });
});
```

---

## Benefícios Desta Arquitetura

✅ **Separação de Responsabilidades**: Cada camada tem seu papel bem definido

✅ **Testabilidade**: Componentes podem ser testados isoladamente

✅ **Manutenibilidade**: Mudanças em uma camada não afetam as outras

✅ **Reusabilidade**: Use Cases podem ser reutilizados em outros componentes

✅ **Escalabilidade**: Fácil adicionar novas funcionalidades sem quebrar código existente

✅ **Independência de Frameworks**: Lógica de negócio não depende do React

---

## Próximos Passos

- [ ] Implementar testes unitários
- [ ] Adicionar spinner de carregamento para edição
- [ ] Implementar confirmação antes de deletar
- [ ] Adicionar paginação real
- [ ] Implementar busca e filtros
- [ ] Adicionar validação de email único (backend)
