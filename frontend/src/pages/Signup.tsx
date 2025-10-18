import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '../components/ui/forms/AuthLayout';
import AuthForm from '../components/ui/forms/AuthForm';
import FormInput from '../components/ui/forms/FormInput';
import SubmitButton from '../components/ui/forms/SubmitButton';
import Alert from '../components/ui/feedback/Alert';

import { useAuth } from '../contexts/AuthContext';

import { signupSchema, type SignupFormData } from '../lib/validations';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    clearErrors();
    try {
      await signup(data.email, data.password, data.passwordConfirmation);
      navigate('/', { replace: true });
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Signup failed',
      });
    }
  };

  return (
    <AuthLayout 
      title="Join Thanx Rewards" 
      subtitle="Create your account to start earning rewards"
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
          autoComplete="new-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />

        <FormInput
          id="passwordConfirmation"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        <SubmitButton
          isLoading={isSubmitting}
          loadingText="Creating account..."
        >
          Create account
        </SubmitButton>
      </AuthForm>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Signup;

