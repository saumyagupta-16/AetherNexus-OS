'use client';

import React from 'react';
import { Unplug, Plug, Zap, Activity, ShieldAlert, Cpu } from 'lucide-react';

interface MorphOSChaosPanelProps {
  isWireSevered: boolean;
  onToggleWire: (severed: boolean) => void;
  failoverLatencyMs: number;
  currentDrawMa: number;
  busVoltageV: number;
  phantomConfidence: number;
}

export const MorphOSChaosPanel: React.FC<MorphOSChaosPanelProps> = ({
  isWireSevered,
  onToggleWire,
  failoverLatencyMs,
  currentDrawMa,
  busVoltageV,
  phantomConfidence,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Frontier Innovation #1: MorphOS Zero-Code Hardware</h3>
            <p className="text-xs text-slate-500">Live Wire-Pull Demo & Phantom Sensor ML Ensemble</p>
          </div>
        </div>

        <button
          onClick={() => onToggleWire(!isWireSevered)}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
            isWireSevered
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200'
              : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
          }`}
        >
          {isWireSevered ? (
            <>
              <Plug className="w-3.5 h-3.5" />
              Restore Physical Wire (GPIO 4)
            </>
          ) : (
            <>
              <Unplug className="w-3.5 h-3.5" />
              Pull Sensor Wire Live (GPIO 4)
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
          <div className="text-xs text-slate-400 font-medium">Physical Jumper Pin</div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            {isWireSevered ? (
              <span className="text-rose-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                SEVERED (0.00V)
              </span>
            ) : (
              <span className="text-emerald-600 font-semibold">CONNECTED (3.3V)</span>
            )}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
          <div className="text-xs text-slate-400 font-medium">Failover Latency</div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            {isWireSevered ? `${failoverLatencyMs.toFixed(1)} ms (< 15ms target)` : '0.0 ms (Nominal)'}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
          <div className="text-xs text-slate-400 font-medium">Correlated INA219 Current</div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">{currentDrawMa.toFixed(1)} mA</div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
          <div className="text-xs text-slate-400 font-medium">ML Prediction Model</div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            {isWireSevered ? `Ridge+RF (${(phantomConfidence * 100).toFixed(1)}%)` : 'Standby Ensemble'}
          </div>
        </div>
      </div>
    </div>
  );
};

