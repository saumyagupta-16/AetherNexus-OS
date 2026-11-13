'use client';

import React from 'react';
import { Briefcase, FlaskConical, Cpu, ShieldCheck, FileCheck } from 'lucide-react';

export interface Role {
  id: string;
  title: string;
  iconName: string;
  focus: string;
}

export const ROLES: Role[] = [
  { id: 'CEO_ADMIN', title: 'CEO / Founder', iconName: 'Briefcase', focus: 'SLA Uptime %, ₹ Saved, FinOps Cost ROI' },
  { id: 'QA_ARCHITECT', title: 'QA / Test Architect', iconName: 'FlaskConical', focus: 'Chaos Fuzzing, API Matrix, Signed Audit PDF' },
  { id: 'IOT_ENGINEER', title: 'IoT / Hardware Lead', iconName: 'Cpu', focus: '50Hz Telemetry, I2C Discovery, Phantom ML Failover' },
  { id: 'SECOPS_LEAD', title: 'SecOps Officer', iconName: 'ShieldCheck', focus: 'GhostRadar Wi-Fi Sonar, SiliconDNA Vault' },
  { id: 'CLIENT_VIEWER', title: 'Client Auditor', iconName: 'FileCheck', focus: 'White-Label SLA Verification & Compliance Proof' },
];

interface RoleSwitcherProps {
  currentRole: string;
  onRoleChange: (roleId: string) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Briefcase': return <Briefcase className="w-4 h-4 mr-1.5" />;
      case 'FlaskConical': return <FlaskConical className="w-4 h-4 mr-1.5" />;
      case 'Cpu': return <Cpu className="w-4 h-4 mr-1.5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 mr-1.5" />;
      case 'FileCheck': return <FileCheck className="w-4 h-4 mr-1.5" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/90 shadow-xs">
      {ROLES.map((r) => {
        const isActive = currentRole === r.id;
        return (
          <button
            key={r.id}
            onClick={() => onRoleChange(r.id)}
            className={`flex items-center px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
              isActive ? 'apple-pill-active' : 'apple-pill-inactive'
            }`}
          >
            {getIcon(r.iconName)}
            {r.title}
          </button>
        );
      })}
    </div>
  );
};

