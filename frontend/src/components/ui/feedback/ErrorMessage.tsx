interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  retryText?: string;
  className?: string;
}

const ErrorMessage = ({ 
  message, 
  onRetry, 
  onDismiss, 
  retryText = 'Retry',
  className = '' 
}: ErrorMessageProps) => {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-red-600 mr-3">❌</div>
          <p className="text-red-800">{message}</p>
        </div>
        <div className="flex items-center space-x-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              {retryText}
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
