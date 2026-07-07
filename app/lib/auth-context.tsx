import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';
import { fetchFromApi } from './api/api-client';
import AuthModal from '~/components/auth/AuthModal';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<string>;
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'signup';
  openAuthModal: (type?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      const syncProfile = async () => {
        try {
          if (currentUser.email) {
            const token = await currentUser.getIdToken();
            const response = await fetchFromApi<{
              success: boolean;
              data?: { shopifyCustomerId?: string };
            }>('users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ email: currentUser.email }),
            });

            if (response?.data?.shopifyCustomerId && typeof window !== 'undefined') {
              localStorage.setItem('shopifyCustomerId', response.data.shopifyCustomerId);
            }
          }
        } catch (err) {
          console.error('Failed to sync user profile:', err);
        } finally {
          setLoading(false);
        }
      };

      void syncProfile();
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return token;
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return token;
  };

  const logout = async () => {
    await signOut(auth);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shopifyCustomerId');
    }
  };

  const openAuthModal = (type: 'login' | 'signup' = 'login') => {
    setAuthModalType(type);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        isAuthModalOpen,
        authModalType,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
