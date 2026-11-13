'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Cpu, Radio, Shield, Zap, RefreshCw, CheckCircle2, 
  ArrowRight, Download, Server, Sparkles, Terminal 
} from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { appleAudio } from '@/lib/audio';

const PRODUCTS = [
  {
    id: 'aethernexus-cloud-os',
    name: 'AetherNexus Cloud OS',
    badge: 'Enterprise Platform',
    icon: Server,
    tagline: 'Multi-Tenant Autonomous Cyber-Physical Operating System',
    description: 'High-availability FastAPI AsyncIO engine with 50Hz WebSocket telemetry bus, TimescaleDB hypertable storage, and Scikit-Learn regression failover.',
    specs: ['Docker Compose & K8s Ready', 'PostgreSQL Row-Level Security', 'TimescaleDB Hypertable Partitioning', 'MQTT v5.0 Broker Integration'],
    ctaText: 'Deploy Cluster',
    href: '/#deploy',
  },
  {
    id: 'aetherpod-devkit',
    name: 'AetherPod ESP32 DevKit V1',
    badge: 'Hardware Pod',
    icon: Cpu,
    tagline: '240MHz Cyber-Physical Edge Hardware Diagnostic Probe',
    description: 'Physical edge pod running FreeRTOS with DS18B20 1-wire temperature probe, INA219 current sensor, MPU6050 accelerometer, and cooling relay deadbolt actuation.',
    specs: ['240MHz Dual-Core Xtensa LX6', '1-Wire & 0x01-0x7F I2C Discovery', 'Sub-Microvolt ADC Bandgap Noise', 'Relay Deadbolt Interlock'],
    ctaText: 'Firmware Schematic',
    href: '/services/edge-hardware/aether-pod',
  },
  {
    id: 'ghostradar-sonar',
    name: 'GhostRadar™ RF Sonar Pod',
    badge: 'Perimeter Security',
    icon: Radio,
    tagline: 'Camera-Free Wi-Fi RF Doppler Intrusion Detection',
    description: 'Autonomous cyber-physical security detector analyzing 50Hz electromagnetic multipath scattering variance (sigma^2) through walls and enclosures without cameras.',
    specs: ['100% GDPR & HIPAA Compliant', '50Hz RF Variance Sampling', 'Fast Fourier Gait Transform (0.5-2.5Hz)', 'Automatic Token Lockdown Relay'],
    ctaText: 'Explore RF Physics',
    href: '/services/platform-core/ghost-radar-sonar',
  },
  {
    id: 'silicondna-vault',
    name: 'SiliconDNA™ Hardware Vault',
    badge: 'Hardware Biometrics',
    icon: Shield,
    tagline: 'Physical Unclonable Function (PUF) Device Passport',
    description: 'Unclonable 256-bit cryptographic identity derived from microscopic transistor threshold micro-jitter and cold-boot SRAM entropy.',
    specs: ['Cold-Boot SRAM Entropy Analysis', 'ADC Reference Voltage Jitter', 'Grey-Market Chip Rejection', 'Zero-Trust Token Cryptographic Binding'],
    ctaText: 'View PUF Architecture',
    href: '/services/platform-core/silicon-dna-puf',
  },
  {
    id: 'self-morphing-proxy',
    name: 'Self-Morphing API Gateway',
    badge: 'Cloud Resilience',
    icon: RefreshCw,
    tagline: 'Autonomous AST Payload Rewriting & Pull Request Generator',
    description: 'Dynamic proxy gateway that catches HTTP 422/500 schema breakages in sub-2ms, rewrites JSON payloads, and automatically opens GitHub Pull Requests.',
    specs: ['Sub-2ms AST Bytecode Mutation', 'OpenAPI 3.1 Dynamic Contract Diff', 'Automated GitHub PR Generator', 'Redis Translation Cache Layer'],
    ctaText: 'Inspect Proxy Spec',
    href: '/services/platform-core/self-morphing-api-proxy',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900">
      <GlobalHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 px-6 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Hardware Pods & Cloud Software Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto">
            Cyber-Physical Products Built for Autonomous Enterprise Operations
          </h1>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            From 240MHz ESP32 edge diagnostic probes to multi-tenant cloud operating systems, 
            explore our integrated hardware and software product portfolio.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.id}
                className="p-8 rounded-3xl apple-glassdoor border border-white/90 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-2xs border border-blue-200/80 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {prod.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {prod.name}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mt-1">
                    {prod.tagline}
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Specifications</div>
                    {prod.specs.map((spec, sidx) => (
                      <div key={sidx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    href={prod.href}
                    onClick={() => appleAudio.playClick()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs transition-colors shadow-xs"
                  >
                    <span>{prod.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

