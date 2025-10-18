interface AlertProps {
  message?: string;
  type?: 'success' | 'error';
  className?: string;
}

const Alert = ({ message, type = 'error', className = '' }: AlertProps) => {
  if (!message) return null;
  
  const isSuccess = type === 'success' || message.includes('✅');
  
  return (
    <div className={`px-4 py-3 rounded-md text-sm ${
      isSuccess 
        ? 'bg-green-50 border border-green-200 text-green-600'
        : 'bg-red-50 border border-red-200 text-red-600'
    } ${className}`}>
      {message}
    </div>
  );
}

export default Alert;
