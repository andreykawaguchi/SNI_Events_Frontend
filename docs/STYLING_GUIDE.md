# 🎨 Guia de Estilização - SNI Events Frontend

## Visão Geral

Este projeto usa uma combinação de:
- **Tailwind CSS** para estilos utilitários
- **CSS Customizado** para componentes e layout específicos
- **Tema de Cores Personalizado** com paleta moderna e profissional

## 📦 Arquivos de Estilo

### 1. `src/index.css`
Arquivo principal com:
- Estilos base do Tailwind CSS (`@tailwind` directives)
- Estilos base para elementos HTML
- Componentes CSS reutilizáveis
- Utilidades customizadas

### 2. `src/App.css`
Estilos do layout principal:
- Estrutura do App Shell (sidebar + content)
- Estilos da sidebar
- Responsividade

### 3. `src/presentation/components/components.css`
Biblioteca de componentes:
- Formulários
- Botões
- Cards
- Tabelas
- Alertas
- Badges
- Modals
- Estilos de carregamento

### 4. `tailwind.config.cjs`
Configuração do Tailwind com:
- Paleta de cores personalizada
- Tipografia customizada
- Espaçamento consistente
- Sombras e efeitos

## 🎯 Paleta de Cores

### Cores Primárias
```
primary-600: #0ea5e9 (Azul principal)
primary-700: #0284c7 (Azul escuro - hover)
```

### Cores Secundárias
```
secondary-50 a 900: Tons de cinza/azul (UI backgrounds)
secondary-900: #0f172a (Muito escuro - sidebar)
```

### Cores de Status
```
success: #10b981 (Verde)
warning: #f59e0b (Âmbar)
error: #ef4444 (Vermelho)
info: #3b82f6 (Azul)
```

## 🧩 Componentes CSS Disponíveis

### Botões
```html
<!-- Primário -->
<button class="btn btn-primary">Ação Principal</button>

<!-- Secundário -->
<button class="btn btn-secondary">Ação Secundária</button>

<!-- Outline -->
<button class="btn btn-outline">Ação Alternativa</button>

<!-- Perigo -->
<button class="btn btn-danger">Deletar</button>

<!-- Ghost -->
<button class="btn btn-ghost">Ação Leve</button>

<!-- Tamanhos -->
<button class="btn btn-small">Pequeno</button>
<button class="btn btn-large">Grande</button>
```

### Formulários
```html
<div class="form-group">
  <label class="form-label">Seu Label</label>
  <input class="form-input" type="text" placeholder="Digite...">
  <div class="form-hint">Texto de ajuda</div>
  <div class="form-error">Mensagem de erro</div>
</div>

<textarea class="form-textarea"></textarea>
<select class="form-select"></select>
```

### Alertas
```html
<div class="alert alert-success">Sucesso!</div>
<div class="alert alert-error">Erro!</div>
<div class="alert alert-warning">Atenção!</div>
<div class="alert alert-info">Informação</div>
```

### Cards
```html
<div class="card">
  <div class="card-header">
    <h2>Título do Card</h2>
  </div>
  
  <p>Conteúdo aqui</p>
  
  <div class="card-footer">
    <button class="btn btn-primary">Ação</button>
  </div>
</div>
```

### Tabelas
```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Coluna 1</th>
        <th>Coluna 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dados</td>
        <td>Dados</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-error">Error</span>
<span class="badge badge-warning">Warning</span>
```

### Estados de Carregamento
```html
<div class="spinner"></div>

<button class="btn btn-primary loading-text">
  <span class="spinner"></span>
  Carregando...
</button>
```

## 🎨 Utilities Customizadas

```html
<!-- Flex -->
<div class="flex-center">Centralizado</div>
<div class="flex-between">Espaço entre</div>

<!-- Texto -->
<span class="truncate-text">Texto cortado...</span>

<!-- Scrollbar -->
<div class="scrollbar-thin">Conteúdo com scrollbar fino</div>
```

## 📱 Responsividade

### Breakpoints
```
xs: 0px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Exemplo de uso
```html
<!-- Oculto em mobile, visível em desktop -->
<div class="hidden md:block">Apenas desktop</div>

<!-- Grid responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- Conteúdo -->
</div>
```

## 🔧 Como Usar

### Em Componentes React
```jsx
import '../components/components.css';

export function MeuComponente() {
  return (
    <div className="card">
      <h2>Título</h2>
      <p>Conteúdo</p>
      <button className="btn btn-primary">Ação</button>
    </div>
  );
}
```

### Combinando Tailwind + CSS Custom
```jsx
<div className="bg-white rounded-lg shadow-lg p-6">
  <button className="btn btn-primary">Ação</button>
</div>
```

## 📚 Convenções

1. **Classes CSS**: Use kebab-case (ex: `btn-primary`)
2. **Tailwind**: Use convenções Tailwind (ex: `bg-primary-600`)
3. **IDs**: Evite usar IDs para estilização, prefira classes
4. **Specificity**: Mantenha baixa especificidade, evite `!important`

## 🎯 Padrões de Design

### Cores por Contexto
- **Primárias**: Ações principais, links
- **Secundárias**: Backgrounds, separadores
- **Success**: Operações bem-sucedidas
- **Error**: Erros, validações negativas
- **Warning**: Avisos, confirmações
- **Info**: Informações adicionais

### Espaçamento
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Sombras
- **xs**: Sutil
- **sm**: Leve
- **md**: Média (padrão para cards)
- **lg**: Pronunciada
- **xl**: Forte (modals, dropdowns)

## 🚀 Performance

- Tailwind CSS é compilado para produção (built-in minification)
- CSS customizado é otimizado pelo React
- Sem CSS não-utilizado no build final

## 🔄 Atualizações Futuras

Possíveis melhorias:
- [ ] Tema dark mode
- [ ] Animações customizadas
- [ ] Componentes headless
- [ ] Sistema de ícones integrado
- [ ] Documentação interativa (Storybook)

## 📖 Referências

- [Tailwind CSS Docs](https://tailwindcss.com)
- [MDN Web Docs](https://developer.mozilla.org/pt-BR/)
- [Accessible Colors](https://www.accessiblecolors.com/)
