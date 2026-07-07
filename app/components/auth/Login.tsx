import { useState, useEffect } from 'react';
import { useAuth } from '~/lib/auth-context';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { fetchFromApi } from '~/lib/api/api-client';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Truck, Clock, Loader2 } from 'lucide-react';
import SneedLogo from "../../assets/images/sneed-logo.png";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      void navigate('/');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const token = await login(email, password);
      
      const response = await fetchFromApi<{
        success: boolean;
        message: string;
        data?: {
          shopifyCustomerId?: string;
        };
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
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Column: Brand Hero - hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-[#801416] via-[#9A1A1C] to-[#4d090a] p-12 text-white flex-col justify-between overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>
        
        <div>
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl inline-block shadow-lg">
            <img src={SneedLogo} alt="Sneed Logo" className="h-10 w-auto" />
          </div>
          <div className="mt-20 space-y-6 max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Industrial Coding & Marking Systems Made Simple.
            </h1>
            <p className="text-red-100 text-lg">
              Sign in to manage your orders, track shipments, and access customized solutions for your printing needs.
            </p>
          </div>
        </div>

        {/* Brand Value Props */}
        <div className="space-y-6 border-t border-white/10 pt-8 mt-auto">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2.5 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-red-200" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Certified Original Supplies</h4>
              <p className="text-sm text-red-100/80">Get maximum prints and guarantee longevity for your equipment.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2.5 rounded-lg">
              <Truck className="w-5 h-5 text-red-200" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Direct & Swift Delivery</h4>
              <p className="text-sm text-red-100/80">Get high-priority processing and fast shipping for inks and filters.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2.5 rounded-lg">
              <Clock className="w-5 h-5 text-red-200" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Technical Support Access</h4>
              <p className="text-sm text-red-100/80">Direct connection to Sneed technicians and documentation.</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-red-200/60 mt-12">
          © {new Date().getFullYear()} Sneed Coding Solutions. All rights reserved.
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo visible on mobile only */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl inline-block">
              <img src={SneedLogo} alt="Sneed Logo" className="h-10 w-auto" />
            </div>
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign In
            </h2>
            <p className="text-slate-500 text-sm">
              Enter your credentials to access your account dashboard
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={(e) => { void handleSubmit(e); }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10.5 pr-4 py-3 bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm transition-all duration-200"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  {/* Forgot Password link placeholder - styled but not wired */}
                  <a href="#" onClick={(e) => { e.preventDefault(); toast.error("Password reset feature is coming soon!"); }} className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10.5 pr-11 py-3 bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-sm transition-all duration-200"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-[#9A1A1C] hover:bg-[#801416] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
              Don't have an account yet?{' '}
              <Link to="/signup" className="font-semibold text-red-600 hover:text-red-700 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
