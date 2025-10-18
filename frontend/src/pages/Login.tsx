import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '../components/ui/forms/AuthLayout';
import AuthForm from '../components/ui/forms/AuthForm';
import FormInput from '../components/ui/forms/FormInput';
import SubmitButton from '../components/ui/forms/SubmitButton';
import Alert from '../components/ui/feedback/Alert';

import { useAuth } from '../contexts/AuthContext';

import { loginSchema, type LoginFormData } from '../lib/validations';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    clearErrors();
    try {
      await login(data.email, data.password);
      // Redirect to dashboard after successful login
      navigate('/', { replace: true });
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Login failed',
      });
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your Thanx Rewards account"
    >
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <Alert message={errors.root.message} />
        )}

        <FormInput
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email')}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />

        <SubmitButton
          isLoading={isSubmitting}
          loadingText="Signing in..."
        >
          Sign in
        </SubmitButton>
      </AuthForm>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;

