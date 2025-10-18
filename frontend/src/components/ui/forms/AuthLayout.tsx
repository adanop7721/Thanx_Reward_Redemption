interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow-lg rounded-xl border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
