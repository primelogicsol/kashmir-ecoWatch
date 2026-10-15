'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, Mail, Lock, User, Eye, EyeOff, AlertCircle, 
  Sparkles, Check, ArrowRight, Building2, MapPin, ChevronRight, Home
} from 'lucide-react';
import { useAuth, ContributorRole } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';

function AuthPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { 
    user, 
    isLoggedIn, 
    signInWithEmail, 
    signInWithGoogle, 
    signUpWithEmail, 
    sendPasswordReset, 
    signOut 
  } = useAuth();

  const initialMode = (searchParams.get('mode') as 'signin' | 'signup' | 'forgot-password') || 'signin';
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot-password'>(initialMode);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<ContributorRole>('citizen_scientist');
  const [district, setDistrict] = useState('Srinagar');
  const [institution, setInstitution] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    const m = searchParams.get('mode');
    if (m === 'signup' || m === 'forgot-password' || m === 'signin') {
      setMode(m);
    }
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    const res = await signInWithEmail(email, password);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid credentials.');
    } else {
      router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setIsSubmitting(true);
    const res = await signInWithGoogle();
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Google authentication encountered an issue.');
    } else {
      router.push('/');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!termsAgreed) {
      setErrorMsg('Please accept the Data Integrity & Open Science terms to proceed.');
      return;
    }
    setIsSubmitting(true);
    const res = await signUpWithEmail({
      name,
      email,
      password,
      role,
      district,
      institution,
    });
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Could not complete registration.');
    } else {
      router.push('/');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    const res = await sendPasswordReset(email);
    setIsSubmitting(false);
    if (res.success) {
      setResetSuccess(true);
    } else {
      setErrorMsg(res.error || 'Failed to dispatch reset link.');
    }
  };

  const handleQuickDemo = async () => {
    setEmail('researcher@kashmir-ecowatch.org');
    setPassword('kashmir2026');
    setErrorMsg('');
    setIsSubmitting(true);
    await signInWithEmail('researcher@kashmir-ecowatch.org', 'kashmir2026');
    setIsSubmitting(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] bg-forest-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[180px]" />
      </div>

      <main className="flex-1 relative z-10 pt-28 pb-20 container mx-auto px-4 sm:px-6 max-w-xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-medium">Contributor Authentication</span>
        </nav>

        {/* Card Container */}
        <div className="bg-slate-900/90 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-600/25 via-slate-900 to-slate-950 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Observatory Access
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              {mode === 'signin' && 'Sign In to Kashmir EcoWatch'}
              {mode === 'signup' && 'Create Contributor Account'}
              {mode === 'forgot-password' && 'Password Recovery'}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              {mode === 'signin' && 'Access verified telemetry layers, submit field sightings, and track regional water indicators.'}
              {mode === 'signup' && 'Join researchers, rangers, and citizen scientists across Jammu, Kashmir & Ladakh.'}
              {mode === 'forgot-password' && 'Enter your registered email address to receive password reset telemetry instructions.'}
            </p>

            {/* Mode Switch Tabs */}
            {mode !== 'forgot-password' && (
              <div className="flex items-center gap-2 mt-6 p-1 bg-slate-950/70 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setMode('signin');
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    mode === 'signin'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setMode('signup');
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    mode === 'signup'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8">
            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isLoggedIn ? (
              /* Already Logged In State */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Signed in as {user?.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{user?.email} &bull; {user?.roleLabel}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                  <Button onClick={() => router.push('/')} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                    Return to Home
                  </Button>
                  <Button variant="outline" onClick={signOut} className="border-white/20 text-slate-300 text-xs">
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : mode === 'signin' ? (
              /* ================= SIGN IN ================= */
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-md transition-all group disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-white/10 w-full" />
                  <span className="bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    or sign in with email
                  </span>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contributor@kashmir-ecowatch.org"
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMsg('');
                          setResetSuccess(false);
                          setMode('forgot-password');
                        }}
                        className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2.5 text-sm shadow-xl"
                  >
                    {isSubmitting ? 'Signing In...' : 'Sign In to Kashmir EcoWatch'}
                  </Button>
                </form>

                <div className="pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleQuickDemo}
                    className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quick Demo: Sign In as Verified Researcher</span>
                  </button>
                </div>
              </div>
            ) : mode === 'signup' ? (
              /* ================= CREATE ACCOUNT ================= */
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-md transition-all group disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Sign up with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-white/10 w-full" />
                  <span className="bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    or register with email
                  </span>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. Tariq Bhat"
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@university.edu"
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Password <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Contributor Role
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as ContributorRole)}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500/50 cursor-pointer"
                      >
                        <option value="citizen_scientist">Citizen Scientist</option>
                        <option value="researcher">Academic Researcher</option>
                        <option value="field_observer">Wildlife Ranger</option>
                        <option value="student">Student / Scholar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        District
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500/50 cursor-pointer"
                      >
                        {['Srinagar', 'Ganderbal', 'Baramulla', 'Anantnag', 'Budgam', 'Pulwama', 'Kupwara', 'Bandipora', 'Kulgam', 'Shopian'].map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer pt-1 text-xs text-slate-400">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="mt-0.5 rounded border-white/20 bg-slate-950 text-emerald-500"
                    />
                    <span>
                      I agree to the <span className="text-emerald-400">Data Integrity Protocol</span> and open science standards.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2.5 text-sm shadow-xl"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Contributor Account'}
                  </Button>
                </form>
              </div>
            ) : (
              /* ================= FORGOT PASSWORD ================= */
              <div className="space-y-5">
                {resetSuccess ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">Reset Link Dispatched</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      We have sent password reset instructions to <strong className="text-white">{email}</strong>. Please check your inbox and spam folder.
                    </p>
                    <Button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="w-full bg-white/10 hover:bg-white/20 text-white text-xs py-2 mt-2"
                    >
                      Return to Sign In
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Registered Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@domain.org"
                          className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2.5 text-sm shadow-xl"
                    >
                      {isSubmitting ? 'Sending Link...' : 'Send Password Reset Link'}
                    </Button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setMode('signin')}
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        Remembered your password? <span className="text-emerald-400 font-semibold">Sign In</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <AdvancedFooter />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
}
