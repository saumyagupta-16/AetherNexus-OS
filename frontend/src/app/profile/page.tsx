'use client';

import React, { useState } from 'react';
import { 
  User, ShieldCheck, Key, Settings, Building, LogOut, 
  CheckCircle2, Copy, RefreshCw, Sparkles, Terminal 
} from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { useAuth } from '@/context/AuthContext';
import { ROLES } from '@/components/RoleSwitcher';
import { appleAudio } from '@/lib/audio';

export default function ProfilePage() {
  const { user, switchRole, switchOrganization, logout } = useAuth();
  const [copiedKey, setCopiedKey] = useState(false);
  const [apiKey, setApiKey] = useState('aeth_live_8f3d2a91b4c7e602f9');

  const handleCopyKey = () => {
    appleAudio.playClick();
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    appleAudio.playClick();
    const newKey = 'aeth_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    appleAudio.playRestore();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900">
      <GlobalHeader />

      {/* Profile Header */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-6">
        <div className="p-8 rounded-3xl apple-glassdoor border border-white/90 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-900 to-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md ring-4 ring-emerald-500/80">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{user.name}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500">{user.email}</p>
              <div className="mt-1 text-xs text-blue-600 font-semibold">
                {user.roleTitle} • {user.organization}
              </div>
            </div>
          </div>

          <button
            onClick={() => { appleAudio.playClick(); logout(); }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Settings Grid */}
      <section className="max-w-5xl mx-auto px-6 space-y-6">
        {/* Role & Organization Switcher */}
        <div className="p-6 rounded-3xl apple-glass border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Building className="w-4 h-4 text-blue-500" />
            <span>Role-Based Access Control (RBAC) & Organization</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Active Workspace Role</label>
              <select
                value={user.role}
                onChange={(e) => {
                  appleAudio.playClick();
                  switchRole(e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.focus})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Enterprise Tenant Organization</label>
              <select
                value={user.orgSlug}
                onChange={(e) => {
                  appleAudio.playClick();
                  switchOrganization(e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-2xs cursor-pointer"
              >
                <option value="qualimatrix-enterprise">Qualimatrix Technologies (Default)</option>
                <option value="siemens-energy">Siemens Energy IIoT Lab</option>
                <option value="microsoft-cloud-qa">Microsoft Cloud QA Staging</option>
                <option value="reliance-jio-telecom">Reliance Jio 5G Operations</option>
              </select>
            </div>
          </div>
        </div>

        {/* SiliconDNA Cryptographic Vault */}
        <div id="silicondna" className="p-6 rounded-3xl apple-glass border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>SiliconDNA™ Physical Hardware Biometric Vault</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              PUF Bound
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Your session credentials are cryptographically bonded to the microcontroller transistor gate jitter 
            entropy hash collected during initial zero-trust device bootstrapping.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 text-cyan-400 font-mono text-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">HARDWARE PUF ENTROPY SIGNATURE:</div>
              <div className="font-bold text-sm tracking-widest mt-1">
                {user.siliconDnaHash}4F9B2C1088E7D63A125890FF02
              </div>
            </div>
            <span className="text-[10px] font-bold bg-cyan-950 text-cyan-300 px-2 py-1 rounded border border-cyan-800">
              VERIFIED
            </span>
          </div>
        </div>

        {/* API Credentials */}
        <div id="keys" className="p-6 rounded-3xl apple-glass border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Key className="w-4 h-4 text-amber-500" />
              <span>Enterprise API Bearer Tokens & Webhooks</span>
            </div>
            <button
              onClick={handleRegenerateKey}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rotate Token</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={apiKey}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 font-mono text-xs text-slate-800 border border-slate-200 select-all"
            />
            <button
              onClick={handleCopyKey}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

