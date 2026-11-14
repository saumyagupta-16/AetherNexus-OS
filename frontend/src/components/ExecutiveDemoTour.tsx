'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Play, CheckCircle2, RotateCcw, X, Cpu, Radio, Activity, History, GitPullRequest } from 'lucide-react';
import { appleAudio } from '@/lib/audio';

interface ExecutiveDemoTourProps {
  onToggleWire: (severed: boolean) => Promise<void>;
  onTriggerRadar: (intruded: boolean) => Promise<void>;
  onRunMRI: () => Promise<any>;
  onScrubTime: (seconds: number) => void;
  onSimulateProxy: () => Promise<any>;
  onResetAll: () => Promise<void>;
}

interface TourStep {
  id: number;
  title: string;
  subtitle: string;
  durationSeconds: number;
  icon: string;
  badge: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 1,
    title: 'Baseline 50Hz Real-Time Telemetry',
    subtitle: 'Observing continuous 50Hz (20ms) telemetry streaming from physical ESP32 sensor bus.',
    durationSeconds: 4,
    icon: 'Activity',
    badge: 'Step 1 of 5'
  },
  {
    id: 2,
    title: 'MorphOS Phantom Sensor ML Failover',
    subtitle: 'Pulling GPIO 4 jumper wire live. Scikit-Learn regression synthesizes missing data in <15ms with 96.4% confidence.',
    durationSeconds: 6,
    icon: 'Cpu',
    badge: 'Frontier Innovation #1'
  },
  {
    id: 3,
    title: 'GhostRadar Camera-Free Wi-Fi RF Sonar',
    subtitle: 'Simulating room intrusion through walls. High-frequency 50Hz RF scattering variance triggers Zero-Trust lockdown.',
    durationSeconds: 6,
    icon: 'Radio',
    badge: 'Frontier Innovation #2'
  },
  {
    id: 4,
    title: 'Universal Diagnostic MRI & Cryptographic Audit',
    subtitle: 'Executing 10 automated cyber-physical health probes and stamping cryptographically signed PDF certificate.',
    durationSeconds: 6,
    icon: 'Activity',
    badge: 'Universal Diagnostic MRI'
  },
  {
    id: 5,
    title: 'Cyber-Physical Time-Machine Reality Rewind',
    subtitle: 'Scrubbing 60-second in-memory ring buffer back 15 seconds to inspect exact failure timestamp and simulate fix.',
    durationSeconds: 6,
    icon: 'History',
    badge: 'Frontier Innovation #4'
  }
];

export const ExecutiveDemoTour: React.FC<ExecutiveDemoTourProps> = ({
  onToggleWire,
  onTriggerRadar,
  onRunMRI,
  onScrubTime,
  onSimulateProxy,
  onResetAll,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = async () => {
    setIsRunning(true);
    setCurrentStepIndex(0);

    // Step 1: Nominal baseline
    await onResetAll();
    await new Promise((r) => setTimeout(r, 3500));

    // Step 2: Wire pull failover
    setCurrentStepIndex(1);
    await onToggleWire(true);
    appleAudio.playFailover();
    await new Promise((r) => setTimeout(r, 6000));

    // Step 3: GhostRadar RF Intrusion
    setCurrentStepIndex(2);
    await onToggleWire(false);
    await onTriggerRadar(true);
    appleAudio.playAlert();
    await new Promise((r) => setTimeout(r, 6000));

    // Step 4: Universal Diagnostic MRI
    setCurrentStepIndex(3);
    await onTriggerRadar(false);
    await onRunMRI();
    appleAudio.playFailover();
    await new Promise((r) => setTimeout(r, 6000));

    // Step 5: Time-Machine Scrubber
    setCurrentStepIndex(4);
    onScrubTime(15);
    await new Promise((r) => setTimeout(r, 6000));

    // Complete & Normalize
    onScrubTime(0);
    await onResetAll();
    setIsRunning(false);
    appleAudio.playFailover();
  };

  const stopTour = async () => {
    setIsRunning(false);
    onScrubTime(0);
    await onResetAll();
  };

  const step = TOUR_STEPS[currentStepIndex];

  return (
    <>
      {/* Launch Tour Pill Button */}
      <button
        onClick={isRunning ? stopTour : startTour}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs ${
          isRunning
            ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95'
        }`}
      >
        <Sparkles className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
        <span>{isRunning ? 'Stop Guided Demo' : 'Run 30s Executive Demo Tour'}</span>
      </button>

      {/* Floating Guided Tour Banner */}
      {isRunning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-xl">
          <div className="apple-glass-elevated rounded-3xl p-4 border border-blue-200/80 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {step.badge}
              </span>
              <button
                onClick={stopTour}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.subtitle}</p>
            </div>

            {/* Progress indicators */}
            <div className="flex items-center gap-1.5 pt-1">
              {TOUR_STEPS.map((s, idx) => (
                <div
                  key={s.id}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    idx === currentStepIndex
                      ? 'bg-blue-600'
                      : idx < currentStepIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

