'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { TelemetryProvider } from '@/context/TelemetryContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TelemetryProvider>
        {children}
      </TelemetryProvider>
    </AuthProvider>
  );
}

