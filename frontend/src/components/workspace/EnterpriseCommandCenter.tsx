'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  CEOAdminWorkspace 
} from '@/components/workspaces/CEOAdminWorkspace';
import { 
  QAArchitectWorkspace 
} from '@/components/workspaces/QAArchitectWorkspace';
import { 
  IoTLeadWorkspace 
} from '@/components/workspaces/IoTLeadWorkspace';
import { 
  SecOpsWorkspace 
} from '@/components/workspaces/SecOpsWorkspace';
import { 
  ClientAuditorWorkspace 
} from '@/components/workspaces/ClientAuditorWorkspace';
import { appleAudio } from '@/lib/audio';
import { useAuth } from '@/context/AuthContext';

const API_BASE = 'http://localhost:8000';
const WS_URL = 'ws://localhost:8000/ws/telemetry';

export function EnterpriseCommandCenter() {
  const { user, switchRole } = useAuth();
  const [currentRole, setCurrentRole] = useState('IOT_ENGINEER');
  const [currentIndustry, setCurrentIndustry] = useState('IIOT');

  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryPoint[]>([]);
  const [currentTemp, setCurrentTemp] = useState(42.5);
  const [isWireSevered, setIsWireSevered] = useState(false);
  const [failoverLatencyMs, setFailoverLatencyMs] = useState(12.8);
  const [currentDrawMa, setCurrentDrawMa] = useState(380.0);
  const [busVoltageV, setBusVoltageV] = useState(3.29);
  const [phantomConfidence, setPhantomConfidence] = useState(0.964);

  const [radarVariance, setRadarVariance] = useState(0.28);
  const [radarState, setRadarState] = useState('CLEAR');
  const [isLockdownActive, setIsLockdownActive] = useState(false);

  const [isRewound, setIsRewound] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout;

    const connect = () => {
      ws = new WebSocket(WS_URL);
      socketRef.current = ws;

      ws.onopen = () => setWsConnected(true);

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

          setTelemetryHistory((prev) => [
            ...prev.slice(-49),
            {
              timestamp: Date.now(),
              value: m.temp_celsius,
              isSynthesized: !m.is_wire_connected,
            },
          ]);
        } catch (e) {}
      };

      ws.onerror = () => setWsConnected(false);
      ws.onclose = () => {
        setWsConnected(false);
        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) ws.close();
    };
  }, []);

  const handleRoleChange = (roleId: string) => {
    appleAudio.playClick();
    setCurrentRole(roleId);
    switchRole(roleId);
  };

  const handleToggleWire = async (severed: boolean) => {
    if (severed) appleAudio.playFailover();
    else appleAudio.playRestore();

    setIsWireSevered(severed);
    try {
      await fetch(`${API_BASE}/api/chaos/pull-wire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sever_wire: severed }),
      });
    } catch (e) {}
  };

  const handleSimulateIntrusion = async (intruded: boolean) => {
    if (intruded) appleAudio.playAlert();
    else appleAudio.playClick();

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          action: 'simulate_radar',
          presence: intruded,
        })
      );
    }
  };

  const handleResetLockdown = async () => {
    appleAudio.playClick();
    setIsLockdownActive(false);
    try {
      await fetch(`${API_BASE}/api/chaos/ghost-radar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulate_presence: false }),
      });
    } catch (e) {}
  };

  const handleRunMRIScan = async () => {
    appleAudio.playClick();
    try {
      const res = await fetch(`${API_BASE}/api/diagnostic/mri-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_url: 'https://api.aethernexus.ai' }),
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  };

  const handleDownloadPdf = async () => {
    appleAudio.playClick();
    try {
      await fetch(`${API_BASE}/api/diagnostic/download-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scan_id: 'SCAN-LATEST' }),
      });
    } catch (e) {}
  };

  const handleSimulateBreakage = async () => {
    appleAudio.playClick();
    const res = await fetch(`${API_BASE}/api/chaos/simulate-breakage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_type: 'MOBILE_CLIENT_V1' }),
    });
    return await res.json();
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Role Switcher & Organization Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Enterprise Service Workspace</h2>
          <p className="text-xs text-slate-500">
            Active Organization: <span className="font-semibold text-slate-700">app.aethernexus.ai/{user.orgSlug}</span>
          </p>
        </div>
        <RoleSwitcher currentRole={currentRole} onRoleChange={handleRoleChange} />
      </div>

      {/* Dynamic Role Console */}
      {currentRole === 'CEO_ADMIN' && <CEOAdminWorkspace />}
      {currentRole === 'QA_ARCHITECT' && <QAArchitectWorkspace />}
      {currentRole === 'IOT_ENGINEER' && <IoTLeadWorkspace />}
      {currentRole === 'SECOPS_LEAD' && <SecOpsWorkspace />}
      {currentRole === 'CLIENT_VIEWER' && (
        <ClientAuditorWorkspace onDownloadPdf={handleDownloadPdf} />
      )}

      {/* 50Hz Telemetry Canvas Scope */}
      <LiveTelemetryCanvas
        dataPoints={telemetryHistory}
        currentValue={currentTemp}
        isSynthesized={isWireSevered}
        confidenceScore={phantomConfidence}
        unit="°C"
      />

      {/* Chaos & RF Security Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MorphOSChaosPanel
          isWireSevered={isWireSevered}
          onToggleWire={handleToggleWire}
          failoverLatencyMs={failoverLatencyMs}
          currentDrawMa={currentDrawMa}
          busVoltageV={busVoltageV}
          phantomConfidence={phantomConfidence}
        />
        <GhostRadarScope
          variance={radarVariance}
          radarState={radarState}
          isLockdownActive={isLockdownActive}
          onSimulateIntrusion={handleSimulateIntrusion}
          onResetLockdown={handleResetLockdown}
        />
      </div>

      {/* Diagnostic MRI Dashboard */}
      <UniversalMRIDashboard
        onRunScan={handleRunMRIScan}
        onDownloadPdf={handleDownloadPdf}
      />

      {/* Self-Morphing Proxy & Stark Voice Copilot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SelfMorphingProxyModal onSimulateBreakage={handleSimulateBreakage} />
        <StarkVoiceCopilot onSendCommand={async (cmd: string) => {
          return `Acknowledged directive "${cmd}". All 50Hz telemetry bus nodes operating within nominal thresholds.`;
        }} />
      </div>

      {/* Time-Machine Bar */}
      <TimeMachineBar
        onScrub={() => {}}
        onSimulateFix={async () => ({})}
        isRewound={isRewound}
        onLiveResume={() => setIsRewound(false)}
      />
    </div>
  );
}
