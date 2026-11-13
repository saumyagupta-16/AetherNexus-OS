'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
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
        appleAudio.playFailover(); // Harmonic Cupertino success chime

        if (typeof window !== 'undefined') {
          localStorage.setItem('aether_access_token', data.access_token);
          localStorage.setItem('aether_user', JSON.stringify(data.user));
          document.cookie = `aether_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
        }

        setTimeout(() => {
          router.push('/');
        }, 800);
      } else {
        const err = await res.json();
        setErrorMessage(err.detail || 'Incorrect username or password');
        setShake(true);
        appleAudio.playAlert();
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      setErrorMessage('Unable to connect to server');
      setShake(true);
      appleAudio.playAlert();
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#FAFAFC] via-[#F1F5F9] to-[#E9EFF6] overflow-hidden select-none">
      {/* Animated Subtle Ambient Cupertino Glow Orbs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div
        className="absolute bottom-1/4 -right-24 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none animate-float-slow"
        style={{ animationDelay: '5s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/40 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Apple Glassdoor Card */}
      <div
        className={`relative z-10 w-full max-w-[380px] apple-glassdoor rounded-3xl p-8 sm:p-9 transition-all duration-300 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Logo & Website Name */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
            <span className="text-xl font-black tracking-tight">Æ</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">AetherNexus OS</h1>
        </div>

        {/* Error Alert (Only if invalid) */}
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {/* Clean Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-3 text-xs font-medium text-slate-900 rounded-2xl apple-input outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-3 text-xs font-medium text-slate-900 rounded-2xl apple-input outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => {
                appleAudio.playClick();
                setShowPassword(!showPassword);
              }}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Animated Stylish Login Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full mt-2 py-3 px-4 rounded-2xl font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              isSuccess
                ? 'bg-emerald-600 text-white scale-[1.02]'
                : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]'
            } disabled:opacity-60`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Welcome
              </span>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
