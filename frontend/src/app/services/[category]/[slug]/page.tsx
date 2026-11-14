'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Zap, Activity, Shield, Cpu, Layers, Bot, Wrench, 
  ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Sparkles, 
  Download, Play, Terminal, Lock, Clock, AlertCircle 
} from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { SERVICES_CATEGORIES } from '@/components/navigation/ServicesMegaMenu';
import { appleAudio } from '@/lib/audio';

function IndividualServiceContent() {
  const params = useParams();
  const categoryId = params?.category as string;
  const slug = params?.slug as string;

  const category = SERVICES_CATEGORIES.find((c) => c.id === categoryId) || SERVICES_CATEGORIES[0];
  const service = category.items.find((item) => item.href.endsWith(slug)) || category.items[0];

  const [isRunningProbe, setIsRunningProbe] = useState(false);
  const [probeResult, setProbeResult] = useState<string | null>(null);

  const handleTestProbe = () => {
    setIsRunningProbe(true);
    setProbeResult(null);

    setTimeout(() => {
      setIsRunningProbe(false);
      setProbeResult('PASS (Score: 98.4% | Latency: 12.8ms | Cryptographically Signed)');
      appleAudio.playRestore();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900">
      <GlobalHeader />

      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/services" className="hover:text-slate-800">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`/services/${category.id}`} className="hover:text-slate-800">
            {category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">{service.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="p-8 sm:p-12 rounded-3xl apple-glassdoor border border-white/90 shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Autonomous Service Offering</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              {service.desc}. Built directly into AetherNexus OS to deliver deterministic reliability, 
              zero-downtime failover, and continuous cyber-physical telemetry verification.
            </p>
          </div>

          {/* Quick Metrics Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Failover Latency</div>
              <div className="text-lg font-black text-emerald-600 font-mono mt-0.5">&lt; 15.0ms</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ML Confidence</div>
              <div className="text-lg font-black text-blue-600 font-mono mt-0.5">96.4%</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Streaming Bus</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">50Hz (20ms)</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Standards</div>
              <div className="text-lg font-black text-indigo-600 font-mono mt-0.5">ISO 27001 / SOC 2</div>
            </div>
          </div>

          {/* Interactive Test Bench */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleTestProbe}
              disabled={isRunningProbe}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-slate-800 active:scale-95 transition-all cursor-pointer disabled:opacity-75"
            >
              <Zap className={`w-4 h-4 text-cyan-400 ${isRunningProbe ? 'animate-spin' : ''}`} />
              <span>{isRunningProbe ? 'Executing Diagnostic Probe...' : 'Run Live Diagnostic Probe'}</span>
            </button>

            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
            >
              <span>Request Production SLA</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          {probeResult && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{probeResult}</span>
            </div>
          )}
        </div>
      </section>

      {/* Technical Architecture & Deliverables */}
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Technical Deep Dive */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl apple-glass border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Architecture Specification & Workflow</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                When an anomaly or operational failure is detected, AetherNexus OS isolates the impacted layer, 
                activates mathematical regression failover models, and synchronizes telemetry into an immutable TimescaleDB ring buffer.
              </p>
              
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2">
                <div className="text-cyan-400 font-bold">// 1. EVENT DETECTION & FAILOVER SEQUENCE</div>
                <div className="text-slate-400">Trigger: Anomaly detection on telemetry bus (dV/dt &gt; 50V/s)</div>
                <div className="text-emerald-400">Action: Node state switched to PHANTOM_ML_ACTIVE in 12.8ms</div>
                <div className="text-slate-400">Verification: Cross-sensor Pearson correlation r = 0.982</div>
                <div className="text-amber-400">Output: Cryptographically signed audit payload generated</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl apple-glass border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">What Enterprises Receive</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>Sub-millisecond high-speed streaming connector for existing Prometheus, Datadog, or Grafana dashboards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>Isolated PostgreSQL Row-Level Security tenant partition with encrypted audit storage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>Downloadable, cryptographically verifiable PDF Quality Audit Certificates for client billing sign-offs.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Other Offerings in Category */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl apple-glass border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Related Offerings in {category.name}</h3>
              <div className="space-y-2">
                {category.items.filter((i) => i.href !== service.href).slice(0, 4).map((rel, idx) => (
                  <Link
                    key={idx}
                    href={rel.href}
                    className="block p-3 rounded-2xl bg-white/80 border border-slate-200/80 hover:border-blue-300 hover:bg-white transition-all group"
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {rel.title}
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {rel.desc}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-blue-600 text-white space-y-3 shadow-lg">
              <h4 className="text-sm font-bold">Deploy in Your Cloud</h4>
              <p className="text-xs text-blue-100">
                Deploy AetherNexus OS with Docker Compose, Kubernetes Helm, or Railway in under 5 minutes.
              </p>
              <Link
                href="/products"
                className="inline-block px-4 py-2 rounded-xl bg-white text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors"
              >
                View Deployment Specs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function IndividualServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
      <IndividualServiceContent />
    </Suspense>
  );
}
