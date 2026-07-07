import React, { useState, useEffect } from 'react';
import { useAuth } from '~/lib/auth-context';
import { toast } from 'react-hot-toast';
import { fetchFromApi } from '~/lib/api/api-client';
import { Mail, Lock, Eye, EyeOff, X, Loader2, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';
import SneedLogo from '../../assets/images/sneed-logo.png';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalType,
    closeAuthModal,
    openAuthModal,
    login,
    signup,
    user,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset fields when modal opens/closes or switches type
  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [isAuthModalOpen, authModalType]);

  // Close modal if user gets authenticated from outside/another source
  useEffect(() => {
    if (user && isAuthModalOpen) {
      closeAuthModal();
    }
  }, [user, isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (authModalType === 'signup') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
    }

    try {
      setIsSubmitting(true);

      if (authModalType === 'login') {
        const token = await login(email, password);
        const response = await fetchFromApi<{
          success: boolean;
          message: string;
          data?: { shopifyCustomerId?: string };
        }>('users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });

        if (response?.data?.shopifyCustomerId && typeof window !== 'undefined') {
          localStorage.setItem('shopifyCustomerId', response.data.shopifyCustomerId);
        }
        toast.success('Welcome back! Login successful.');
      } else {
        const token = await signup(email, password);
        const response = await fetchFromApi<{
          success: boolean;
          message: string;
          data?: { shopifyCustomerId?: string };
        }>('users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });

        if (response?.data?.shopifyCustomerId && typeof window !== 'undefined') {
          localStorage.setItem('shopifyCustomerId', response.data.shopifyCustomerId);
        }
        toast.success('Account created successfully! Welcome to Sneed.');
      }

      closeAuthModal();
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog Container */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header/Accents */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl inline-block">
            <img src={SneedLogo} alt="Sneed Logo" className="h-7 w-auto" />
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => openAuthModal('login')}
            className={`flex-1 py-3 text-center text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              authModalType === 'login'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => openAuthModal('signup')}
            className={`flex-1 py-3 text-center text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              authModalType === 'signup'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {authModalType === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              {authModalType === 'login' 
                ? 'Access your Sneed account details and orders' 
                : 'Enjoy high-priority technical support and easy tracking'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="modal-email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  id="modal-email"
                  type="email"
                  required
                  className="block w-full pl-9.5 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm transition-all duration-200"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="modal-password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                {authModalType === 'login' && (
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); toast.error("Password reset feature is coming soon!"); }} 
                    className="text-[10px] font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  id="modal-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-9.5 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm transition-all duration-200"
                  placeholder={authModalType === 'login' ? '••••••••' : '•••••••• (Min 6 chars)'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {authModalType === 'signup' && (
              <div>
                <label htmlFor="modal-confirm-password" className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    id="modal-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="block w-full pl-9.5 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm transition-all duration-200"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-[#9A1A1C] hover:bg-[#801416] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] transition-all duration-200 mt-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : authModalType === 'login' ? (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <UserPlus className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom quick notes */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            <span>Secure encryption via Firebase & Shopify Customer API</span>
          </div>
        </div>
      </div>
    </div>
  );
}
