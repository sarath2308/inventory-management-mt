import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useLogin } from '../hooks/auth/auth.login.hook';

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginMutation = useLogin();

  const validate = (name: string, value: string) => {
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = 'Email is required';
      else if (!emailRegex.test(value)) error = 'Enter a valid email address';
    }
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 6) error = 'Password must be at least 6 characters';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error while typing to be less intrusive
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    validate(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Final check before submission
    validate('email', formData.email);
    validate('password', formData.password);

    if (errors.email || errors.password || !formData.email || !formData.password) return;

    setIsSubmitting(true);
    try{
    await loginMutation.mutateAsync({email: formData.email, password: formData.password})
    }catch(err){
        console.error(err)
    }
    finally
    {
    setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md p-8 bg-[#141414] border border-zinc-800 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-zinc-400 mb-8">Enter your credentials to access your account.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-[#1c1c1c] border rounded-lg outline-none transition-all text-white ${
                errors.email ? 'border-red-500 focus:ring-1 ring-red-500' : 'border-zinc-800 focus:border-blue-500'
              }`}
              placeholder="name@company.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-[#1c1c1c] border rounded-lg outline-none transition-all text-white ${
                errors.password ? 'border-red-500 focus:ring-1 ring-red-500' : 'border-zinc-800 focus:border-blue-500'
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;