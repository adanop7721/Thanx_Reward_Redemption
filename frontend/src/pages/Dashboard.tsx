import PageHeader from '../components/ui/layout/PageHeader';
import LoadingPage from '../components/ui/loading/LoadingPage';
import ErrorMessage from '../components/ui/feedback/ErrorMessage';
import PointsBalance from '../components/ui/specialized/PointsBalance';
import QuickActions from '../components/ui/specialized/QuickActions';

import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { state } = useAuth();

  if (state.isLoading) {
    return (
      <LoadingPage 
        title="Loading Dashboard" 
        subtitle="Getting your latest information..."
      />
    );
  }

  if (!state.user) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Dashboard" 
          subtitle="Welcome back! Here's your current status."
        />
        <ErrorMessage 
          message="Unable to load user data" 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome back! Here's your current status." 
      />

      {/* Points Balance Card */}
      <PointsBalance 
        points={state.user?.points_balance || 0}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActions
          actions={[
            { label: 'Browse Rewards', icon: '🎁', to: '/rewards', color: 'blue' },
            { label: 'View History', icon: '📋', to: '/history', color: 'gray' }
          ]}
        />
      </div>
    </div>
  );
}

export default Dashboard;