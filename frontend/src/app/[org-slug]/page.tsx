import React from 'react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { EnterpriseCommandCenter } from '@/components/workspace/EnterpriseCommandCenter';

export function generateStaticParams() {
  return [
    { 'org-slug': 'aethernexus-enterprise' },
    { 'org-slug': 'siemens-iiot' },
    { 'org-slug': 'jio-telecom' },
    { 'org-slug': 'microsoft-cloud' },
  ];
}

export default async function TenantWorkspace({
  params,
}: {
  params: Promise<{ 'org-slug': string }>;
}) {
  const { 'org-slug': orgSlug } = await params;
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <GlobalHeader />
      <main className="max-w-7xl mx-auto px-6 pt-6">
        <EnterpriseCommandCenter />
      </main>
    </div>
  );
}
