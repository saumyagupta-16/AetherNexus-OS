'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, Activity, Shield, Cpu, RefreshCw, Layers, FileText, 
  ArrowRight, Radio, Cloud, Database, Bot, Lock, Wrench, CheckCircle2 
} from 'lucide-react';

interface ServicesMegaMenuProps {
  onClose: () => void;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  badge?: string;
  items: { title: string; href: string; desc: string; isHighlight?: boolean }[];
}

export const SERVICES_CATEGORIES: CategoryItem[] = [
  {
    id: 'platform-core',
    name: 'Platform Core & Frontier Tech',
    icon: Zap,
    tagline: '5 Deep-Tech Breakthroughs',
    badge: 'Core Engine',
    items: [
      { title: '50Hz Real-Time Telemetry Bus', href: '/services/platform-core/telemetry-bus', desc: 'Sub-20ms WebSocket streaming with 120fps canvas rendering' },
      { title: 'MorphOS™ Phantom Sensor ML', href: '/services/platform-core/morphos-phantom-ml', desc: 'Cross-sensor ML failover in 12.8ms with 96.4% confidence', isHighlight: true },
      { title: 'GhostRadar™ Camera-Free Sonar', href: '/services/platform-core/ghost-radar-sonar', desc: '50Hz Wi-Fi RF scattering detection (GDPR/HIPAA compliant)' },
      { title: 'SiliconDNA™ Hardware PUF Vault', href: '/services/platform-core/silicon-dna-puf', desc: 'Unclonable 256-bit transistor gate threshold biometrics' },
      { title: 'Cyber-Physical Time-Machine', href: '/services/platform-core/cyber-physical-time-machine', desc: '60-second in-memory ring buffer for post-mortem scrub' },
      { title: 'Self-Morphing API Hotfix Proxy', href: '/services/platform-core/self-morphing-api-proxy', desc: 'Dynamic AST JSON rewriting & automatic GitHub PRs' },
    ],
  },
  {
    id: 'diagnostic-mri',
    name: 'Diagnostic MRI & Quality Lab',
    icon: Activity,
    tagline: 'Automated 10-Probe Inspections',
    badge: 'Audit Ready',
    items: [
      { title: 'Universal Diagnostic MRI Scanner', href: '/services/diagnostic-mri/universal-scanner', desc: '10 software & hardware probes with 0-100% health score', isHighlight: true },
      { title: 'Cryptographic PDF Audit Certs', href: '/services/diagnostic-mri/audit-certificates', desc: 'Downloadable signed PDF compliance proofs (ISO/SOC2)' },
      { title: 'Boundary Chaos & SQLi Fuzzing', href: '/services/diagnostic-mri/chaos-engineering', desc: '500+ stepped concurrent chaos requests & rate-limit checks' },
      { title: 'Sub-millisecond Latency Profiler', href: '/services/diagnostic-mri#latency', desc: 'Microsecond TTFB, DNS, TLS, and P99 jitter decomposition' },
      { title: 'Broken Link & DOM Console Scan', href: '/services/diagnostic-mri#dom-audit', desc: 'Headless Chromium crawl for uncaught JS exceptions' },
    ],
  },
  {
    id: 'industry-solutions',
    name: 'Industry Vertical Blueprints',
    icon: Layers,
    tagline: '11 Tailored Enterprise Verticals',
    badge: '11 Verticals',
    items: [
      { title: 'Product IT Software Companies', href: '/services/industry-solutions/product-software', desc: 'Prevent breaking API releases & container OOM crashes' },
      { title: 'IT Consulting & QA Services', href: '/services/industry-solutions/it-consulting-qa', desc: 'Multi-client staging MRI & white-label signed audit reports', isHighlight: true },
      { title: 'Multi-Tenant SaaS Platforms', href: '/services/industry-solutions/saas-platforms', desc: 'Dead-letter webhook replays & per-tenant latency heatmaps' },
      { title: 'Industrial IoT & Manufacturing', href: '/services/industry-solutions/industrial-iiot', desc: 'Conveyor wire-snap failover & turbine FFT vibration scope' },
      { title: 'Consumer IoT & Smart Wearables', href: '/services/industry-solutions/consumer-wearables', desc: 'OTA firmware safe rollouts & battery drain profiling' },
      { title: 'Cloud IaaS / PaaS & FinOps', href: '/services/industry-solutions/cloud-infrastructure', desc: 'Zombie compute termination & multi-cloud latency radar' },
      { title: 'Cybersecurity & SecOps', href: '/services/industry-solutions/cybersecurity-secops', desc: 'Camera-free physical perimeter detection & hardware locks' },
      { title: 'View All 11 Industry Blueprints →', href: '/services/industry-solutions', desc: 'Including AI Ops, Semiconductors, Telecoms, and MQTT Platforms' },
    ],
  },
  {
    id: 'autonomous-agents',
    name: 'Autonomous AI Swarm Agents',
    icon: Bot,
    tagline: 'Self-Healing LangGraph Pipelines',
    badge: 'AI Agents',
    items: [
      { title: 'AutoQA Continuous Testing Agent', href: '/services/autonomous-agents/auto-qa', desc: 'Self-running Playwright & API fuzzing matrix generator' },
      { title: 'SRE Self-Healing Watchdog', href: '/services/autonomous-agents/self-healing-watchdog', desc: 'Automated microsecond warm restarts & circuit breaking' },
      { title: 'FinOps Cloud Cost Cutter Agent', href: '/services/autonomous-agents/finops-optimizer', desc: 'Orphaned EBS volume cleaner & k8s pod right-sizer' },
      { title: 'NetHeal Telecom BGP Agent', href: '/services/autonomous-agents/netheal-failover', desc: 'Sub-85ms route convergence & tower anti-theft dispatch' },
    ],
  },
  {
    id: 'role-workspaces',
    name: 'Role-Based Workspaces',
    icon: Shield,
    tagline: '5 Tailored Persona Consoles',
    badge: 'RBAC',
    items: [
      { title: 'CEO & Founder Dashboard', href: '/services/role-workspaces/ceo-admin', desc: '99.99% SLA uptime, monthly cost saved, and ROI analytics' },
      { title: 'QA Test Architect Workbench', href: '/services/role-workspaces/qa-architect', desc: 'Chaos payload lab, test flakiness, and signed PDF exports' },
      { title: 'IoT & Hardware Lead Studio', href: '/services/role-workspaces/iot-engineer', desc: '50Hz scopes, I2C bus discovery, and wire-pull trigger' },
      { title: 'SecOps & CISO Security Radar', href: '/services/role-workspaces/secops-lead', desc: 'GhostRadar RF sonar, token isolation, and hardware vaults' },
      { title: 'Client Auditor Verification Portal', href: '/services/role-workspaces/client-auditor', desc: 'White-label SLA transparency and immutable audit proofs' },
    ],
  },
  {
    id: 'edge-hardware',
    name: 'Edge Hardware & BSP',
    icon: Cpu,
    tagline: 'ESP32 & Cyber-Physical Interlocks',
    items: [
      { title: 'ESP32 AetherPod DevKit V1', href: '/services/edge-hardware/aether-pod', desc: 'Dual-core 240MHz FreeRTOS firmware & MQTT v5 bus' },
      { title: 'Zero-Code 0x01-0x7F I2C Discovery', href: '/services/edge-hardware/sensor-integration', desc: 'Automatic plug-and-play identification of INA219, MPU6050' },
      { title: 'Micro-Jitter Noise Sampling', href: '/services/edge-hardware#noise', desc: 'Cold-boot SRAM & ADC bandgap entropy collection' },
      { title: 'Physical Relay Deadbolt Control', href: '/services/edge-hardware#relays', desc: 'GPIO 18 cooling fans and physical electronic deadbolts' },
    ],
  },
  {
    id: 'managed-advisory',
    name: 'Enterprise Advisory & SRE',
    icon: Wrench,
    tagline: 'AetherNexus Professional Services',
    items: [
      { title: 'Cyber-Physical System Architecture', href: '/services/managed-advisory/architecture-consulting', desc: 'Bespoke telemetry design, TimescaleDB, and MQTT broker sizing' },
      { title: 'Zero-Downtime Migration Services', href: '/services/managed-advisory/cloud-migration', desc: 'Migrate legacy monoliths to AetherNexus multi-tenant RLS' },
      { title: '24/7 Autonomous Mission Control', href: '/services/managed-advisory/managed-sre', desc: 'Guaranteed 99.99% SLAs with automated incident response' },
    ],
  },
];

