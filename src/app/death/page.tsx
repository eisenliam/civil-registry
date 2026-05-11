import DashboardShell from '@/components/dashboard-shell';

export default function DeathRecordsPage() {
  return (
    <DashboardShell title="Death Records" description="Browse recently registered death certificates.">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Death registry overview</p>
        <p className="mt-4 text-slate-600">
          This section will display death certificates recorded by the registry team. Use the Add Record page to file a new death registration.
        </p>
      </div>
    </DashboardShell>
  );
}
