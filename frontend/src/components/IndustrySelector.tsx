'use client';

import React from 'react';
import { Layers, ChevronDown } from 'lucide-react';

export interface Industry {
  id: string;
  name: string;
  focus: string;
  targetOrgs: string;
}

export const INDUSTRIES_LIST: Industry[] = [
  { id: 'IT_PRODUCT', name: 'Product Software', focus: 'API Breaking Changes & Self-Morphing AST', targetOrgs: 'Microsoft, Adobe, Oracle' },
  { id: 'IT_SERVICE', name: 'Service IT & QA', focus: 'Multi-Client AutoQA & Signed Audit PDF', targetOrgs: 'TCS, Infosys, Global SIs' },
  { id: 'SAAS', name: 'SaaS Platforms', focus: 'Webhook Drops & Per-Tenant Latency', targetOrgs: 'Salesforce, Slack, Zoom' },
  { id: 'IIOT', name: 'Industrial IoT & Turbines', focus: 'Broken Wire Halt & MorphOS Phantom ML', targetOrgs: 'Siemens, Bosch, ABB' },
  { id: 'CONSUMER_IOT', name: 'Consumer Wearables', focus: 'Wi-Fi Drops, Heap Leaks & OTA Healer', targetOrgs: 'Ring, Fitbit, Apple HomeKit' },
  { id: 'IOT_PLATFORM', name: 'MQTT Connectivity', focus: 'Broker Message Storms & QoS Shaper', targetOrgs: 'AWS IoT Core, Cisco Jasper' },
  { id: 'SEMICONDUCTOR', name: 'Semiconductor Validation', focus: 'Silicon Cloning & SiliconDNA PUF', targetOrgs: 'NVIDIA, Qualcomm, Intel' },
  { id: 'CLOUD_IAAS', name: 'Cloud Infrastructure', focus: 'Zombie Cloud Waste & FinOps Terminator', targetOrgs: 'AWS, GCP, Azure, Hetzner' },
  { id: 'CYBERSECURITY', name: 'Cybersecurity & SecOps', focus: 'Camera-Free Blind Intrusion & GhostRadar', targetOrgs: 'CrowdStrike, Cloudflare' },
  { id: 'AI_DATA', name: 'AI & LLM Ops', focus: 'HTTP 429 Rate Limits & Neural Multi-Router', targetOrgs: 'OpenAI, Anthropic, Databricks' },
  { id: 'TELECOM', name: 'Telecom Carriers', focus: 'Tower Battery Theft & Autonomous BGP', targetOrgs: 'Jio, Bharti Airtel, Verizon' },
];

interface IndustrySelectorProps {
  currentIndustry: string;
  onSelectIndustry: (indId: string) => void;
}

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({ currentIndustry, onSelectIndustry }) => {
  const selected = INDUSTRIES_LIST.find((i) => i.id === currentIndustry) || INDUSTRIES_LIST[3];

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <Layers className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={currentIndustry}
          onChange={(e) => onSelectIndustry(e.target.value)}
          className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-4"
        >
          {INDUSTRIES_LIST.map((ind) => (
            <option key={ind.id} value={ind.id} className="text-slate-800">
              {ind.name} ({ind.focus})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

