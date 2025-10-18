import LoadingSpinner from '../loading/LoadingSpinner';

interface RewardCardProps {
  name: string;
  description: string;
  pointsRequired: number;
  category: string;
  onRedeem?: () => void;
  canRedeem?: boolean;
  isRedeeming?: boolean;
  className?: string;
}

const RewardCard = ({
  name,
  description,
  pointsRequired,
  category,
  onRedeem,
  canRedeem = false,
  isRedeeming = false,
  className = '',
}: RewardCardProps) => {
  const getButtonContent = () => {
    if (isRedeeming) {
      return (
        <div className="flex items-center">
          <LoadingSpinner size="sm" text="" />
          <span className="ml-2">Redeeming...</span>
        </div>
      );
    }
    return canRedeem ? 'Redeem' : 'Not Enough Points';
  };

  const getButtonClass = () => {
    if (canRedeem && !isRedeeming) {
      return 'bg-blue-600 text-white hover:bg-blue-700';
    }
    return 'bg-gray-300 text-gray-500 cursor-not-allowed';
  };

  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold text-blue-600">
              {pointsRequired}
            </span>
            <span className="text-sm text-gray-500 ml-1">points</span>
          </div>

          {onRedeem && (
            <button
              onClick={onRedeem}
              disabled={!canRedeem || isRedeeming}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${getButtonClass()}`}
            >
              {getButtonContent()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RewardCard;

