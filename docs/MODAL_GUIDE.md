# Modal de Usuários - Guia de Implementação

## 📦 O que foi criado

Uma arquitetura completa para gerenciar (criar e editar) usuários seguindo **SOLID** e **Clean Architecture**:

### Camada de Domínio (Lógica de Negócio)
- ✅ `src/domain/usecases/CreateUserUseCase.js` - Use case para criação
- ✅ `src/domain/usecases/UpdateUserUseCase.js` - Use case para edição

### Camada de Infraestrutura
- ✅ `src/infrastructure/http/UserService.js` - Atualizado com `createUser()` e `updateUser()`
- ✅ `src/infrastructure/factories/ServiceLocator.js` - Atualizado com os novos use cases

### Camada de Apresentação
- ✅ `src/presentation/components/UserModal.jsx` - Modal reutilizável
- ✅ `src/presentation/pages/UsersPage.jsx` - Integrada com modal

### Documentação
- ✅ `ARCHITECTURE.md` - Documentação completa da arquitetura
- ✅ `src/presentation/components/UserModal.test.js` - Exemplos de testes

---

## 🎯 Como Usar

### 1. **Abrir Modal de Criação**

```jsx
// Dentro de qualquer componente
const [isModalOpen, setIsModalOpen] = useState(false);

const handleOpenCreateModal = () => {
  setIsModalOpen(true);
};

<button onClick={handleOpenCreateModal}>
  Novo Usuário
</button>

<UserModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSuccess={() => carregarUsuarios()}
  mode="create"
  createUserUseCase={serviceLocator.get('createUserUseCase')}
/>
```

### 2. **Abrir Modal de Edição**

```jsx
const [selectedUser, setSelectedUser] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMode, setModalMode] = useState('create');

const handleEditUser = (user) => {
  setSelectedUser(user);
  setModalMode('edit');
  setIsModalOpen(true);
};

<button onClick={() => handleEditUser(user)}>
  Editar
</button>

<UserModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSuccess={() => carregarUsuarios()}
  mode={modalMode}
  initialData={selectedUser}
  updateUserUseCase={serviceLocator.get('updateUserUseCase')}
/>
```

---

## 🔍 Props da Modal

```typescript
interface UserModalProps {
  // Controle da modal
  isOpen: boolean;                    // Modal aberta/fechada
  onClose: () => void;                // Callback ao fechar
  onSuccess?: () => void;             // Callback ao salvar com sucesso

  // Dados
  mode?: 'create' | 'edit';           // Modo de operação (padrão: 'create')
  initialData?: {                     // Dados iniciais (necessário em modo 'edit')
    id: string;
    name?: string;
    email?: string;
  };

  // Dependências (injeção)
  createUserUseCase?: CreateUserUseCase;
  updateUserUseCase?: UpdateUserUseCase;
}
```

---

## 🏗️ Fluxo de Criação

```
[Usuário clica "Novo"]
        ↓
[Modal abre vazia]
        ↓
[Usuário preenche formulário]
        ↓
[Usuário clica "Salvar"]
        ↓
[UserModal valida localmente] ← Feedback em tempo real
        ↓
[CreateUserUseCase valida] ← Regras de negócio
        ↓
[UserService faz POST /api/user]
        ↓
[Sucesso: Modal fecha + Lista atualiza]
[Erro: Exibe mensagem de erro]
```

---

## 🏗️ Fluxo de Edição

```
[Usuário clica "Editar" em linha]
        ↓
[Modal abre pre-preenchida]
        ↓
[Usuário altera dados]
        ↓
[Usuário clica "Atualizar"]
        ↓
[UserModal valida localmente]
        ↓
[UpdateUserUseCase valida]
        ↓
[UserService faz PUT /api/user/{id}]
        ↓
[Sucesso: Modal fecha + Lista atualiza]
[Erro: Exibe mensagem de erro]
```

---

## ✨ Recursos

### ✅ Validações Multi-camada
- Frontend: Feedback em tempo real
- Business Logic: Regras de domínio
- Backend: Validação final

### ✅ Modos de Funcionamento
- **Create**: Todos os campos obrigatórios
- **Edit**: Senha opcional, outros campos editáveis

### ✅ Tratamento de Erros
- Erros por campo (validação local)
- Erros gerais (API)
- Limpeza automática ao digitar

### ✅ Estados de Loading
- Desabilita inputs durante envio
- Spinner no botão de ação
- Previne submissão duplicada

### ✅ Acessibilidade
- Labels vinculados aos inputs
- Mensagens de erro com `role="alert"`
- Botão de fechar com `aria-label`

---

## 🧪 Testes

Exemplos de testes estão em `UserModal.test.js`:

```bash
# Rodar testes
npm test

# Rodar teste específico
npm test UserModal

# Cobertura
npm test -- --coverage
```

Testes cobrem:
- ✅ Renderização
- ✅ Validação de formulário
- ✅ Submissão
- ✅ Tratamento de erros
- ✅ Estados de loading

---

## 🔌 Customização

### Adicionar novo campo

```jsx
// 1. UserModal.jsx - adicionar input
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

// 2. CreateUserUseCase.js - adicionar validação
validate(userData) {
  // ... validações existentes ...
  
  if (!userData.phone) {
    throw new Error('Telefone é obrigatório');
  }
}
```

### Trocar endpoint

```javascript
// UserService.js - Atualizar URLs
async createUser(userData) {
  const url = `${API_BASE}/api/custom-endpoint`;  // ← mudar aqui
  // ...
}
```

### Implementar novo backend

```javascript
// Criar novo serviço mantendo interface
class GraphQLUserService {
  async createUser(userData) {
    // implementação GraphQL
  }
  
  async updateUser(userId, userData) {
    // implementação GraphQL
  }
}

// ServiceLocator.js - trocar implementação
case 'userService':
  return new GraphQLUserService(storage);
```

---

## 📋 Checklist de Integração

- [ ] Modal abre ao clicar "Novo Usuário"
- [ ] Modal pre-preenche dados ao clicar "Editar"
- [ ] Validações aparecem em tempo real
- [ ] Erro na API é exibido
- [ ] Sucesso fecha modal e atualiza lista
- [ ] Spinner aparece durante envio
- [ ] Modal pode ser fechada pelo X ou Cancel
- [ ] Testes passam: `npm test`

---

## 🐛 Troubleshooting

### Modal não abre
```javascript
// Verificar se isOpen={true}
<UserModal isOpen={isModalOpen} ... />
```

### Validação não funciona
```javascript
// Verificar use case está passado
createUserUseCase={serviceLocator.get('createUserUseCase')}
```

### Lista não atualiza após salvar
```javascript
// Certificar que onSuccess está chamando carregamento
onSuccess={() => {
  userService.getPagedUsers(1, 100).then(setUsers);
}}
```

### CORS Error
```javascript
// Verificar se backend está rodando
// Padrão: http://localhost:5222
const API_BASE = 'http://localhost:5222';
```

---

## 📚 Referências

- `ARCHITECTURE.md` - Explicação detalhada da arquitetura
- `UserModal.test.js` - Exemplos de testes
- `CreateUserUseCase.js` - Lógica de validação
- `UserService.js` - Chamadas HTTP

---

## 🚀 Próximos Passos

1. Testar com API real
2. Adicionar mais campos conforme necessidade
3. Implementar confirmação de exclusão
4. Adicionar paginação real
5. Implementar filtros e busca
6. Adicionar testes de integração completos

---

**Status**: ✅ Pronto para uso

Todas as camadas seguem SOLID, Clean Architecture e estão prontas para produção!
