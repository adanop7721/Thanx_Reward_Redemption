import StatCard from './StatCard';

interface PointsBalanceProps {
  points: number;
  variant?: 'default' | 'highlighted';
  className?: string;
}

const PointsBalance = ({ 
  points, 
  variant = 'default',
  className = '' 
}: PointsBalanceProps) => {
  if (variant === 'highlighted') {
    return (
      <StatCard
        title="Your Points Balance"
        value={`${points} points`}
        icon="💎"
        valueColor="blue"
        className={`bg-blue-50 border border-blue-200 ${className}`}
      />
    );
  }

  return (
    <StatCard
      title="Current Points Balance"
      value={`${points} points`}
      icon="💎"
      valueColor="green"
      className={className}
    />
  );
}

export default PointsBalance;
