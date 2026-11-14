'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  roleTitle: string;
  organization: string;
  orgSlug: string;
  siliconDnaHash: string;
  isAuthenticated: boolean;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_01jk9824',
  name: 'Saumya Gupta',
  email: 's.gupta@aethernexus.io',
  avatarUrl: '/avatars/saumya.png',
  role: 'LEAD_ARCHITECT',
  roleTitle: 'Systems Architect',
  organization: 'AetherNexus Systems',
  orgSlug: 'aethernexus-enterprise',
  siliconDnaHash: '0x9E7F4A12B8C3D5E6',
  isAuthenticated: true,
};

interface AuthContextType {
  user: UserProfile;
  login: (credentials?: Partial<UserProfile>) => void;
  logout: () => void;
  switchOrganization: (orgSlug: string, orgName?: string) => void;
  switchRole: (role: string, roleTitle?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aethernexus_auth');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore in SSR
    }
  }, []);

  const login = (credentials?: Partial<UserProfile>) => {
    const updated = {
      ...DEFAULT_USER,
      ...credentials,
      isAuthenticated: true,
    };
    setUser(updated);
    try {
      localStorage.setItem('aethernexus_auth', JSON.stringify(updated));
    } catch (e) {}
  };

  const logout = () => {
    const updated = {
      ...user,
      isAuthenticated: false,
    };
    setUser(updated);
    try {
      localStorage.setItem('aethernexus_auth', JSON.stringify(updated));
    } catch (e) {}
  };

  const switchOrganization = (orgSlug: string, orgName?: string) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        orgSlug,
        organization: orgName || (orgSlug === 'aethernexus-enterprise' ? 'AetherNexus Systems' : orgSlug.replace('-', ' ').toUpperCase()),
      };
      try {
        localStorage.setItem('aethernexus_auth', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const switchRole = (role: string, roleTitle?: string) => {
    const roleTitles: Record<string, string> = {
      CEO_ADMIN: 'CEO & Founder',
      QA_ARCHITECT: 'QA Test Architect',
      IOT_ENGINEER: 'IoT Hardware Lead',
      SECOPS_LEAD: 'SecOps Officer',
      CLIENT_VIEWER: 'Client Auditor',
      LEAD_ARCHITECT: 'Systems Architect',
    };

    setUser((prev) => {
      const updated = {
        ...prev,
        role,
        roleTitle: roleTitle || roleTitles[role] || role,
      };
      try {
        localStorage.setItem('aethernexus_auth', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchOrganization, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Graceful SSR / Prerender fallback
    return {
      user: DEFAULT_USER,
      login: () => {},
      logout: () => {},
      switchOrganization: () => {},
      switchRole: () => {},
    };
  }
  return context;
};

