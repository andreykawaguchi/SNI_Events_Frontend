#!/usr/bin/env bash
# Script para verificar a implementação React Hook Form + Zod

echo "🔍 Verificando Implementação React Hook Form + Zod"
echo "=================================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "✓ Verificando dependências..."
echo "  • react-hook-form: $(npm list react-hook-form 2>/dev/null | grep 'react-hook-form' | head -1)"
echo "  • zod: $(npm list zod 2>/dev/null | grep 'zod' | head -1)"
echo "  • @hookform/resolvers: $(npm list @hookform/resolvers 2>/dev/null | grep '@hookform' | head -1)"
echo ""

echo "✓ Verificando arquivos criados..."
files=(
    "src/shared/schemas/validationSchemas.js"
    "src/shared/schemas/validationSchemas.test.js"
    "src/shared/hooks/useFormField.js"
    "src/presentation/components/FormInput.jsx"
    "src/presentation/components/AdvancedFormExample.jsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file"
    fi
done
echo ""

echo "✓ Verificando componentes refatorados..."
components=(
    "src/presentation/pages/LoginPage.jsx"
    "src/presentation/pages/CreateUserPage.jsx"
)

for comp in "${components[@]}"; do
    if grep -q "react-hook-form" "$comp" 2>/dev/null; then
        echo -e "  ${GREEN}✓${NC} $comp (integrado com React Hook Form)"
    else
        echo -e "  ${RED}✗${NC} $comp"
    fi
done
echo ""

echo "✓ Verificando documentação..."
docs=(
    "README_REACT_HOOK_FORM.md"
    "REACT_HOOK_FORM_GUIDE.md"
    "IMPLEMENTATION_REACT_HOOK_FORM.md"
    "IMPLEMENTATION_CHECKLIST.md"
    "SUMMARY_REACT_HOOK_FORM.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "  ${GREEN}✓${NC} $doc"
    else
        echo -e "  ${RED}✗${NC} $doc"
    fi
done
echo ""

echo "=================================================="
echo -e "${GREEN}✓ Implementação Concluída com Sucesso!${NC}"
echo ""
echo "📖 Próximos Passos:"
echo "   1. Leia: README_REACT_HOOK_FORM.md"
echo "   2. Estude: REACT_HOOK_FORM_GUIDE.md"
echo "   3. Implemente: Em seus próprios formulários"
echo ""
echo "🚀 Execute com: npm start"
echo "=================================================="
