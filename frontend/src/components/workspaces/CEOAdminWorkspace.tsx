'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, IndianRupee, ShieldCheck, Server, AlertCircle } from 'lucide-react';

export const CEOAdminWorkspace: React.FC = () => {
  const [finopsData, setFinopsData] = useState({
    monthly_cloud_waste_prevented_inr: 142000.0,
    waste_reduction_efficiency_pct: 36.4,
    terminated_zombie_resources: [
      { provider: 'AWS', resource: '14 Unattached gp3 EBS Volumes', monthly_savings_inr: 38400.0, action: 'AUTO_SNAPSHOT_AND_TERMINATE' },
      { provider: 'AWS', resource: '8 Staging EC2 Instances (<3% CPU for 5 days)', monthly_savings_inr: 54200.0, action: 'HIBERNATE_OFF_HOURS' },
      { provider: 'GCP', resource: 'Over-provisioned 16-node GKE Node Pool', monthly_savings_inr: 32800.0, action: 'DOWNSCALE_TO_4_NODES' },
      { provider: 'Azure', resource: '5 Orphaned Public Static IP Addresses', monthly_savings_inr: 16600.0, action: 'RELEASED_TO_POOL' }
    ]
  });

  return (
    <div className="space-y-4">
      {/* Top CEO KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enterprise SLA Uptime</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">100.00%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">0 unplanned customer outages</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly FinOps Savings</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₹{finopsData.monthly_cloud_waste_prevented_inr.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            +{finopsData.waste_reduction_efficiency_pct}% cloud efficiency
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Fleet Pods</div>
          <div className="text-2xl font-black text-blue-600 mt-1">50 Nodes</div>
          <div className="text-[11px] text-slate-500 mt-0.5">11 Global industry verticals</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Board Quality Rating</div>
          <div className="text-2xl font-black text-purple-600 mt-1">A+ Grade</div>
          <div className="text-[11px] text-slate-500 mt-0.5">ISO 27001 & IEC 62443 Certified</div>
        </div>
      </div>

      {/* FinOps Cloud Waste Terminator Ledger */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <TrendingUp className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Autonomous FinOps Cloud Cost Terminator</h3>
              <p className="text-xs text-slate-500">Real-time reclamation of orphaned cloud infrastructure & zombie clusters</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            ₹1,42,000 Saved / mo
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {finopsData.terminated_zombie_resources.map((item, idx) => (
            <div key={idx} className="py-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-slate-100 text-slate-700">
                  {item.provider}
                </span>
                <span className="font-semibold text-slate-800">{item.resource}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-emerald-600">₹{item.monthly_savings_inr.toLocaleString()} / mo</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                  {item.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
