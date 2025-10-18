interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  actions, 
  className = '' 
}: PageHeaderProps) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center space-x-3">{actions}</div>}
    </div>
  );
}

export default PageHeader;
