'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, Activity, Shield, Cpu, RefreshCw, Layers, FileText, 
  ArrowRight, Search, CheckCircle2, ChevronRight, Sparkles, Filter, 
  ExternalLink, BarChart3, Bot, Lock, Wrench 
} from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { SERVICES_CATEGORIES } from '@/components/navigation/ServicesMegaMenu';
import { INDUSTRIES_LIST } from '@/components/IndustrySelector';
import { appleAudio } from '@/lib/audio';

export default function ServicesHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredCategories = SERVICES_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'ALL' && cat.id !== selectedCategory) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchCat = cat.name.toLowerCase().includes(query) || cat.tagline.toLowerCase().includes(query);
    const matchItems = cat.items.some(
      (item) => item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
    );
    return matchCat || matchItems;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900">
      {/* Top Navigation */}
      <GlobalHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-6 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
            <span>Autonomous Enterprise Cyber-Physical Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
            Comprehensive Services, AI Swarms & Diagnostic Capabilities
          </h1>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Eliminate enterprise tool sprawl and reactive downtime with sub-15ms self-healing failovers, 
            camera-free Wi-Fi RF physical security, and universal 10-probe cyber-physical diagnostic MRI audits.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/services/diagnostic-mri/universal-scanner"
              onClick={() => appleAudio.playClick()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Launch Live Diagnostic MRI</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => appleAudio.playClick()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-bold text-xs shadow-xs hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl apple-glass border border-slate-200/80 shadow-xs">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search services, failovers, probes, or verticals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/90 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all shadow-2xs"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => { appleAudio.playClick(); setSelectedCategory('ALL'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
              }`}
            >
              All Categories
            </button>
            {SERVICES_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => { appleAudio.playClick(); setSelectedCategory(c.id); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {c.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Wise Services Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="space-y-4">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-2xs border border-blue-200/80">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{cat.name}</h2>
                    <p className="text-xs text-slate-500">{cat.tagline}</p>
                  </div>
                </div>

                <Link
                  href={`/services/${cat.id}`}
                  onClick={() => appleAudio.playClick()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group"
                >
                  <span>Explore All {cat.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Offerings Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => appleAudio.playClick()}
                    className={`p-5 rounded-3xl apple-glassdoor border transition-all text-left flex flex-col justify-between group hover:scale-[1.01] hover:shadow-lg ${
                      item.isHighlight 
                        ? 'border-blue-300 bg-gradient-to-br from-blue-50/50 to-white' 
                        : 'border-white/80 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {item.isHighlight ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                            Flagship
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400">
                            Topic {idx + 1}
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-600">
                      <span>View Specifications</span>
                      <span className="text-blue-600 font-bold group-hover:underline">Learn more →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* 11 Industry Blueprints Interactive Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <div className="p-8 rounded-3xl apple-glass border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Tenant Architecture</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                11 Tailored Enterprise Industry Blueprints
              </h2>
              <p className="text-xs text-slate-500">
                Each organization receives isolated database schemas with PostgreSQL Row-Level Security (RLS) and domain-specific AI agents.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INDUSTRIES_LIST.map((ind) => (
              <div
                key={ind.id}
                className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{ind.name}</div>
                  <div className="text-[11px] text-blue-600 font-semibold mt-0.5">{ind.focus}</div>
                  <div className="text-[10px] text-slate-400 mt-2">
                    <span className="font-semibold text-slate-600">Enterprises:</span> {ind.targetOrgs}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    RLS Active
                  </span>
                  <Link
                    href={`/services/industry-solutions`}
                    onClick={() => appleAudio.playClick()}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                  >
                    <span>Blueprint</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cryptographic Compliance Banner */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-cyan-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Need Custom Industry Probes or Regulated Compliance?</h3>
              <p className="text-xs text-slate-400">
                AetherNexus OS complies with ISO/IEC 27001, SOC 2 Type II, and IEC 62443 industrial cybersecurity standards.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            onClick={() => appleAudio.playClick()}
            className="px-5 py-2.5 rounded-2xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 active:scale-95 transition-all shadow-md shrink-0"
          >
            Contact Systems Architect
          </Link>
        </div>
      </section>
    </div>
  );
}

