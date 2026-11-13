'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Zap, Activity, Shield, Cpu, Layers, Bot, Wrench, 
  ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Sparkles, Download, Play 
} from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { SERVICES_CATEGORIES } from '@/components/navigation/ServicesMegaMenu';
import { appleAudio } from '@/lib/audio';

function CategoryDetailContent() {
  const params = useParams();
  const categoryId = params?.category as string;

  const category = SERVICES_CATEGORIES.find((c) => c.id === categoryId) || SERVICES_CATEGORIES[0];
  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900">
      <GlobalHeader />

      {/* Category Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-6 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link
            href="/services"
            onClick={() => appleAudio.playClick()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Categories</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold">
                <Icon className="w-3.5 h-3.5" />
                <span>Service Category Specification</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                {category.name}
              </h1>
              <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                {category.tagline} — Enterprise-grade cyber-physical capabilities engineered for zero downtime, autonomous recovery, and verifiable quality.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/services/diagnostic-mri/universal-scanner"
                onClick={() => appleAudio.playClick()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-slate-800 active:scale-95 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Run 10-Probe MRI</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings in this Category */}
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Services & Offerings in this Category</h2>
            <p className="text-xs text-slate-500">Select any offering to inspect operational metrics, chaos failovers, and compliance proofs.</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {category.items.length} Offerings Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {category.items.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl apple-glassdoor border transition-all text-left flex flex-col justify-between hover:shadow-lg ${
                item.isHighlight
                  ? 'border-blue-300 bg-gradient-to-br from-blue-50/50 to-white'
                  : 'border-white/80 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    Topic 0{idx + 1}
                  </span>
                  {item.isHighlight && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      Flagship
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Target SLA:</span>
                  <span className="font-bold text-slate-800">99.99% Uptime</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Failover Speed:</span>
                  <span className="font-mono font-bold text-emerald-600">&lt; 15.0ms</span>
                </div>
                <Link
                  href={item.href}
                  onClick={() => appleAudio.playClick()}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition-colors"
                >
                  <span>Explore Service Specification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architectural Guarantee Box */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="p-6 rounded-3xl apple-glass border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Need Custom Implementation for {category.name}?</h4>
            <p className="text-xs text-slate-500">
              Our systems engineering team deploys containerized pods and writes custom probe logic for enterprise architectures.
            </p>
          </div>
          <Link
            href="/contact"
            onClick={() => appleAudio.playClick()}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shrink-0"
          >
            Request Custom POC
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function CategoryDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
      <CategoryDetailContent />
    </Suspense>
  );
}
