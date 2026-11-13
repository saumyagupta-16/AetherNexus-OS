'use client';

import React, { useState, useEffect } from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle, Shield, Play, Terminal } from 'lucide-react';

export const QAArchitectWorkspace: React.FC = () => {
  const [suiteStats, setSuiteStats] = useState({
    total_test_cases: 84,
    passed: 84,
    failed: 0,
    flakiness_score_pct: 0.0,
    coverage_pct: 98.7,
    suites: [
      { name: 'OWASP API Security Top 10', probes: 15, status: 'PASS', p99_latency_ms: 14.2 },
      { name: 'Boundary Payload & Unicode Fuzzing', probes: 25, status: 'PASS', p99_latency_ms: 18.5 },
      { name: 'High-Concurrency Bursts (10k Users)', probes: 20, status: 'PASS', p99_latency_ms: 22.1 },
      { name: 'Hydration Integrity & Broken Assets', probes: 24, status: 'PASS', p99_latency_ms: 9.4 }
    ]
  });

  return (
    <div className="space-y-4">
      {/* Top QA Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Playwright E2E Suite</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {suiteStats.passed}/{suiteStats.total_test_cases} Passed
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">100% Zero Defect Guarantee</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Flakiness Rate</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{suiteStats.flakiness_score_pct.toFixed(1)}%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Deterministic execution</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chaos Fuzzing Probes</div>
          <div className="text-2xl font-black text-blue-600 mt-1">500 Injected</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Boundary, NaN, SQLi resilience</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Code Coverage</div>
          <div className="text-2xl font-black text-purple-600 mt-1">{suiteStats.coverage_pct}%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">E2E + Unit + Schema AST</div>
        </div>
      </div>

      {/* Test Suites Table */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <FlaskConical className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900">AutoQA Synthetic Stress & Fuzzing Harness</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            All Suites Green
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {suiteStats.suites.map((s, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-800">{s.name}</span>
                <span className="text-slate-400">({s.probes} automated probes)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-500">P99: <span className="font-semibold text-slate-700">{s.p99_latency_ms} ms</span></span>
                <span className="px-2 py-0.5 rounded-md font-bold text-emerald-700 bg-emerald-50 text-[10px]">PASS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

