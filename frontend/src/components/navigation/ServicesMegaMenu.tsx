'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Cloud, Activity, Cpu, Shield, Bot, Wrench, 
  ArrowRight, CheckCircle2, ChevronRight, Sparkles 
} from 'lucide-react';

interface ServicesMegaMenuProps {
  onClose: () => void;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  badge?: string;
  items: { id: string; title: string; href: string; desc: string; isHighlight?: boolean }[];
}

export const SERVICES_CATEGORIES: CategoryItem[] = [
  {
    id: 'cloud-platform',
    name: 'Cloud & Platform Engineering',
    icon: Cloud,
    tagline: 'High-Throughput Streaming & Autonomous Failover',
    badge: 'Core Engine',
    items: [
      { id: 'telemetry-streaming', title: 'High-Frequency Telemetry Streaming', href: '/services/cloud-platform/telemetry-streaming', desc: 'Sub-20ms WebSocket and MQTT v5 data streaming with zero-lag canvas visualization', isHighlight: true },
      { id: 'autonomous-failover', title: 'Autonomous Failover & Redundancy Engine', href: '/services/cloud-platform/autonomous-failover', desc: 'Sub-15ms machine-learning state recovery preventing single-point-of-failure downtime' },
      { id: 'time-series-replay', title: 'Time-Series Recording & Incident Replay', href: '/services/cloud-platform/time-series-replay', desc: 'In-memory ring buffer for millisecond-accurate post-mortem root-cause analysis' },
      { id: 'self-healing-gateway', title: 'Self-Healing API Gateway & Traffic Shaper', href: '/services/cloud-platform/self-healing-gateway', desc: 'Dynamic AST payload adaptation and automated GitHub PR hotfix generation' },
    ],
  },
  {
    id: 'quality-compliance',
    name: 'Quality Assurance & Compliance Auditing',
    icon: Activity,
    tagline: 'Automated 10-Point Probes & Certified Proofs',
    badge: 'Audit Ready',
    items: [
      { id: 'diagnostic-scanner', title: '10-Point Enterprise Health Scanner', href: '/services/quality-compliance/diagnostic-scanner', desc: 'Automated diagnostic matrix inspecting API, network, database, and hardware states', isHighlight: true },
      { id: 'compliance-certificates', title: 'Cryptographically Signed Audit Reports', href: '/services/quality-compliance/compliance-certificates', desc: 'Downloadable tamper-evident PDF audit certificates aligned with ISO 27001 & SOC 2' },
      { id: 'chaos-testing', title: 'Chaos Engineering & Resilience Labs', href: '/services/quality-compliance/chaos-testing', desc: 'Automated boundary fuzzing, rate-limit stress tests, and fault injection matrices' },
      { id: 'latency-profiler', title: 'Sub-Millisecond Latency Profiler', href: '/services/quality-compliance/latency-profiler', desc: 'Microsecond TTFB, DNS, TLS, and P99 jitter decomposition across distributed nodes' },
    ],
  },
  {
    id: 'iot-edge',
    name: 'Embedded IoT & Edge Engineering',
    icon: Cpu,
    tagline: 'Hardware Bring-Up, Firmware & Sensor Telemetry',
    badge: 'Hardware Ready',
    items: [
      { id: 'edge-firmware', title: 'Enterprise Edge Firmware Development', href: '/services/iot-edge/edge-firmware', desc: 'Dual-core 240MHz FreeRTOS firmware with deterministic task scheduling and OTA healer', isHighlight: true },
      { id: 'sensor-integration', title: 'Zero-Code Sensor Bus Integration', href: '/services/iot-edge/sensor-integration', desc: 'Automatic plug-and-play identification of voltage, current, vibration, and temperature sensors' },
      { id: 'sensor-fusion', title: 'Sensor Fusion & Predictive Interpolation', href: '/services/iot-edge/sensor-fusion', desc: 'Cross-sensor mathematical algorithms maintaining data continuity during signal drops' },
      { id: 'relay-controls', title: 'Physical Interlock & Actuator Control', href: '/services/iot-edge/relay-controls', desc: 'Hardened relay management, cooling fan automation, and electronic safety deadbolts' },
    ],
  },
  {
    id: 'cybersecurity-identity',
    name: 'Cybersecurity & Hardware Identity',
    icon: Shield,
    tagline: 'Physical Layer Security & Zero-Trust Architecture',
    badge: 'Zero-Trust',
    items: [
      { id: 'hardware-identity', title: 'Hardware Root-of-Trust & Device Identity', href: '/services/cybersecurity-identity/hardware-identity', desc: 'Transistor physical unclonable function (PUF) biometrics for unforgeable device keys', isHighlight: true },
      { id: 'rf-perimeter-sensing', title: 'RF Perimeter & Non-Camera Security', href: '/services/cybersecurity-identity/rf-perimeter-sensing', desc: 'Non-invasive radio-frequency multipath scattering detection (100% GDPR/HIPAA compliant)' },
      { id: 'tenant-isolation', title: 'Multi-Tenant Cryptographic Partitioning', href: '/services/cybersecurity-identity/tenant-isolation', desc: 'PostgreSQL Row-Level Security with isolated client keys and encrypted audit trails' },
      { id: 'immutable-logs', title: 'Tamper-Evident Merkle Audit Trails', href: '/services/cybersecurity-identity/immutable-logs', desc: 'Cryptographically hashed operational records providing indisputable compliance proof' },
    ],
  },
  {
    id: 'ai-automation',
    name: 'Autonomous AI & Workflow Automation',
    icon: Bot,
    tagline: 'Intelligent Incident Triage & Self-Healing SRE',
    badge: 'AI Agents',
    items: [
      { id: 'autonomous-sre', title: 'Autonomous SRE & Watchdog Agents', href: '/services/ai-automation/autonomous-sre', desc: 'Automated warm restarts, intelligent circuit-breaking, and self-healing pipelines', isHighlight: true },
      { id: 'automated-testing', title: 'Continuous Automated QA Testing Agents', href: '/services/ai-automation/automated-testing', desc: 'Self-generating Playwright and API fuzzing suites with automated defect verification' },
      { id: 'cloud-cost-optimizer', title: 'FinOps Cloud Resource & Cost Optimizer', href: '/services/ai-automation/cloud-cost-optimizer', desc: 'Automated detection and pruning of idle compute, orphan volumes, and over-provisioned nodes' },
      { id: 'incident-copilot', title: 'AI Operational Copilot & Diagnostic Triage', href: '/services/ai-automation/incident-copilot', desc: 'Natural language interface for real-time telemetry inspection and root-cause resolution' },
    ],
  },
  {
    id: 'managed-advisory',
    name: 'Enterprise Consulting & 24/7 Managed SRE',
    icon: Wrench,
    tagline: 'Architecture Strategy, Cloud Migration & Dedicated SLAs',
    badge: 'Consulting',
    items: [
      { id: 'architecture-consulting', title: 'Cyber-Physical Architecture Consulting', href: '/services/managed-advisory/architecture-consulting', desc: 'Custom telemetry topology design, TimescaleDB ring buffer sizing, and broker architecture', isHighlight: true },
      { id: 'cloud-migration', title: 'Zero-Downtime Migration Services', href: '/services/managed-advisory/cloud-migration', desc: 'Migrate legacy monolithic infrastructure onto isolated multi-tenant event-driven platforms' },
      { id: 'managed-sre', title: '24/7 Managed SRE & Mission Control', href: '/services/managed-advisory/managed-sre', desc: 'Guaranteed 99.99% uptime SLAs with dedicated systems architect on-call support' },
    ],
  },
];

