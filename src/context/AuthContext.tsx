'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ContributorRole = 
  | 'citizen_scientist' 
  | 'researcher' 
  | 'field_observer' 
  | 'student' 
  | 'administrator';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: ContributorRole;
  roleLabel: string;
  district?: string;
  institution?: string;
  provider: 'email' | 'google';
  joinedAt: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  role: ContributorRole;
  district?: string;
  institution?: string;
}

export type AuthModalMode = 'signin' | 'signup' | 'forgot-password';

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: AuthModalMode;
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const roleDisplayMap: Record<ContributorRole, string> = {
  citizen_scientist: 'Citizen Scientist & Field Observer',
  researcher: 'Academic Researcher & Ecologist',
  field_observer: 'Wetland & Wildlife Ranger',
  student: 'Himalayan Ecology Scholar',
  administrator: 'Platform System Steward',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'kew_auth_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('signin');

  // Load existing session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        }
      } catch (err) {
        console.error('Failed to load user session:', err);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const openAuthModal = (mode: AuthModalMode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Sign In with Email & Password
  const signInWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate network authentication request
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email || !password) {
      setIsLoading(false);
      return { success: false, error: 'Please enter both email and password.' };
    }

    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Generate or derive user profile
    const namePart = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const authenticatedUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: formattedName || 'Kashmir Researcher',
      email: email.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName || email)}&backgroundColor=059669`,
      role: 'researcher',
      roleLabel: roleDisplayMap.researcher,
      district: 'Srinagar',
      institution: 'Kashmir Ecological Research Network',
      provider: 'email',
      joinedAt: new Date().toISOString(),
    };

    setUser(authenticatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authenticatedUser));
    }

    setIsLoading(false);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  // Sign In with Google
  const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // First attempt real NextAuth / Google OAuth flow if endpoint is configured
      if (typeof window !== 'undefined') {
        const checkRes = await fetch('/api/auth/providers').catch(() => null);
        if (checkRes && checkRes.ok) {
          const providers = await checkRes.json();
          if (providers && providers.google) {
            // Trigger actual OAuth redirection through NextAuth route
            window.location.href = '/api/auth/signin/google';
            return { success: true };
          }
        }
      }
    } catch {
      // Fall through to instant simulation if OAuth secrets are pending in .env
    }

    // High-fidelity instant login for local development / testing without blocking UI
    await new Promise((resolve) => setTimeout(resolve, 800));

    const googleUser: AuthUser = {
      id: `goog_${Date.now()}`,
      name: 'Google Contributor',
      email: 'contributor@gmail.com',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
      role: 'citizen_scientist',
      roleLabel: roleDisplayMap.citizen_scientist,
      district: 'Srinagar',
      institution: 'Independent Contributor',
      provider: 'google',
      joinedAt: new Date().toISOString(),
    };

    setUser(googleUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(googleUser));
    }

    setIsLoading(false);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  // Create Account / Sign Up
  const signUpWithEmail = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!data.name.trim() || !data.email.trim() || !data.password) {
      setIsLoading(false);
      return { success: false, error: 'All fields marked with an asterisk are required.' };
    }

    if (data.password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}&backgroundColor=047857`,
      role: data.role || 'citizen_scientist',
      roleLabel: roleDisplayMap[data.role || 'citizen_scientist'],
      district: data.district || 'Srinagar',
      institution: data.institution || 'Civic Observatory',
      provider: 'email',
      joinedAt: new Date().toISOString(),
    };

    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
    }

    setIsLoading(false);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  // Send Password Reset Link
  const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 750));

    if (!email || !email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'Please enter a valid registered email address.' };
    }

    setIsLoading(false);
    return { success: true };
  };

  // Sign Out
  const signOut = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInWithEmail,
        signInWithGoogle,
        signUpWithEmail,
        sendPasswordReset,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const dummyAuthContext: AuthContextType = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isAuthModalOpen: false,
  authModalMode: 'signin',
  openAuthModal: () => {},
  closeAuthModal: () => {},
  signInWithEmail: async () => ({ success: false, error: 'Provider unmounted' }),
  signInWithGoogle: async () => ({ success: false, error: 'Provider unmounted' }),
  signUpWithEmail: async () => ({ success: false, error: 'Provider unmounted' }),
  sendPasswordReset: async () => ({ success: false, error: 'Provider unmounted' }),
  signOut: () => {},
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return dummyAuthContext;
  }
  return context;
}
