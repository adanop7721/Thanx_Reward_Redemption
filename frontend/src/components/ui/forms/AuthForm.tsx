interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

const AuthForm = ({ onSubmit, children }: AuthFormProps) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default AuthForm;