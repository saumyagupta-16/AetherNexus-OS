'use client';

import React, { useState } from 'react';
import { GitPullRequest, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

interface SelfMorphingProxyModalProps {
  onSimulateBreakage: () => Promise<any>;
}

export const SelfMorphingProxyModal: React.FC<SelfMorphingProxyModalProps> = ({ onSimulateBreakage }) => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const data = await onSimulateBreakage();
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <GitPullRequest className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Frontier Innovation #5: Self-Morphing API Proxy</h3>
            <p className="text-xs text-slate-500">Sub-15ms Dynamic AST Schema Translation & GitHub PR Bot</p>
          </div>
        </div>

        <button
          onClick={handleTest}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Simulate Breaking API 422
        </button>
      </div>

      {result ? (
        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Endpoint: /api/v2/orders</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Healed in {result.failover_latency_ms} ms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-white border border-rose-100 text-rose-700">
              <div className="font-sans font-bold text-slate-500 text-[10px] mb-1">INCOMING CLIENT PAYLOAD:</div>
              <pre>{JSON.stringify(result.original_payload, null, 2)}</pre>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-emerald-100 text-emerald-700">
              <div className="font-sans font-bold text-slate-500 text-[10px] mb-1">MORPHED BACKEND PAYLOAD:</div>
              <pre>{JSON.stringify(result.morphed_payload, null, 2)}</pre>
            </div>
          </div>

          {result.generated_pr && (
            <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-purple-900">GitHub PR #{result.generated_pr.pr_number}:</span>{' '}
                <span className="text-purple-700">{result.generated_pr.title}</span>
              </div>
              <span className="font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                ₹{result.generated_pr.revenue_saved_inr.toLocaleString()} Saved
              </span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          Click above to test how AetherNexus OS dynamically catches HTTP 422 schema errors and generates an automatic GitHub pull request without failing client requests.
        </p>
      )}
    </div>
  );
};

