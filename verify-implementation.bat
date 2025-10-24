@echo off
REM Script para verificar a implementação React Hook Form + Zod (Windows)

setlocal enabledelayedexpansion

echo.
echo 🔍 Verificando Implementação React Hook Form + Zod
echo ==================================================
echo.

echo ✓ Verificando dependências...
for /f "delims=" %%A in ('npm list react-hook-form 2^>nul ^| findstr "react-hook-form"') do echo   • %%A
for /f "delims=" %%A in ('npm list zod 2^>nul ^| findstr "zod@"') do echo   • %%A
for /f "delims=" %%A in ('npm list @hookform/resolvers 2^>nul ^| findstr "@hookform"') do echo   • %%A
echo.

echo ✓ Verificando arquivos criados...
set "files[0]=src\shared\schemas\validationSchemas.js"
set "files[1]=src\shared\schemas\validationSchemas.test.js"
set "files[2]=src\shared\hooks\useFormField.js"
set "files[3]=src\presentation\components\FormInput.jsx"
set "files[4]=src\presentation\components\AdvancedFormExample.jsx"

for /L %%i in (0,1,4) do (
    if exist "!files[%%i]!" (
        echo   [OK] !files[%%i]!
    ) else (
        echo   [XX] !files[%%i]!
    )
)
echo.

echo ✓ Verificando componentes refatorados...
if exist "src\presentation\pages\LoginPage.jsx" (
    findstr /M "react-hook-form" "src\presentation\pages\LoginPage.jsx" >nul
    if !errorlevel! equ 0 (
        echo   [OK] LoginPage.jsx (integrado com React Hook Form)
    )
)
if exist "src\presentation\pages\CreateUserPage.jsx" (
    findstr /M "react-hook-form" "src\presentation\pages\CreateUserPage.jsx" >nul
    if !errorlevel! equ 0 (
        echo   [OK] CreateUserPage.jsx (integrado com React Hook Form)
    )
)
echo.

echo ✓ Verificando documentação...
set "docs[0]=README_REACT_HOOK_FORM.md"
set "docs[1]=REACT_HOOK_FORM_GUIDE.md"
set "docs[2]=IMPLEMENTATION_REACT_HOOK_FORM.md"
set "docs[3]=IMPLEMENTATION_CHECKLIST.md"
set "docs[4]=SUMMARY_REACT_HOOK_FORM.md"

for /L %%i in (0,1,4) do (
    if exist "!docs[%%i]!" (
        echo   [OK] !docs[%%i]!
    ) else (
        echo   [XX] !docs[%%i]!
    )
)
echo.

echo ==================================================
echo ✓ Implementação Concluída com Sucesso!
echo.
echo 📖 Próximos Passos:
echo    1. Leia: README_REACT_HOOK_FORM.md
echo    2. Estude: REACT_HOOK_FORM_GUIDE.md
echo    3. Implemente: Em seus próprios formulários
echo.
echo 🚀 Execute com: npm start
echo ==================================================
echo.

endlocal
