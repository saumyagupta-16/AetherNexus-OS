'use client';

import React from 'react';
import { FileCheck, ShieldCheck, Download, Award, CheckCircle2, Lock } from 'lucide-react';

interface ClientAuditorWorkspaceProps {
  onDownloadPdf: () => Promise<void>;
  healthScore?: number;
  grade?: string;
}

export const ClientAuditorWorkspace: React.FC<ClientAuditorWorkspaceProps> = ({
  onDownloadPdf,
  healthScore = 98.4,
  grade = 'A+',
}) => {
  return (
    <div className="space-y-4">
      {/* Top SLA Transparency Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client SLA Commitment</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">99.99%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Contractual uptime guaranteed</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Independent Audit Grade</div>
          <div className="text-2xl font-black text-purple-600 mt-1">{grade} ({healthScore}%)</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Zero critical vulnerabilities</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compliance Frameworks</div>
          <div className="text-2xl font-black text-blue-600 mt-1">SOC 2 / ISO</div>
          <div className="text-[11px] text-slate-500 mt-0.5">IEC 62443 Certified</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Audit Signature</div>
          <div className="text-2xl font-black text-slate-900 mt-1">SHA-256</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Cryptographically signed ledger</div>
        </div>
      </div>

      {/* White-Label Client Quality Certificate Box */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">White-Label Enterprise Quality & SLA Certificate</h3>
              <p className="text-xs text-slate-500">Autonomous continuous verification for enterprise stakeholder sign-off</p>
            </div>
          </div>

          <button
            onClick={onDownloadPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            Download Signed Audit Certificate (PDF)
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-600 font-medium">
            <span>Target Organization:</span>
            <span className="font-bold text-slate-900">Qualimatrix Technologies Enterprise</span>
          </div>
          <div className="flex justify-between items-center text-slate-600 font-medium">
            <span>Verification Standard:</span>
            <span className="font-bold text-slate-900">Universal Diagnostic Cyber-Physical MRI (10 Probes)</span>
          </div>
          <div className="flex justify-between items-center text-slate-600 font-medium">
            <span>Overall Security & Performance Score:</span>
            <span className="font-bold text-emerald-600">{healthScore}% (Grade {grade})</span>
          </div>
          <div className="flex justify-between items-center text-slate-600 font-medium pt-2 border-t border-slate-200/60 font-mono text-[11px]">
            <span>Tamper-Proof Merkle Root:</span>
            <code className="text-slate-500">0133f925c44298fc1c149afbf4c8996fb92427ae</code>
          </div>
        </div>
      </div>
    </div>
  );
};

