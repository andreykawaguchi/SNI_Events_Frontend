import { useController } from 'react-hook-form';

/**
 * Hook personalizado que encapsula a lógica do React Hook Form
 * Facilita a integração com componentes de formulário
 * 
 * @param {Object} params - Parâmetros
 * @param {Object} params.control - Control object do useForm
 * @param {string} params.name - Nome do campo
 * @param {Object} params.rules - Regras de validação (se não usar Zod)
 * @returns {Object} Retorna field e fieldState para usar no componente
 */
export function useFormField(control, name, rules) {
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  return { field, fieldState };
}
