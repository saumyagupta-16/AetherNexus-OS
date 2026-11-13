'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { appleAudio } from '@/lib/audio';

export interface TelemetryPoint {
  time: string;
  timestampMs: number;
  temperature: number;
  syntheticTemp?: number;
  isSynthesized: boolean;
  variance: number;
}

interface TelemetryContextType {
  wsConnected: boolean;
  currentTemp: number;
  isWireSevered: boolean;
  failoverLatencyMs: number;
  currentDrawMa: number;
  busVoltageV: number;
  phantomConfidence: number;
  radarVariance: number;
  radarState: string;
  isLockdownActive: boolean;
  currentIndustry: string;
  telemetryHistory: TelemetryPoint[];
  soundEnabled: boolean;
  isTimeMachineOpen: boolean;
  isMriModalOpen: boolean;
  isGhostRadarOpen: boolean;
  setIndustry: (ind: string) => void;
  toggleSound: () => void;
  toggleTimeMachine: () => void;
  openMriModal: () => void;
  closeMriModal: () => void;
  openGhostRadar: () => void;
  closeGhostRadar: () => void;
  triggerWirePull: () => Promise<void>;
  simulateIntrusion: () => Promise<void>;
  resetLockdown: () => Promise<void>;
  runMriScan: (targetUrl?: string) => Promise<any>;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

const API_BASE = 'http://localhost:8000';
const WS_URL = 'ws://localhost:8000/ws/telemetry';

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wsConnected, setWsConnected] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(42.5);
  const [isWireSevered, setIsWireSevered] = useState(false);
  const [failoverLatencyMs, setFailoverLatencyMs] = useState(12.8);
  const [currentDrawMa, setCurrentDrawMa] = useState(380.0);
  const [busVoltageV, setBusVoltageV] = useState(3.29);
  const [phantomConfidence, setPhantomConfidence] = useState(0.964);

  const [radarVariance, setRadarVariance] = useState(0.28);
  const [radarState, setRadarState] = useState('CLEAR');
  const [isLockdownActive, setIsLockdownActive] = useState(false);

  const [currentIndustry, setCurrentIndustry] = useState('IIOT');
  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryPoint[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals & Panels state
  const [isTimeMachineOpen, setIsTimeMachineOpen] = useState(false);
  const [isMriModalOpen, setIsMriModalOpen] = useState(false);
  const [isGhostRadarOpen, setIsGhostRadarOpen] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout;

    const connect = () => {
      try {
        ws = new WebSocket(WS_URL);
        socketRef.current = ws;

        ws.onopen = () => {
          setWsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const frame = JSON.parse(event.data);
            const m = frame.metrics;
            if (!m) return;

            setCurrentTemp(m.temp_celsius);
            setIsWireSevered(!m.is_wire_connected);
            setCurrentDrawMa(m.current_draw_ma || 380.0);
            setBusVoltageV(m.bus_voltage_v || 3.29);
            setPhantomConfidence(m.phantom_confidence || 0.964);
            setFailoverLatencyMs(m.failover_latency_ms || 12.8);

            setRadarVariance(m.wifi_radar_variance || 0.28);
            setRadarState(m.ghost_radar_state || 'CLEAR');
            setIsLockdownActive(m.physical_lockdown_active || false);

            const now = new Date();
            const timeStr = `${now.getMinutes()}:${now.getSeconds()}.${Math.floor(now.getMilliseconds() / 100)}`;

            setTelemetryHistory((prev) => {
              const updated = [
                ...prev.slice(-49),
                {
                  time: timeStr,
                  timestampMs: Date.now(),
                  temperature: m.temp_celsius,
                  syntheticTemp: m.synthetic_temp_celsius,
                  isSynthesized: !m.is_wire_connected,
                  variance: m.wifi_radar_variance || 0.28,
                },
              ];
              return updated;
            });
          } catch (e) {}
        };

        ws.onerror = () => {
          setWsConnected(false);
        };

        ws.onclose = () => {
          setWsConnected(false);
          reconnectTimer = setTimeout(connect, 3000);
        };
      } catch (e) {
        setWsConnected(false);
        reconnectTimer = setTimeout(connect, 3000);
      }
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) ws.close();
    };
  }, []);

  const setIndustry = (ind: string) => {
    if (soundEnabled) appleAudio.playClick();
    setCurrentIndustry(ind);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) appleAudio.playClick();
      return next;
    });
  };

  const toggleTimeMachine = () => {
    if (soundEnabled) appleAudio.playClick();
    setIsTimeMachineOpen((prev) => !prev);
  };

  const openMriModal = () => {
    if (soundEnabled) appleAudio.playClick();
    setIsMriModalOpen(true);
  };

  const closeMriModal = () => {
    setIsMriModalOpen(false);
  };

  const openGhostRadar = () => {
    if (soundEnabled) appleAudio.playClick();
    setIsGhostRadarOpen(true);
  };

  const closeGhostRadar = () => {
    setIsGhostRadarOpen(false);
  };

  const triggerWirePull = async () => {
    const nextState = !isWireSevered;
    setIsWireSevered(nextState);
    if (soundEnabled) {
      if (nextState) appleAudio.playFailover();
      else appleAudio.playRestore();
    }
    try {
      await fetch(`${API_BASE}/api/chaos/pull-wire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sever_wire: nextState }),
      });
    } catch (e) {}
  };

  const simulateIntrusion = async () => {
    if (soundEnabled) appleAudio.playAlarm();
    setRadarVariance(4.82);
    setRadarState('HUMAN_INTRUSION_DETECTED');
    setIsLockdownActive(true);
    try {
      await fetch(`${API_BASE}/api/chaos/ghost-radar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulate_presence: true }),
      });
    } catch (e) {}
  };

  const resetLockdown = async () => {
    if (soundEnabled) appleAudio.playClick();
    setRadarVariance(0.28);
    setRadarState('CLEAR');
    setIsLockdownActive(false);
    try {
      await fetch(`${API_BASE}/api/chaos/ghost-radar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulate_presence: false }),
      });
    } catch (e) {}
  };

  const runMriScan = async (targetUrl: string = 'https://api.aethernexus.ai') => {
    if (soundEnabled) appleAudio.playClick();
    try {
      const res = await fetch(`${API_BASE}/api/diagnostic/mri-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_url: targetUrl }),
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  };

  return (
    <TelemetryContext.Provider
      value={{
        wsConnected,
        currentTemp,
        isWireSevered,
        failoverLatencyMs,
        currentDrawMa,
        busVoltageV,
        phantomConfidence,
        radarVariance,
        radarState,
        isLockdownActive,
        currentIndustry,
        telemetryHistory,
        soundEnabled,
        isTimeMachineOpen,
        isMriModalOpen,
        isGhostRadarOpen,
        setIndustry,
        toggleSound,
        toggleTimeMachine,
        openMriModal,
        closeMriModal,
        openGhostRadar,
        closeGhostRadar,
        triggerWirePull,
        simulateIntrusion,
        resetLockdown,
        runMriScan,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    // Graceful SSR / Prerender fallback
    return {
      wsConnected: false,
      currentTemp: 42.5,
      isWireSevered: false,
      failoverLatencyMs: 0,
      currentDrawMa: 380.0,
      busVoltageV: 3.29,
      phantomConfidence: 1.0,
      radarVariance: 0.28,
      radarState: 'CLEAR',
      isLockdownActive: false,
      currentIndustry: 'IIOT',
      telemetryHistory: [],
      soundEnabled: true,
      isTimeMachineOpen: false,
      isMriModalOpen: false,
      isGhostRadarOpen: false,
      setIndustry: () => {},
      toggleSound: () => {},
      toggleTimeMachine: () => {},
      openMriModal: () => {},
      closeMriModal: () => {},
      openGhostRadar: () => {},
      closeGhostRadar: () => {},
      triggerWirePull: async () => {},
      simulateIntrusion: async () => {},
      resetLockdown: async () => {},
      runMriScan: async () => ({}),
    };
  }
  return context;
};

