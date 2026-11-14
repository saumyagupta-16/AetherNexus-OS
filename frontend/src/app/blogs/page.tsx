'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight, Clock, User, Calendar, Sparkles, Tag } from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';

const ARTICLES = [
  {
    id: 'wifi-multipath-physics',
    title: 'Camera-Free Wi-Fi RF Sonar: The Physics of Multipath Scattering & Human Intrusion',
    snippet: 'How sampling 50Hz electromagnetic wave variance (sigma^2) enables continuous perimeter detection through walls and server racks without optical cameras.',
    author: 'Saumya Gupta',
    date: 'Nov 12, 2026',
    readTime: '6 min read',
    tag: 'RF Physics',
    href: '/blogs/wifi-multipath-physics',
  },
  {
    id: 'morphos-mathematical-derivation',
    title: 'Mathematical Derivation of Phantom Cross-Sensor Synthesis in Sub-15ms Failover',
    snippet: 'Replacing physical thermocouple line snaps using high-speed Pearson cross-sensor regression ensembles running on dual-core 240MHz microcontrollers.',
    author: 'Saumya Gupta',
    date: 'Nov 8, 2026',
    readTime: '8 min read',
    tag: 'Machine Learning',
    href: '/blogs/morphos-mathematical-derivation',
  },
  {
    id: 'zero-code-i2c-discovery',
    title: 'Zero-Code 0x01 to 0x7F I2C Bus Auto-Discovery for High-Reliability PLCs',
    snippet: 'Automatic hardware register reconnaissance protocols preventing assembly line stops when new sensors are plugged into active industrial systems.',
    author: 'Saumya Gupta',
    date: 'Nov 2, 2026',
    readTime: '5 min read',
    tag: 'Embedded Firmware',
    href: '/blogs/zero-code-i2c-discovery',
  },
  {
    id: 'finops-zombie-cloud-waste',
    title: 'FinOps Autonomous Cost Reduction: Cutting 35% of Cloud Waste in 24 Hours',
    snippet: 'How the AetherNexus FinOps agent identifies orphaned EBS snapshots, idle Kubernetes pods, and unattached static IPs to save thousands in monthly cloud bills.',
    author: 'Saumya Gupta',
    date: 'Oct 28, 2026',
    readTime: '7 min read',
    tag: 'Cloud & FinOps',
    href: '/blogs/finops-zombie-cloud-waste',
  },
  {
    id: 'silicondna-puf-entropy',
    title: 'SiliconDNA PUF: Deriving Unclonable Biometrics from Cold-Boot SRAM Jitter',
    snippet: 'Eliminating hardware cloning and stolen API keys by binding authentication tokens to microscopic transistor gate threshold imperfections.',
    author: 'Saumya Gupta',
    date: 'Oct 22, 2026',
    readTime: '10 min read',
    tag: 'Cybersecurity',
    href: '/blogs/silicondna-puf-entropy',
  },
];

export default function BlogsPage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const tags = ['ALL', 'RF Physics', 'Machine Learning', 'Embedded Firmware', 'Cloud & FinOps', 'Cybersecurity'];

  const filtered = ARTICLES.filter((a) => {
    if (selectedTag !== 'ALL' && a.tag !== selectedTag) return false;
    if (!search) return true;
    return a.title.toLowerCase().includes(search.toLowerCase()) || a.snippet.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900">
      <GlobalHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 px-6 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>Engineering Insights & Architectural Whitepapers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto">
            Deep-Tech Engineering, RF Physics & Cyber-Physical Resiliency
          </h1>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Technical deep-dives written by systems architects on self-healing ML models, 
            zero-code hardware discovery, and camera-free RF security.
          </p>
        </div>
      </section>

      {/* Search and Tags */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl apple-glass border border-slate-200/80 shadow-xs">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search engineering articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/90 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTag === t
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="p-6 rounded-3xl apple-glassdoor border border-white/90 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {art.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-3">
                  {art.snippet}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{art.author}</span>
                </div>
                <Link
                  href={art.href}
                  className="font-bold text-blue-600 hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

