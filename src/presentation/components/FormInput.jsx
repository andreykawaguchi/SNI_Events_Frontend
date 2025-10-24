import React from 'react';

/**
 * Componente reutilizável de Input integrado com React Hook Form
 * @param {Object} props - Props do componente
 * @param {string} props.label - Label do input
 * @param {string} props.id - ID do input
 * @param {string} props.type - Tipo do input (text, email, password, etc)
 * @param {string} props.placeholder - Placeholder do input
 * @param {Object} props.field - Objeto retornado por register() do React Hook Form
 * @param {Object} props.error - Objeto de erro do React Hook Form
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.className - Classes adicionais
 */
export function FormInput({
  label,
  id,
  type = 'text',
  placeholder,
  field,
  error,
  disabled = false,
  className = '',
}) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`form-input ${className}`}
        {...field}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && (
        <div className="form-error">{error.message}</div>
      )}
    </div>
  );
}

export default FormInput;
