'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, Menu, X, User, LogOut, ShieldCheck, Key, Settings, 
  ArrowRight, Sparkles, Building, ExternalLink 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ServicesMegaMenu } from './ServicesMegaMenu';
import { appleAudio } from '@/lib/audio';

export const GlobalHeader: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

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
    <header className="sticky top-0 z-50 apple-glass border-b border-slate-200/80 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <Link 
            href="/" 
            onClick={() => appleAudio.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              Æ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  AetherNexus OS
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                  Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Autonomous Systems Platform</p>
            </div>
          </Link>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
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
                      appleAudio.playClick();
                      setServicesMenuOpen(!servicesMenuOpen);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive || servicesMenuOpen 
                        ? 'text-blue-600 bg-blue-50/80' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  {/* Services Mega-Menu Flyout */}
                  {servicesMenuOpen && (
                    <div className="absolute top-full -left-32 pt-3 w-[880px]">
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
                onClick={() => appleAudio.playClick()}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
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

        {/* Right CTA & User Profile Section */}
        <div className="flex items-center gap-3">
          
          {/* Workspace Launch / Request Demo Button */}
          <Link
            href="/contact"
            onClick={() => appleAudio.playClick()}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 text-xs font-bold transition-all shadow-2xs hover:shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Request Workspace</span>
          </Link>

          {/* User Profile Button */}
          {user.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => {
                  appleAudio.playClick();
                  setProfileMenuOpen(!profileMenuOpen);
                }}
                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-900 to-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/80">
                  {user.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                  <div className="text-[10px] text-blue-600 font-semibold leading-none">{user.roleTitle}</div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
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
                        appleAudio.playClick();
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
                        appleAudio.playClick();
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
                        appleAudio.playClick();
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
                        appleAudio.playClick();
                        setProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100/80 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>Preferences</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80">
                    <button
                      onClick={() => {
                        appleAudio.playClick();
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
              onClick={() => appleAudio.playClick()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              appleAudio.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 mt-3 pt-3 pb-2 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-1 text-xs font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  appleAudio.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2.5 rounded-xl transition-all ${
                  pathname === link.href ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/contact"
              onClick={() => {
                appleAudio.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Request Enterprise Workspace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