export const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>('platform-core');

  const selectedCategory = SERVICES_CATEGORIES.find((c) => c.id === activeCategory) || SERVICES_CATEGORIES[0];

  return (
    <div 
      className="apple-glassdoor rounded-3xl border border-white/90 p-6 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      onMouseLeave={onClose}
    >
      {/* Top Banner inside Menu */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            AetherNexus Services & Enterprise Solutions
          </span>
          <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200">
            7 Bundles • 11 Verticals
          </span>
        </div>
        <Link
          href="/services"
          onClick={() => onClose()}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
        >
          <span>Explore Master Directory</span>
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
                className={`w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'hover:bg-white/80 text-slate-700 hover:text-slate-900'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{cat.name}</span>
                    {cat.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className={`text-[10px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
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
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>{selectedCategory.name}</span>
                <span className="text-[11px] font-normal text-slate-400">({selectedCategory.items.length} offerings)</span>
              </h4>
              <Link
                href={`/services/${selectedCategory.id}`}
                onClick={() => onClose()}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View Category Hub</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {selectedCategory.items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`group p-2.5 rounded-xl border transition-all text-left block ${
                    item.isHighlight 
                      ? 'bg-blue-50/70 border-blue-200/80 hover:bg-blue-50 hover:border-blue-300' 
                      : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      {item.isHighlight && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      <span className="truncate">{item.title}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Action Footer inside Mega-Menu */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between bg-slate-50/80 -mx-2 -mb-2 p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] text-slate-600">
                <span className="font-semibold text-slate-800">ISO/IEC 27001 & SOC 2 Type II</span> Certified Platform
              </div>
            </div>
            <Link
              href="/services/diagnostic-mri/universal-scanner"
              onClick={() => onClose()}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs"
            >
              Run Free 10-Probe Diagnostic MRI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

