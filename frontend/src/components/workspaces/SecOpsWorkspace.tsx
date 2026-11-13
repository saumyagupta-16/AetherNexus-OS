'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Fingerprint, Key, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const SecOpsWorkspace: React.FC = () => {
  const [vaultData, setVaultData] = useState({
    master_root_of_trust: 'HMAC-SHA256-PUF-HARDWARE-ROOT',
    pods: [
      {
        node_id: 'ESP32_MASTER_01',
        chip_family: 'ESP32-D0WDQ6 (Xtensa Dual-Core 240MHz)',
        mac_address: '30:AE:A4:05:D2:1C',
        silicon_dna_metrics: {
          adc_vref_jitter_uv: 14.2,
          clock_skew_ppm: -3.8,
          sram_cold_boot_entropy_hash: 'a4f89d02c51081b9e072b4c8',
          silicon_fingerprint_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        },
        anti_cloning_status: 'AUTHENTIC_PHYSICAL_SILICON',
        forged_requests_blocked_today: 14
      }
    ]
  });

  return (
    <div className="space-y-4">
      {/* Top Security Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">SiliconDNA PUF Status</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">AUTHENTIC</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Microscopic physical fingerprint</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">ADC Vref Micro-Jitter</div>
          <div className="text-2xl font-black text-slate-900 mt-1">14.2 μV</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Physical silicon thermal baseline</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Forged Attacks Blocked</div>
          <div className="text-2xl font-black text-blue-600 mt-1">14 Intercepted</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Postman / Python spoofing denied</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Physical Sonar State</div>
          <div className="text-2xl font-black text-purple-600 mt-1">100% GDPR</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Camera-free RF presence sensing</div>
        </div>
      </div>

      {/* SiliconDNA Biometric Passport Vault */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Fingerprint className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Frontier Innovation #3: SiliconDNA PUF Hardware Passport Vault</h3>
              <p className="text-xs text-slate-500">Unclonable microscopic silicon transistor threshold biometrics</p>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Zero-Trust Enforced
          </span>
        </div>

        {vaultData.pods.map((pod, i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{pod.node_id}</span>
                <span className="text-slate-400 font-mono">({pod.mac_address})</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-md font-bold bg-white text-emerald-700 border border-emerald-200 text-[10px]">
                {pod.anti_cloning_status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] font-sans font-bold">ADC BANDGAP JITTER:</span>
                <span className="text-slate-800 font-bold">{pod.silicon_dna_metrics.adc_vref_jitter_uv} μV RMS</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] font-sans font-bold">CLOCK OSCILLATOR SKEW:</span>
                <span className="text-slate-800 font-bold">{pod.silicon_dna_metrics.clock_skew_ppm} ppm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] font-sans font-bold">SRAM COLD-BOOT ENTROPY:</span>
                <span className="text-slate-800 font-bold truncate block">{pod.silicon_dna_metrics.sram_cold_boot_entropy_hash}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 font-mono text-[10px] text-slate-500 truncate">
              <span className="font-sans font-bold text-slate-400 mr-2">HMAC-SHA256 PASSPORT:</span>
              <code>{pod.silicon_dna_metrics.silicon_fingerprint_sha256}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
