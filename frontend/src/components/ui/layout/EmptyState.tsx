import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  actionLink,
  onAction,
  className = '',
}: EmptyStateProps) => {
  const ActionButton = () => {
    if (!actionText) return null;

    const buttonClass = "inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors";

    if (actionLink) {
      return (
        <Link to={actionLink} className={buttonClass}>
          {actionText}
        </Link>
      );
    }

    if (onAction) {
      return (
        <button onClick={onAction} className={buttonClass}>
          {actionText}
        </button>
      );
    }

    return null;
  };

  return (
    <div className={`p-6 text-center ${className}`}>
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-gray-500 text-lg">{title}</p>
      <p className="text-gray-400">{description}</p>
      <ActionButton />
    </div>
  );
}

export default EmptyState;
