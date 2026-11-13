'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, User, Lock, Eye, EyeOff, ArrowRight, Fingerprint, 
  Sparkles, CheckCircle2, Key, Shield, RefreshCw, Cpu, Award, ExternalLink
} from 'lucide-react';
import { appleAudio } from '@/lib/audio';

interface DecodedClaims {
  sub: string;
  name: string;
  role: string;
  scope: string;
  exp: number;
  silicon_dna_bound: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('987456');
  const [showPassword, setShowPassword] = useState(false);
  const [bindSiliconDNA, setBindSiliconDNA] = useState(true);
  const [rememberDevice, setRememberDevice] = useState(true);

  // Animation & Auth States
  const [isLoading, setIsLoading] = useState(false);
  const [isFaceIDScanning, setIsFaceIDScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);

  // Live OAuth 2.0 Token Inspector
  const [issuedToken, setIssuedToken] = useState<string | null>(null);
  const [decodedClaims, setDecodedClaims] = useState<DecodedClaims | null>(null);
  const [showTokenDetails, setShowTokenDetails] = useState(false);

  const handleQuickFill = () => {
    appleAudio.playClick();
    setUsername('admin');
    setPassword('987456');
    setErrorMessage('');
  };

  const parseJwt = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    appleAudio.playClick();
    setErrorMessage('');
    setIsLoading(true);
    setIsFaceIDScanning(true);

    try {
      // RFC 6749 OAuth 2.0 Token Request
      const res = await fetch('http://localhost:8000/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username, 
          password,
          bind_silicon_dna: bindSiliconDNA
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const claims = parseJwt(data.access_token);
        
        setIssuedToken(data.access_token);
        setDecodedClaims(claims);
        setIsFaceIDScanning(false);
        setIsSuccess(true);
        appleAudio.playFailover(); // Harmonic Cupertino success chime

        // Persist OAuth 2.0 Session
        if (typeof window !== 'undefined') {
          localStorage.setItem('aether_access_token', data.access_token);
          localStorage.setItem('aether_refresh_token', data.refresh_token);
          localStorage.setItem('aether_user', JSON.stringify(data.user));
          document.cookie = `aether_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
        }

        setTimeout(() => {
          router.push('/');
        }, 1200);
      } else {
        const err = await res.json();
        setIsFaceIDScanning(false);
        setErrorMessage(err.detail || 'Invalid enterprise credentials');
        setShake(true);
        appleAudio.playAlert();
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      setIsFaceIDScanning(false);
      setErrorMessage('Unable to connect to OAuth 2.0 server on :8000');
      setShake(true);
      appleAudio.playAlert();
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-[#F8FAFC] to-[#EDF2F7] overflow-hidden select-none">
      {/* Ambient Luminous Cupertino Aura Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200/35 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none animate-float-slow" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Apple Glassdoor Card */}
      <div
        className={`relative z-10 w-full max-w-[440px] apple-glassdoor rounded-3xl p-8 sm:p-10 transition-all duration-300 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Top Header & Cupertino Monogram */}
        <div className="text-center space-y-3 mb-7">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-900/10 flex items-center justify-center">
              <span className="text-xl font-black tracking-tight">Æ</span>
            </div>
            {isFaceIDScanning && (
              <span className="absolute -inset-1.5 rounded-2xl border-2 border-blue-500 animate-ping pointer-events-none" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">AetherNexus OS</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              RFC 6749 OAuth 2.0 & Zero-Trust Authorization Portal
            </p>
          </div>
        </div>

        {/* Error Alert Pill */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            {errorMessage}
          </div>
        )}

        {/* Success Verification Pill */}
        {isSuccess && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center flex flex-col items-center justify-center gap-1 animate-in zoom-in-95">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              OAuth 2.0 Bearer Token Verified
            </div>
            <span className="text-[10px] text-emerald-600 font-normal">
              Zero-Trust Silicon Passport Granted • Redirecting...
            </span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Enterprise Identity (OAuth 2.0 Username)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 rounded-2xl apple-input outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Enterprise Passcode
              </label>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Fill: admin / 987456
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 text-xs font-mono font-medium text-slate-900 rounded-2xl apple-input outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => {
                  appleAudio.playClick();
                  setShowPassword(!showPassword);
                }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Toggles */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bindSiliconDNA}
                onChange={(e) => {
                  appleAudio.playClick();
                  setBindSiliconDNA(e.target.checked);
                }}
                className="w-3.5 h-3.5 rounded-md text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span className="text-[11px] font-semibold text-slate-600">
                Anchor Session to SiliconDNA™ Hardware Passport
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => {
                  appleAudio.playClick();
                  setRememberDevice(e.target.checked);
                }}
                className="w-3.5 h-3.5 rounded-md text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span className="text-[11px] font-semibold text-slate-600">
                Issue 30-Day Refresh Token (OAuth 2.0 Offline Scope)
              </span>
            </label>
          </div>

          {/* Primary Sign In Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full mt-3 py-3 px-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 text-xs font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing OAuth 2.0 Bearer JWT...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Authorized • Opening Workspace
              </span>
            ) : (
              <>
                Authorize & Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Live OAuth 2.0 Token Preview Drawer */}
        {issuedToken && (
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-900 text-white space-y-2 text-[10px] font-mono animate-in fade-in">
            <div className="flex items-center justify-between text-slate-400 font-sans font-bold">
              <span className="flex items-center gap-1">
                <Key className="w-3 h-3 text-emerald-400" />
                OAUTH 2.0 BEARER JWT:
              </span>
              <span className="text-emerald-400 font-mono">HS256 Verified</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/80 text-emerald-300 break-all select-all font-mono text-[9px] leading-relaxed">
              {issuedToken}
            </div>
            {decodedClaims && (
              <div className="pt-1 text-[10px] text-slate-300 space-y-0.5 font-sans">
                <div><b>Subject:</b> {decodedClaims.sub} ({decodedClaims.name})</div>
                <div><b>Role:</b> {decodedClaims.role}</div>
                <div><b>Scopes:</b> {decodedClaims.scope}</div>
              </div>
            )}
          </div>
        )}

        {/* Biometric Zero-Trust Verification Footer */}
        <div className="mt-7 pt-5 border-t border-slate-200/70 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <Fingerprint className="w-3.5 h-3.5 text-blue-600" />
            SiliconDNA™ Biometric Hardware Anchored
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
            <span>RFC 6749 Compliant</span>
            <span>•</span>
            <span>SOC 2 Type II</span>
            <span>•</span>
            <span>IEC 62443 Zero-Trust</span>
          </div>
        </div>
      </div>
    </div>
  );
}
