import Home from '../page';

export function generateStaticParams() {
  return [
    { 'org-slug': 'qualimatrix-enterprise' },
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
  return <Home />;
}