export const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>('cloud-platform');

  const selectedCategory = SERVICES_CATEGORIES.find((c) => c.id === activeCategory) || SERVICES_CATEGORIES[0];

  return (
    <div 
      className="bg-white rounded-3xl border border-slate-200/95 p-6 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 z-50 text-left select-none"
      onMouseLeave={onClose}
    >
      {/* Top Banner inside Menu */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            AetherNexus Professional Services & Solutions
          </span>
          <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
            6 Portfolios • Enterprise Ready
          </span>
        </div>
        <Link
          href="/services"
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
        >
          <span>Explore All Services Catalog</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Categories List */}
        <div className="col-span-4 border-r border-slate-200/80 pr-4 space-y-1">
          {SERVICES_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-2xl transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold truncate">{cat.name}</span>
                    {cat.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {cat.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Category Sub-items */}
        <div className="col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>{selectedCategory.name}</span>
                <span className="text-[11px] font-normal text-slate-500">({selectedCategory.items.length} offerings)</span>
              </h4>
              <Link
                href={`/services/${selectedCategory.id}`}
                onClick={onClose}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View Portfolio Hub</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {selectedCategory.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={`group p-3 rounded-2xl border transition-all text-left block ${
                    item.isHighlight 
                      ? 'bg-blue-50/60 border-blue-200/90 hover:bg-blue-50 hover:border-blue-300' 
                      : 'bg-slate-50/80 border-slate-200/90 hover:bg-white hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      {item.isHighlight && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      <span className="truncate">{item.title}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Action Footer inside Mega-Menu */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between bg-slate-50/90 -mx-2 -mb-2 p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] text-slate-600">
                <span className="font-bold text-slate-800">ISO/IEC 27001 & SOC 2 Type II</span> Standards Compliant
              </div>
            </div>
            <Link
              href="/services/quality-compliance/diagnostic-scanner"
              onClick={onClose}
              className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs"
            >
              Run Free 10-Point Health Scan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
