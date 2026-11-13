'use client';

import React from 'react';
import { Radio, Lock, ShieldAlert, CheckCircle2, UserX } from 'lucide-react';

interface GhostRadarScopeProps {
  variance: number;
  radarState: string; // CLEAR, MOTION_DETECTED, INTRUSION_ALERT
  isLockdownActive: boolean;
  onSimulateIntrusion: (intruded: boolean) => void;
  onResetLockdown: () => void;
}

export const GhostRadarScope: React.FC<GhostRadarScopeProps> = ({
  variance,
  radarState,
  isLockdownActive,
  onSimulateIntrusion,
  onResetLockdown,
}) => {
  const isAlert = radarState === 'INTRUSION_ALERT';
  const isMotion = radarState === 'MOTION_DETECTED';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Frontier Innovation #2: GhostRadar Wi-Fi Sonar</h3>
            <p className="text-xs text-slate-500">Camera-Free 50Hz Multipath RF Scattering Physics</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSimulateIntrusion(!isAlert)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isAlert
                ? 'bg-rose-600 text-white shadow-rose-200 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isAlert ? 'Simulating Intruder' : 'Wave Hand / Intrude'}
          </button>

          {isLockdownActive && (
            <button
              onClick={onResetLockdown}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
            >
              Clear Lockdown
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* Minimalist Apple Circular Radar */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          {/* Concentric rings */}
          <div className="absolute inset-0 rounded-full border border-slate-200" />
          <div className="absolute inset-4 rounded-full border border-slate-200/80" />
          <div className="absolute inset-10 rounded-full border border-slate-200/60" />
          <div className="absolute inset-16 rounded-full border border-slate-200/40" />

          {/* Crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200/70" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-slate-200/70" />

          {/* Radar Sweep Animation */}
          <div
            className={`absolute inset-0 rounded-full border border-transparent pointer-events-none ${
              isAlert ? 'animate-radar border-t-rose-400/80' : 'animate-radar border-t-blue-400/60'
            }`}
          />

          {/* Dynamic Detection Ripple */}
          {isAlert ? (
            <div className="absolute w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center animate-ping">
              <UserX className="w-5 h-5 text-rose-600" />
            </div>
          ) : isMotion ? (
            <div className="absolute w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
          ) : (
            <div className="absolute w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
          )}
        </div>

        {/* Real-time RF Physics Metrics */}
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Scattering Variance (σ²)</span>
            <span className={`text-base font-bold ${isAlert ? 'text-rose-600' : 'text-slate-800'}`}>
              {variance.toFixed(3)} dBm²
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Doppler Motion State</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isAlert
                  ? 'bg-rose-100 text-rose-700'
                  : isMotion
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {radarState}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Zero-Trust Lockdown</span>
            <span className="flex items-center gap-1 text-xs font-semibold">
              {isLockdownActive ? (
                <span className="text-rose-600 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  API Tokens Quarantined & Deadbolt Engaged
                </span>
              ) : (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Room Secure (GDPR / HIPAA Compliant)
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

