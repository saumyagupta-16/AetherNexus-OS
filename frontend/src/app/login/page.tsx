'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, ArrowRight, Check, Loader2 } from 'lucide-react';
import { appleAudio } from '@/lib/audio';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('987456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    appleAudio.playClick();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsSuccess(true);
        appleAudio.playFailover();

        if (typeof window !== 'undefined') {
          localStorage.setItem('aether_access_token', data.access_token);
          localStorage.setItem('aether_user', JSON.stringify(data.user));
          document.cookie = `aether_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
        }

        setTimeout(() => {
          router.push('/');
        }, 600);
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMessage(err.detail || 'Incorrect username or password');
        setShake(true);
        appleAudio.playAlert();
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setErrorMessage('Unable to connect to authorization service');
      setShake(true);
      appleAudio.playAlert();
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#FAFAFC] via-[#F1F5F9] to-[#E9EFF6] overflow-hidden select-none">
      {/* Dynamic Ambient Frosted Glass Caustics */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200/40 rounded-full blur-[110px] pointer-events-none animate-float-slow" />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-200/35 rounded-full blur-[110px] pointer-events-none animate-float-slow"
        style={{ animationDelay: '4s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-white/50 rounded-full blur-[120px] pointer-events-none" />

      {/* Apple Glassdoor Login Card */}
      <div
        className={`relative z-10 w-full max-w-[370px] rounded-[32px] bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.08),0_0_0_1px_rgba(255,255,255,0.8)_inset] p-8 sm:p-9 transition-all duration-300 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Top Chamfer Specular Rim */}
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        {/* Website Logo & Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-16 h-16 rounded-[22px] bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl shadow-slate-900/15 flex items-center justify-center border border-slate-700/40 mb-4 overflow-hidden group">
            <span className="text-2xl font-black tracking-tight select-none">Æ</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">AetherNexus OS</h1>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 py-2 px-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-medium text-center animate-in fade-in duration-200">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Panel */}
          <div className="relative flex items-center rounded-2xl bg-slate-50/80 border border-slate-200/80 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full bg-transparent py-3.5 pl-3 pr-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>

          {/* Password Panel with Eye Button */}
          <div className="relative flex items-center rounded-2xl bg-slate-50/80 border border-slate-200/80 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-transparent py-3.5 pl-3 pr-10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
            />
            <button
              type="button"
              onClick={() => {
                appleAudio.playClick();
                setShowPassword(!showPassword);
              }}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer active:scale-90"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Animated Styled Login Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`relative group w-full mt-2 py-3.5 px-5 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer shadow-sm ${
              isSuccess
                ? 'bg-emerald-600 text-white scale-[1.02] shadow-emerald-600/20'
                : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/15 active:scale-[0.98]'
            } disabled:opacity-70`}
          >
            {/* Animated Shimmer Light Sweep on Hover */}
            {!isLoading && !isSuccess && (
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
            )}

            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-white/80" />
                <span>Signing in...</span>
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Welcome</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
