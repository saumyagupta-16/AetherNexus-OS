'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Award, CheckCircle2, ArrowRight, 
  Layers, Users, Sparkles, Building, Lock, Cpu, Globe 
} from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { appleAudio } from '@/lib/audio';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900">
      <GlobalHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 px-6 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Building className="w-3.5 h-3.5 text-blue-500" />
            <span>AetherNexus Systems & Enterprise Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto">
            Architecting the Future of Autonomous Cyber-Physical Systems
          </h1>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            AetherNexus OS was designed to eliminate the multi-billion dollar enterprise dilemma of 
            tool fragmentation and reactive blindness across global cloud software and physical industrial hardware.
          </p>
        </div>
      </section>

      {/* Leadership & Architectural Vision */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="p-8 rounded-3xl apple-glassdoor border border-white/90 shadow-xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Architectural Leadership</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Authored & Engineered by Saumya Gupta
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designed as a unified operating system that fuses high-precision 50Hz telemetry, 
              zero-code hardware machine learning failovers, camera-free RF Doppler security, 
              and universal 10-probe diagnostic MRI audits into a single glass canvas.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Market</span>
                <span>Global B2B SaaS & IIoT</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Release</span>
                <span>v1.0.4 Golden Master</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Core SLA</span>
                <span className="text-emerald-600 font-bold">&lt; 15.0ms Failover</span>
              </div>
            </div>
          </div>

          {/* Compliance & Standards Grid */}
          <div className="p-8 rounded-3xl apple-glass border border-slate-200/90 shadow-xs space-y-5">
            <h3 className="text-lg font-bold text-slate-900">Enterprise Standards & Security Compliance</h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">ISO/IEC 27001 Certified Architecture</div>
                  <div className="text-[11px] text-slate-500">Rigorous information security management across multi-tenant schemas.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">SOC 2 Type II Audited Verification</div>
                  <div className="text-[11px] text-slate-500">Continuous availability, confidentiality, and automated signed audit reports.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">IEC 62443 Industrial Cybersecurity</div>
                  <div className="text-[11px] text-slate-500">Hardware-level immunity against tampering, line cuts, and sensor spoofing.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">MQTT v5.0 High-Speed Telemetry</div>
                  <div className="text-[11px] text-slate-500">Standardized pub/sub QoS 1 delivery across edge ESP32 pods and cloud brokers.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

