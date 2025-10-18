import { useState, useRef } from 'react';
import PageHeader from '../components/ui/layout/PageHeader';
import LoadingPage from '../components/ui/loading/LoadingPage';
import ErrorMessage from '../components/ui/feedback/ErrorMessage';
import StatCard from '../components/ui/specialized/StatCard';
import EmptyState from '../components/ui/layout/EmptyState';
import Card from '../components/ui/layout/Card';

import { useRedemptionHistory } from '../hooks/useRedemptionHistory';

import { formatDate, formatDateShort } from '../utils/dateUtils';

const History = () => {
  const { redemptions, loading, error, refetch, totalPointsUsed } = useRedemptionHistory();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll events to show/hide scroll-to-top button
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setShowScrollTop(target.scrollTop > 200);
  };

  // Scroll to top function
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <LoadingPage 
        title="Redemption History" 
        subtitle="View your past reward redemptions."
        text="Loading history..."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Redemption History" 
        subtitle="View your past reward redemptions." 
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Redemptions"
          value={redemptions.length}
          icon="🎁"
          valueColor="blue"
        />
        
        <StatCard
          title="Points Used"
          value={totalPointsUsed}
          icon="💎"
          valueColor="red"
        />
        
        <StatCard
          title="Last Redemption"
          value={redemptions.length > 0 ? formatDateShort(redemptions[0].created_at) : 'None'}
          icon="📅"
          valueColor="gray"
        />
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={refetch}
        />
      )}

      {/* Redemption History List */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Redemptions</h3>
          {redemptions.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {redemptions.length} redemption{redemptions.length !== 1 ? 's' : ''} total
            </p>
          )}
        </div>
        
        {redemptions.length === 0 ? (
          <EmptyState
            icon="🎁"
            title="No redemptions yet"
            description="Start browsing rewards to make your first redemption!"
            actionText="Browse Rewards"
            actionLink="/rewards"
          />
        ) : (
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="max-h-96 overflow-y-auto scroll-smooth"
              style={{ scrollbarGutter: 'stable' }}
              onScroll={handleScroll}
            >
            <div className="divide-y divide-gray-200">
              {redemptions.map((redemption, index) => (
                <div 
                  key={redemption.id} 
                  className="p-6 hover:bg-gray-50 transition-colors duration-150"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.4s ease-out forwards'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">
                          {redemption.reward.name}
                        </h4>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          {redemption.reward.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mt-1">
                        {redemption.reward.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            Redeemed on {formatDate(redemption.created_at)}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-red-600">
                            -{redemption.points_used}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll to top button */}
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                title="Scroll to top"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </svg>
              </button>
            )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default History;
