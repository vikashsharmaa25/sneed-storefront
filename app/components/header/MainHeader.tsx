import { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingCart, ChevronDown, LogOut, ShoppingBag } from 'lucide-react';
import { Container } from '../ui/Container';
import { Link } from 'react-router';
import { useCart } from '~/lib/cart-context';
import { useAuth } from '~/lib/auth-context';
import SneedLogo from "../../assets/images/sneed-logo.png";

export function MainHeader() {
  const { totalItems } = useCart();
  const { user, logout, openAuthModal } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayCount = Math.max(0, totalItems || 0);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-sm relative z-50">
      <Container className="flex items-center justify-between h-[77px]">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <img src={SneedLogo} alt="logo" className='w-[174px] h-[60px]' loading="eager" fetchPriority="high" decoding="async" width={174} height={60} />
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 md:max-w-[638px] mx-4">
          <div className="relative w-full overflow-hidden rounded-lg">
            <input
              type="text"
              placeholder="Search Our Products..."
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
            />
            <div className="absolute inset-y-0 right-0 flex items-center section-red px-4">
              <Search className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center justify-end space-x-6 w-[309px]">
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors focus:outline-none cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
                    <User className="h-4.5 w-4.5 text-gray-600" />
                  </div>
                  <span className="text-sm font-semibold max-w-[110px] truncate text-gray-800 hover:text-red-600">
                    {user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 rounded-lg bg-white shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User Profile Info */}
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Logged in as</p>
                      <p className="text-xs font-semibold text-gray-900 truncate mt-0.5" title={user.email || ''}>
                        {user.email}
                      </p>
                    </div>

                    {/* Dropdown Items */}
                    <div className="py-1">
                      <Link
                        to="/orders"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium"
                      >
                        <ShoppingBag className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        My Orders
                      </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-gray-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          void handleLogout();
                        }}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors text-left font-medium cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3 items-center text-sm font-semibold">
                <button onClick={() => openAuthModal('login')} className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer bg-transparent border-none p-0 font-semibold">Log in</button>
                <span className="text-gray-300">|</span>
                <button onClick={() => openAuthModal('signup')} className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer bg-transparent border-none p-0 font-semibold">Sign up</button>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative shrink-0">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-red-600 transition-colors" />
            {displayCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {displayCount > 99 ? '99+' : displayCount}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </div>
  );
}
