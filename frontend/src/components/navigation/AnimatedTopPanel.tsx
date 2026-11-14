'use client';

import React, { useState } from 'react';
import { 
  Activity, Zap, Shield, RotateCcw, Volume2, VolumeX, 
  Layers, CheckCircle2, AlertTriangle, ArrowRight, Radio 
} from 'lucide-react';
import { appleAudio } from '@/lib/audio';
import { INDUSTRIES_LIST } from '@/components/IndustrySelector';
import { useTelemetry } from '@/context/TelemetryContext';

interface AnimatedTopPanelProps {
  onTriggerMri?: () => void;
  onToggleTimeMachine?: () => void;
  onOpenGhostRadar?: () => void;
}

export const AnimatedTopPanel: React.FC<AnimatedTopPanelProps> = ({
  onTriggerMri,
  onToggleTimeMachine,
  onOpenGhostRadar,
}) => {
  const telemetry = useTelemetry();
  const [isMriScanning, setIsMriScanning] = useState(false);

  const handleMriClick = async () => {
    setIsMriScanning(true);
    if (onTriggerMri) {
      onTriggerMri();
    } else {
      telemetry.openMriModal();
      await telemetry.runMriScan();
    }
    setTimeout(() => setIsMriScanning(false), 2500);
  };

  const handleGhostRadarClick = () => {
    if (onOpenGhostRadar) {
      onOpenGhostRadar();
    } else {
      telemetry.openGhostRadar();
    }
  };

  const handleTimeMachineClick = () => {
    if (onToggleTimeMachine) {
      onToggleTimeMachine();
    } else {
      telemetry.toggleTimeMachine();
    }
  };

  const isIntruded = telemetry.radarState === 'HUMAN_INTRUSION_DETECTED' || telemetry.isLockdownActive;

  return (
    <div className="flex items-center gap-1.5 py-1 px-1.5 rounded-2xl apple-glassdoor border border-white/70 shadow-xs">
      {/* 1. 50Hz Telemetry Bus Indicator */}
      <div 
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs font-semibold shadow-xs select-none hover:bg-white transition-colors cursor-pointer"
        title="50Hz High-Speed Sensor Telemetry Stream (20ms frames)"
      >
        <span 
          className={`w-2 h-2 rounded-full ${
            telemetry.wsConnected 
              ? telemetry.isWireSevered 
                ? 'bg-amber-500 animate-ping' 
                : 'bg-emerald-500 animate-pulse' 
              : 'bg-rose-500'
          }`} 
        />
        <Activity className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-700 hidden lg:inline">50Hz Telemetry</span>
        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
          telemetry.wsConnected 
            ? telemetry.isWireSevered
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-rose-50 text-rose-700 border-rose-200'
        }`}>
          {telemetry.wsConnected 
            ? telemetry.isWireSevered 
              ? `${telemetry.failoverLatencyMs}ms ML` 
              : '12.8ms'
            : 'OFFLINE'}
        </span>
      </div>

      {/* 2. Quick Universal MRI Scan Trigger */}
      <button
        onClick={handleMriClick}
        disabled={isMriScanning}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-80"
        title="Trigger 10-Probe Universal Cyber-Physical Diagnostic MRI"
      >
        <Zap className={`w-3.5 h-3.5 ${isMriScanning ? 'animate-spin' : ''}`} />
        <span>{isMriScanning ? 'Scanning...' : 'Run MRI'}</span>
      </button>

      {/* 3. GhostRadar Perimeter State */}
      <button
        onClick={handleGhostRadarClick}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer ${
          isIntruded 
            ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
            : 'bg-white/80 hover:bg-white border-slate-200/80 text-slate-700'
        }`}
        title="Camera-Free Wi-Fi RF Doppler Sonar Scope"
      >
        <Shield className={`w-3.5 h-3.5 ${isIntruded ? 'text-rose-600' : 'text-indigo-500'}`} />
        <span className="hidden xl:inline">Radar:</span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
          isIntruded
            ? 'bg-rose-100 text-rose-800 border-rose-300'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          {isIntruded ? 'ALERT' : 'SECURED'}
        </span>
      </button>

      {/* 4. Cyber Time-Machine Toggle */}
      <button
        onClick={handleTimeMachineClick}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer ${
          telemetry.isTimeMachineOpen 
            ? 'bg-amber-50 text-amber-800 border-amber-200 shadow-inner' 
            : 'bg-white/80 hover:bg-white border-slate-200/80 text-slate-700'
        }`}
        title="Open 60-Second Replay Scrubber (Counterfactual Simulation)"
      >
        <RotateCcw className={`w-3.5 h-3.5 ${telemetry.isTimeMachineOpen ? 'text-amber-600 animate-spin' : 'text-amber-500'}`} />
        <span className="hidden lg:inline">Time Machine</span>
      </button>

      {/* 5. Sound FX Chime Toggle */}
      <button
        onClick={telemetry.toggleSound}
        className="p-1.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200/80 text-slate-600 shadow-xs active:scale-95 transition-all cursor-pointer"
        title={telemetry.soundEnabled ? 'Mute Synthetic Audio Feedback' : 'Enable Audio Feedback'}
      >
        {telemetry.soundEnabled ? (
          <Volume2 className="w-3.5 h-3.5 text-blue-500" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {/* 6. Dynamic Industry Blueprint Selector */}
      <div className="relative inline-flex items-center">
        <select
          value={telemetry.currentIndustry}
          onChange={(e) => telemetry.setIndustry(e.target.value)}
          className="appearance-none bg-white/90 border border-slate-200/90 text-xs font-semibold text-slate-800 rounded-xl py-1.5 pl-3 pr-7 outline-none shadow-xs cursor-pointer hover:border-slate-300 transition-colors"
        >
          {INDUSTRIES_LIST.map((ind) => (
            <option key={ind.id} value={ind.id}>
              {ind.name}
            </option>
          ))}
        </select>
        <Layers className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
      </div>
    </div>
  );
};

