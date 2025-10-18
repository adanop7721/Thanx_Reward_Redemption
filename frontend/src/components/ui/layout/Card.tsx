interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ 
  children, 
  className = '', 
  padding = 'md' 
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`bg-white shadow rounded-lg ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}

export default Card;
