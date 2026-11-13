'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { 
  RoleSwitcher, ROLES 
} from '@/components/RoleSwitcher';
import { 
  IndustrySelector, INDUSTRIES_LIST 
} from '@/components/IndustrySelector';
import { 
  LiveTelemetryCanvas, TelemetryPoint 
} from '@/components/LiveTelemetryCanvas';
import { 
  MorphOSChaosPanel 
} from '@/components/MorphOSChaosPanel';
import { 
  GhostRadarScope 
} from '@/components/GhostRadarScope';
import { 
  TimeMachineBar 
} from '@/components/TimeMachineBar';
import { 
  UniversalMRIDashboard 
} from '@/components/UniversalMRIDashboard';
import { 
  StarkVoiceCopilot 
} from '@/components/StarkVoiceCopilot';
import { 
  SelfMorphingProxyModal 
} from '@/components/SelfMorphingProxyModal';
import { 
  ExecutiveDemoTour 
} from '@/components/ExecutiveDemoTour';

// Dedicated Enterprise Role Workspaces
import { CEOAdminWorkspace } from '@/components/workspaces/CEOAdminWorkspace';
import { QAArchitectWorkspace } from '@/components/workspaces/QAArchitectWorkspace';
import { IoTLeadWorkspace } from '@/components/workspaces/IoTLeadWorkspace';
import { SecOpsWorkspace } from '@/components/workspaces/SecOpsWorkspace';
import { ClientAuditorWorkspace } from '@/components/workspaces/ClientAuditorWorkspace';

import { appleAudio } from '@/lib/audio';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { useAuth } from '@/context/AuthContext';

const API_BASE = 'http://localhost:8000';
const WS_URL = 'ws://localhost:8000/ws/telemetry';

