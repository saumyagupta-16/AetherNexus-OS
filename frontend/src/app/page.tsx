'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, Activity, Shield, Cpu, Layers, Bot, Wrench, 
  ArrowRight, CheckCircle2, ChevronRight, Sparkles, Building, 
  Lock, RefreshCw, Radio, Terminal, Award, FileText, Server, 
  ExternalLink, ArrowUpRight, BarChart3, HelpCircle 
} from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { SERVICES_CATEGORIES } from '@/components/navigation/ServicesMegaMenu';
import { INDUSTRIES_LIST } from '@/components/IndustrySelector';
import { appleAudio } from '@/lib/audio';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'FAILOVER' | 'MRI' | 'RADAR' | 'PUF'>('FAILOVER');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Global Header */}
      <GlobalHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-20 px-6 sm:px-8 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/40 to-slate-100/50">
        
        {/* Subtle Ambient Radial Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-400/10 via-cyan-300/10 to-indigo-400/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/90 text-blue-700 text-xs font-bold shadow-2xs backdrop-blur-md animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AETHERNEXUS • ENTERPRISE OPERATING SYSTEM</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.12]">
            Autonomous Cyber-Physical <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Enterprise Operating System
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            AetherNexus OS eliminates enterprise tool fragmentation and reactive downtime. 
            Delivering sub-15ms mathematical failovers, camera-free Wi-Fi RF physical security, 
            and automated 10-probe cryptographic quality certification across 11 global enterprise verticals.
          </p>

          {/* Call-to-Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/services"
              onClick={() => appleAudio.playClick()}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all group"
            >
              <span>Explore All Services & Portfolios</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              onClick={() => appleAudio.playClick()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200/90 text-slate-800 font-bold text-sm shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all"
            >
              <span>Schedule Architecture Review</span>
            </Link>

            <Link
              href="/aethernexus-enterprise"
              onClick={() => appleAudio.playClick()}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200/80 font-bold text-sm hover:bg-blue-100 transition-all"
            >
              <Building className="w-4 h-4" />
              <span>Workspace Demo</span>
            </Link>
          </div>

          {/* High-Tech Interactive Preview Console */}
          <div className="pt-10 max-w-4xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl apple-glassdoor border border-white/90 shadow-2xl space-y-6 text-left">
              
              {/* Tab Navigation */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 overflow-x-auto">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Core Operational Pillars
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { appleAudio.playClick(); setActiveTab('FAILOVER'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'FAILOVER' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Sub-15ms ML Failover
                  </button>
                  <button
                    onClick={() => { appleAudio.playClick(); setActiveTab('MRI'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'MRI' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    10-Probe Diagnostic MRI
                  </button>
                  <button
                    onClick={() => { appleAudio.playClick(); setActiveTab('RADAR'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'RADAR' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    GhostRadar™ RF Sonar
                  </button>
                  <button
                    onClick={() => { appleAudio.playClick(); setActiveTab('PUF'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'PUF' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    SiliconDNA™ Biometrics
                  </button>
                </div>
              </div>

              {/* Dynamic Pillar Content */}
              {activeTab === 'FAILOVER' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Zero Hardware Downtime
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      MorphOS™ Phantom Sensor Synthesis
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      When a physical sensor line severs on an active turbine or conveyor belt, 
                      AetherNexus activates Scikit-Learn cross-sensor regression models in **12.8ms**, 
                      synthesizing virtual readings with **96.4% confidence** without halting assembly lines.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                      <div><span className="text-slate-400 block text-[10px]">Failover Window</span>&lt; 15.0ms</div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div><span className="text-slate-400 block text-[10px]">Correlation</span>Pearson r = 0.982</div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div><span className="text-slate-400 block text-[10px]">Bus Speed</span>50Hz Real-Time</div>
                    </div>
                  </div>
                  <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900 text-cyan-400 font-mono text-xs space-y-2 shadow-inner">
                    <div className="text-slate-400 font-bold">// REAL-TIME SYNTHESIS LOG</div>
                    <div className="text-rose-400">[00:12.41] GPIO 4 LINE CUT DETECTED</div>
                    <div className="text-amber-400">[00:12.42] PHANTOM_ML_ACTIVE (12.8ms)</div>
                    <div className="text-emerald-400">[00:12.43] SYNTHESIZED: 49.19 °C (CONF: 96.4%)</div>
                    <div className="text-slate-500">// ASSEMBLY LINE CONTINUITY PRESERVED</div>
                  </div>
                </div>
              )}

              {activeTab === 'MRI' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Cryptographic Assurance
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      Universal 10-Probe Diagnostic MRI
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Instant multi-tier cyber-physical inspection scanning latency TTFB, OWASP API security headers, 
                      boundary-value chaos fuzzing, ESP32 SRAM heap fragmentation, and I2C registers in under 5 seconds.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                      <div><span className="text-slate-400 block text-[10px]">Probe Depth</span>10 Probes (Cloud + Edge)</div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div><span className="text-slate-400 block text-[10px]">Health Scoring</span>0.0% to 100.0% (A+ to F)</div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div><span className="text-slate-400 block text-[10px]">Output</span>Signed PDF Certificate</div>
                    </div>
                  </div>
                  <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2 shadow-inner">
                    <div className="text-cyan-400 font-bold">// 10-PROBE DIAGNOSTIC SUMMARY</div>
                    <div className="text-emerald-400">✓ Probe 1: Sub-ms Latency TTFB (9.4ms)</div>
                    <div className="text-emerald-400">✓ Probe 2: OWASP Headers & TLS 1.3</div>
                    <div className="text-emerald-400">✓ Probe 3: Chaos Boundary Fuzzing (PASS)</div>
                    <div className="text-emerald-400">✓ Probe 8: I2C 0x01-0x7F Bus Auto-Discovery</div>
                    <div className="text-cyan-300 font-bold mt-2">COMPOSITE GRADE: A+ (SCORE: 98.4%)</div>
                  </div>
                </div>
              )}

              {activeTab === 'RADAR' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      100% GDPR & HIPAA Compliant
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      GhostRadar™ Camera-Free Wi-Fi RF Sonar
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Continuous physical perimeter security analyzing 50Hz electromagnetic multipath scattering variance (sigma^2). 
                      Detects human movement and server room tailgating through drywalls and enclosures without optical cameras.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                      <div><span className="text-slate-400 block text-[10px]">Frequency</span>50Hz Sampling</div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div><span className="text-slate-400 block text-[10px]">FFT Spectrum</span>0.5Hz - 2.5Hz (Human Gait)</div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div><span className="text-slate-400 block text-[10px]">Containment</span>GPIO Relay Deadbolt</div>
                    </div>
                  </div>
                  <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900 text-indigo-300 font-mono text-xs space-y-2 shadow-inner">
                    <div className="text-slate-400 font-bold">// RF MULTIPATH SCATTERING SCOPE</div>
                    <div className="text-slate-300">Ambient Baseline: σ² = 0.28 dBm (QUIET)</div>
                    <div className="text-rose-400">Event: Human Enters Blind Server Rack</div>
                    <div className="text-amber-300">Scattering Spike: σ² = 4.82 dBm</div>
                    <div className="text-emerald-400">Action: API Token Quarantine + Lock Deadbolt</div>
                  </div>
                </div>
              )}

              {activeTab === 'PUF' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      Hardware Root-of-Trust
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      SiliconDNA™ Hardware Biometric Passport
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Eliminate API token theft and counterfeit grey-market microcontrollers. 
                      Every device derives an unforgeable 256-bit cryptographic identity directly from transistor gate threshold jitter and SRAM cold-boot entropy.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                      <div><span className="text-slate-400 block text-[10px]">Entropy Source</span>Cold-Boot SRAM Jitter</div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div><span className="text-slate-400 block text-[10px]">Hash Length</span>256-Bit Cryptographic Vault</div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div><span className="text-slate-400 block text-[10px]">Protection</span>Anti-Clone & Anti-Replay</div>
                    </div>
                  </div>
                  <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900 text-amber-300 font-mono text-xs space-y-2 shadow-inner">
                    <div className="text-slate-400 font-bold">// SILICONDNA PUF BINDING VAULT</div>
                    <div className="text-slate-300">Target Node: ESP32_DEVKIT_V1</div>
                    <div className="text-amber-400">Gate Threshold Jitter: ±0.42 μV</div>
                    <div className="text-emerald-400">SRAM PUF Hash: 0x9E7F4A12B8C3D5E6...</div>
                    <div className="text-cyan-300">Status: HARDWARE BOUND (UNCLONABLE)</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & Impact Ribbon */}
      <section className="border-b border-slate-200/80 bg-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">&lt; 15.0ms</div>
            <div className="text-xs font-semibold text-slate-500">ML Failover Latency</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">96.4%</div>
            <div className="text-xs font-semibold text-slate-500">Cross-Sensor Correlation</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">100%</div>
            <div className="text-xs font-semibold text-slate-500">GDPR / HIPAA Compliant</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">11 Verticals</div>
            <div className="text-xs font-semibold text-slate-500">Enterprise Blueprints</div>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <div className="text-2xl sm:text-3xl font-black text-cyan-600 font-mono">Zero</div>
            <div className="text-xs font-semibold text-slate-500">Unplanned Line Halts</div>
          </div>
        </div>
      </section>

      {/* Services Portfolio Showcase (The 7 Flagship Bundles) */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Service Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            All Services Bundled Category-Wise
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Every service is tailored to deliver autonomous resilience, end-to-end telemetry verification, 
            and row-level tenant security across your cloud and edge ecosystems.
          </p>
        </div>

        {/* 7 Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="p-7 rounded-3xl apple-glassdoor border border-white/90 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-2xs border border-blue-200/80 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {cat.badge && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mt-1">
                    {cat.tagline}
                  </div>

                  <ul className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    {cat.items.slice(0, 3).map((item, iidx) => (
                      <li key={iidx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/services/${cat.id}`}
                    onClick={() => appleAudio.playClick()}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs transition-colors shadow-xs"
                  >
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enterprise Delivery Pipeline: How Organizations Onboard */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200/80">
        <div className="p-8 sm:p-12 rounded-3xl apple-glass border border-slate-200/90 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Onboarding Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How Enterprise Services & Workspaces Are Delivered
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              When an enterprise deploys AetherNexus OS, the system moves through a standardized 4-stage deployment pipeline with isolated tenant security.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">Architecture Assessment</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our systems engineering team analyzes your operational failure points and selects your target Industry Blueprint.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">Admin Workspace Creation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Admin provisions an isolated organization tenant (`/[org-slug]`) backed by PostgreSQL Row-Level Security (RLS).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">Zero-Code Plug & Play</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Microservices point to Self-Morphing API proxies and edge ESP32 pods auto-discover active I2C hardware buses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">Autonomous Operation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                24/7 continuous autonomous self-healing, sub-15ms ML failovers, and verifiable cryptographic PDF compliance audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 Industry Blueprints Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Engineered for 11 Enterprise Industry Verticals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            From Fortune 500 product software companies to semiconductor fabs and telecom carriers, 
            explore our tailored vertical blueprints.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {INDUSTRIES_LIST.map((ind) => (
            <Link
              key={ind.id}
              href={`/services/industry-solutions`}
              onClick={() => appleAudio.playClick()}
              className="p-4 rounded-2xl apple-glass border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {ind.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {ind.focus}
                </div>
              </div>
              <div className="mt-3 text-[10px] text-blue-600 font-bold flex items-center gap-1">
                <span>View Blueprint</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Enterprise Standards & Security Certification Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Shield className="w-4 h-4" />
              <span>Certified Architecture & Compliance Standards</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Compliant with ISO/IEC 27001, SOC 2 Type II & IEC 62443
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              All multi-tenant partitions operate under rigorous cryptographic Row-Level Security, 
              cold-boot SRAM silicon biometrics, and verifiable PDF audit certification seals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/about"
              onClick={() => appleAudio.playClick()}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              Compliance Details
            </Link>
            <Link
              href="/contact"
              onClick={() => appleAudio.playClick()}
              className="px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs transition-all shadow-md"
            >
              Request Enterprise Workspace
            </Link>
          </div>
        </div>
      </section>

      {/* Global High-Tech Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-14 px-6 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                Æ
              </div>
              <span className="font-bold text-slate-900 text-sm">AetherNexus OS</span>
            </div>
            <p className="text-slate-500 max-w-sm text-xs leading-relaxed">
              Multi-Tenant Autonomous Enterprise Operating System, Cyber-Physical Diagnostic MRI & Self-Healing Cloud Pod. 
              Engineered for mission-critical industrial infrastructure and the global B2B SaaS ecosystem.
            </p>
            <div className="text-[11px] text-slate-400">
              Architect: <span className="font-semibold text-slate-700">Saumya Gupta</span>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Services</div>
            <ul className="space-y-1.5">
              <li><Link href="/services/platform-core" className="hover:text-slate-800">Platform Core</Link></li>
              <li><Link href="/services/diagnostic-mri" className="hover:text-slate-800">Diagnostic MRI</Link></li>
              <li><Link href="/services/industry-solutions" className="hover:text-slate-800">Industry Blueprints</Link></li>
              <li><Link href="/services/autonomous-agents" className="hover:text-slate-800">AI Swarm Agents</Link></li>
              <li><Link href="/services/role-workspaces" className="hover:text-slate-800">Role Workspaces</Link></li>
            </ul>
          </div>

          {/* Products & Tech */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Products</div>
            <ul className="space-y-1.5">
              <li><Link href="/products" className="hover:text-slate-800">AetherNexus Cloud OS</Link></li>
              <li><Link href="/products" className="hover:text-slate-800">AetherPod ESP32 DevKit</Link></li>
              <li><Link href="/products" className="hover:text-slate-800">GhostRadar™ Sonar Pod</Link></li>
              <li><Link href="/products" className="hover:text-slate-800">SiliconDNA™ Vault</Link></li>
              <li><Link href="/products" className="hover:text-slate-800">Self-Morphing Proxy</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Company</div>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="hover:text-slate-800">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-slate-800">Engineering Blogs</Link></li>
              <li><Link href="/contact" className="hover:text-slate-800">Contact & Support</Link></li>
              <li><Link href="/profile" className="hover:text-slate-800">User Profile</Link></li>
              <li><Link href="/login" className="hover:text-slate-800">Admin Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 AetherNexus Systems. All rights reserved. Standards compliant with ISO/IEC 27001 & SOC 2 Type II.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">v1.0.4 Production Golden Master</span>
            <span>•</span>
            <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
              Request Enterprise SLA
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
