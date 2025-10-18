interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ 
  isLoading, 
  loadingText, 
  children, 
  className = '' 
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}

export default SubmitButton;
