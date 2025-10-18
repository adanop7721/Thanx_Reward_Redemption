import PageHeader from '../layout/PageHeader';
import Card from '../layout/Card';
import LoadingSpinner from './LoadingSpinner';

interface LoadingPageProps {
  title: string;
  subtitle?: string;
  text?: string;
}

const LoadingPage = ({ 
  title, 
  subtitle, 
  text = 'Loading...' 
}: LoadingPageProps) => {
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={subtitle} />
      <Card>
        <LoadingSpinner text={text} />
      </Card>
    </div>
  );
}

export default LoadingPage;
