interface SuccessMessageProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

const SuccessMessage = ({ 
  message, 
  onDismiss, 
  className = '' 
}: SuccessMessageProps) => {
  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-green-600 mr-3">✅</div>
          <p className="text-green-800">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-green-500 hover:text-green-700"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SuccessMessage;
