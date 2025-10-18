interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  valueColor?: 'blue' | 'green' | 'red' | 'gray';
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  valueColor = 'blue',
  className = '' 
}: StatCardProps) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    gray: 'text-gray-900',
  };

  return (
    <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${colorClasses[valueColor]}`}>
            {value}
          </p>
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
    </div>
  );
}

export default StatCard;