export default function Home() {
  const { user, switchRole } = useAuth();
  const [currentRole, setCurrentRole] = useState('IOT_ENGINEER');
  const [currentIndustry, setCurrentIndustry] = useState('IIOT');

  // Real-time Telemetry State
  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryPoint[]>([]);
  const [currentTemp, setCurrentTemp] = useState(42.5);
  const [isWireSevered, setIsWireSevered] = useState(false);
  const [failoverLatencyMs, setFailoverLatencyMs] = useState(12.8);
  const [currentDrawMa, setCurrentDrawMa] = useState(380.0);
  const [busVoltageV, setBusVoltageV] = useState(3.29);
  const [phantomConfidence, setPhantomConfidence] = useState(0.964);

  // GhostRadar State
  const [radarVariance, setRadarVariance] = useState(0.28);
  const [radarState, setRadarState] = useState('CLEAR');
  const [isLockdownActive, setIsLockdownActive] = useState(false);

  // Time-Machine State
  const [isRewound, setIsRewound] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocket 50Hz Connection
  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout;

    const connect = () => {
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

          // Radar
          setRadarVariance(m.wifi_radar_variance || 0.28);
          setRadarState(m.ghost_radar_state || 'CLEAR');
          setIsLockdownActive(m.lockdown_active || false);

          // Append to 50Hz canvas buffer (keep last 75 points)
          setTelemetryHistory((prev) => {
            const next = [
              ...prev,
              {
                timestamp: frame.timestamp_ms,
                value: m.temp_celsius,
                isSynthesized: m.is_phantom_synthesized,
              },
            ];
            if (next.length > 75) next.shift();
            return next;
          });
        } catch (err) {
          console.error('[WebSocket Frame Parse Error]', err);
        }
      };

      ws.onclose = () => {
        setWsConnected(false);
        reconnectTimer = setTimeout(connect, 2000);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) ws.close();
    };
  }, []);

  // Role Switch with Apple Click Cue
  const handleRoleChange = (roleId: string) => {
    appleAudio.playClick();
    setCurrentRole(roleId);
    switchRole(roleId);
  };

  // Chaos Actions
  const handleToggleWire = async (severed: boolean) => {
    if (severed) {
      appleAudio.playFailover();
    } else {
      appleAudio.playClick();
    }
    setIsWireSevered(severed);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: 'WIRE_PULL', severed }));
    } else {
      await fetch(`${API_BASE}/api/simulator/wire-pull`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ severed }),
      });
    }
  };

  const handleSimulateIntrusion = async (intruded: boolean) => {
    if (intruded) {
      appleAudio.playAlert();
    } else {
      appleAudio.playClick();
    }
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: 'ROOM_INTRUSION', intruded }));
    } else {
      await fetch(`${API_BASE}/api/simulator/room-intrusion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intruded }),
      });
    }
  };

  const handleResetLockdown = async () => {
    appleAudio.playClick();
    setIsLockdownActive(false);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: 'RESET_LOCKDOWN' }));
    } else {
      await fetch(`${API_BASE}/api/simulator/reset-lockdown`, { method: 'POST' });
    }
  };

  // Time-Machine Scrub
  const handleTimeScrub = async (offsetSeconds: number) => {
    appleAudio.playClick();
    if (offsetSeconds > 0) {
      setIsRewound(true);
      const targetMs = Date.now() - offsetSeconds * 1000;
      try {
        const res = await fetch(`${API_BASE}/api/time-machine/rewind`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ epoch_ms: targetMs }),
        });
        if (res.ok) {
          const frame = await res.json();
          if (frame.metrics) {
            setCurrentTemp(frame.metrics.temp_celsius);
            setIsWireSevered(!frame.metrics.is_wire_connected);
          }
        }
      } catch (err) {}
    } else {
      setIsRewound(false);
    }
  };

  const handleSimulateCounterfactual = async () => {
    appleAudio.playClick();
    try {
      const res = await fetch(`${API_BASE}/api/time-machine/simulate-counterfactual`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ epoch_ms: Date.now() - 5000 }),
      });
      const data = await res.json();
      alert(`[Counterfactual Simulation Result]\nReverted reality nominal baseline.\nCost saved: ₹${data.cost_saving_calculated_inr.toLocaleString()}\nSLA Preserved: ${data.sla_saved_pct}%`);
    } catch (err) {}
  };

  // MRI Scan & PDF
  const handleRunMRIScan = async () => {
    appleAudio.playClick();
    const res = await fetch(`${API_BASE}/api/mri/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_url: 'https://api.aethernexus.ai', node_id: 'ESP32_MASTER_01' }),
    });
    return await res.json();
  };

  const handleDownloadPdf = async () => {
    appleAudio.playClick();
    const res = await fetch(`${API_BASE}/api/mri/generate-pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_url: 'https://api.aethernexus.ai', node_id: 'ESP32_MASTER_01' }),
    });
    const data = await res.json();
    if (data.pdf_info?.download_url) {
      window.open(`${API_BASE}${data.pdf_info.download_url}`, '_blank');
    }
  };

  // Copilot Command
  const handleCopilotCommand = async (transcript: string) => {
    appleAudio.playClick();
    const res = await fetch(`${API_BASE}/api/copilot/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript }),
    });
    const data = await res.json();
    return data.reply;
  };

  // Self-Morphing Proxy
  const handleSimulateBreakage = async () => {
    appleAudio.playClick();
    const res = await fetch(`${API_BASE}/api/proxy/simulate-breaking-schema`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: '/api/v2/orders',
        payload: { user_id: 'usr_88712', phone: '+91-9876543210', zip: '560001' },
      }),
    });
    return await res.json();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28 text-slate-900">
      {/* Top Apple Navigation Bar */}
      <GlobalHeader
        onTriggerMri={handleRunMRIScan}
        onToggleTimeMachine={() => setIsRewound(!isRewound)}
        onOpenGhostRadar={() => handleSimulateIntrusion(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-6 space-y-6">
        {/* Role Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Enterprise Command Center</h2>
            <p className="text-xs text-slate-500">
              Active Organization: <span className="font-semibold text-slate-700">app.aethernexus.ai/qualimatrix-enterprise</span>
            </p>
          </div>
          <RoleSwitcher currentRole={currentRole} onRoleChange={handleRoleChange} />
        </div>

        {/* Dynamic Workspace based on Active Role */}
        {currentRole === 'CEO_ADMIN' && <CEOAdminWorkspace />}
        {currentRole === 'QA_ARCHITECT' && <QAArchitectWorkspace />}
        {currentRole === 'IOT_ENGINEER' && <IoTLeadWorkspace />}
        {currentRole === 'SECOPS_LEAD' && <SecOpsWorkspace />}
        {currentRole === 'CLIENT_VIEWER' && (
          <ClientAuditorWorkspace onDownloadPdf={handleDownloadPdf} />
        )}

        {/* Primary 50Hz Real-Time Canvas Scope */}
        <LiveTelemetryCanvas
          dataPoints={telemetryHistory}
          currentValue={currentTemp}
          isSynthesized={isWireSevered}
          confidenceScore={phantomConfidence}
          unit="°C"
        />

        {/* Interactive Frontier Innovation Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MorphOS Wire-Pull Demo */}
          <MorphOSChaosPanel
            isWireSevered={isWireSevered}
            onToggleWire={handleToggleWire}
            failoverLatencyMs={failoverLatencyMs}
            currentDrawMa={currentDrawMa}
            busVoltageV={busVoltageV}
            phantomConfidence={phantomConfidence}
          />

          {/* GhostRadar Wi-Fi Sonar */}
          <GhostRadarScope
            variance={radarVariance}
            radarState={radarState}
            isLockdownActive={isLockdownActive}
            onSimulateIntrusion={handleSimulateIntrusion}
            onResetLockdown={handleResetLockdown}
          />
        </div>

        {/* Universal Diagnostic MRI Scanner */}
        <UniversalMRIDashboard
          onRunScan={handleRunMRIScan}
          onDownloadPdf={handleDownloadPdf}
        />

        {/* Self-Morphing API Proxy & Stark Voice Copilot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SelfMorphingProxyModal onSimulateBreakage={handleSimulateBreakage} />
          <StarkVoiceCopilot onSendCommand={handleCopilotCommand} />
        </div>
      </main>

      {/* Floating Bottom Apple Capsule: Cyber-Physical Time-Machine */}
      <TimeMachineBar
        onScrub={handleTimeScrub}
        onSimulateFix={handleSimulateCounterfactual}
        isRewound={isRewound}
        onLiveResume={() => {
          setIsRewound(false);
          handleTimeScrub(0);
        }}
      />
    </div>
  );
}
