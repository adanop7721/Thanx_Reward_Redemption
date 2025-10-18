import { forwardRef } from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, type = 'text', placeholder, autoComplete, error, required = false, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="mt-1">
          <input
            id={id}
            ref={ref}
            type={type}
            autoComplete={autoComplete}
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors ${
              error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            {...props}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
