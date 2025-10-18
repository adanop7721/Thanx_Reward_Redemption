import { Link } from 'react-router-dom';

import Card from '../layout/Card';

interface QuickAction {
  label: string;
  icon: string;
  to: string;
  color?: 'blue' | 'gray' | 'green';
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}

const QuickActions = ({ actions, title = 'Quick Actions' }: QuickActionsProps) => {
  const getActionClasses = (color: 'blue' | 'gray' | 'green' = 'blue') => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      gray: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
      green: 'bg-green-50 text-green-700 hover:bg-green-100'
    };
    return `block w-full text-left px-4 py-2 rounded-md transition-colors ${colorMap[color]}`;
  };

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className={getActionClasses(action.color)}
          >
            {action.icon} {action.label}
          </Link>
        ))}
      </div>
    </Card>
  );
}

export default QuickActions;

