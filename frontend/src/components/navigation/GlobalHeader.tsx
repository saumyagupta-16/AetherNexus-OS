'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, Menu, X, User, LogOut, ShieldCheck, Key, Settings, 
  Layers, ArrowRight, ExternalLink, Sparkles 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTelemetry } from '@/context/TelemetryContext';
import { AnimatedTopPanel } from './AnimatedTopPanel';
import { ServicesMegaMenu } from './ServicesMegaMenu';
import { appleAudio } from '@/lib/audio';

interface GlobalHeaderProps {
  onTriggerMri?: () => void;
  onToggleTimeMachine?: () => void;
  onOpenGhostRadar?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  onTriggerMri,
  onToggleTimeMachine,
  onOpenGhostRadar,
}) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const telemetry = useTelemetry();

  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Products', href: '/products' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 apple-glass border-b border-slate-200/80 px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <Link 
            href="/" 
            onClick={() => telemetry.soundEnabled && appleAudio.playClick()}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
              Æ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  AetherNexus OS
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  v1.0.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Qualimatrix Technologies</p>
            </div>
          </Link>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            if (link.hasDropdown) {
              return (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesMenuOpen(true)}
                  onMouseLeave={() => setServicesMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      if (telemetry.soundEnabled) appleAudio.playClick();
                      setServicesMenuOpen(!servicesMenuOpen);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive || servicesMenuOpen 
                        ? 'text-blue-600 bg-blue-50/80' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {servicesMenuOpen && (
                    <div className="absolute top-full -left-28 pt-2 w-[860px]">
                      <ServicesMegaMenu onClose={() => setServicesMenuOpen(false)} />
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => telemetry.soundEnabled && appleAudio.playClick()}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50/80 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Animated Top Panel Controls Ribbon */}
        <div className="hidden md:flex items-center">
          <AnimatedTopPanel 
            onTriggerMri={onTriggerMri} 
            onToggleTimeMachine={onToggleTimeMachine} 
            onOpenGhostRadar={onOpenGhostRadar} 
          />
        </div>

        {/* Top-Right Profile / Auth Section */}
        <div className="flex items-center gap-2">
          {user.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => {
                  if (telemetry.soundEnabled) appleAudio.playClick();
                  setProfileMenuOpen(!profileMenuOpen);
                }}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-900 to-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/80">
                  {user.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                  <div className="text-[10px] text-blue-600 font-medium leading-none">{user.roleTitle}</div>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 apple-glassdoor rounded-2xl border border-white/90 p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setProfileMenuOpen(false)}
                >
                  <div className="pb-3 border-b border-slate-200/80">
                    <div className="text-xs font-bold text-slate-900">{user.name}</div>
                    <div className="text-[11px] text-slate-500">{user.email}</div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-md">
                      <span className="font-semibold text-slate-800">Org:</span> {user.organization}
                    </div>
                  </div>

                  <div className="py-2 space-y-1 text-xs font-medium text-slate-700">
                    <Link
                      href="/profile"
                      onClick={() => {
                        if (telemetry.soundEnabled) appleAudio.playClick();
                        setProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100/80 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Account Profile & Roles</span>
                    </Link>
                    <Link
                      href="/profile#silicondna"
                      onClick={() => {
                        if (telemetry.soundEnabled) appleAudio.playClick();
                        setProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100/80 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-500" />
                      <span>SiliconDNA™ Vault</span>
                    </Link>
                    <Link
                      href="/profile#keys"
                      onClick={() => {
                        if (telemetry.soundEnabled) appleAudio.playClick();
                        setProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100/80 transition-colors"
                    >
                      <Key className="w-4 h-4 text-amber-500" />
                      <span>API Keys & Webhooks</span>
                    </Link>
                    <Link
                      href="/profile#settings"
                      onClick={() => {
                        if (telemetry.soundEnabled) appleAudio.playClick();
                        setProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100/80 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>Preferences & Telemetry</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80">
                    <button
                      onClick={() => {
                        if (telemetry.soundEnabled) appleAudio.playClick();
                        logout();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50/80 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </span>
                      <span className="text-[10px] text-slate-400">Exit</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => telemetry.soundEnabled && appleAudio.playClick()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => {
              if (telemetry.soundEnabled) appleAudio.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 xl:hidden active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200/80 mt-3 pt-3 pb-2 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="flex md:hidden pb-2 overflow-x-auto">
            <AnimatedTopPanel 
              onTriggerMri={onTriggerMri} 
              onToggleTimeMachine={onToggleTimeMachine} 
              onOpenGhostRadar={onOpenGhostRadar} 
            />
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  if (telemetry.soundEnabled) appleAudio.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl transition-all ${
                  pathname === link.href ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

