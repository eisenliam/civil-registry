import DashboardShell from '@/components/dashboard-shell';

export default function BirthRecordsPage() {
  return (
    <DashboardShell title="Birth Records" description="Browse recently registered birth certificates.">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Birth registry overview</p>
        <p className="mt-4 text-slate-600">
          This section will display births registered in the civil registry. Use the Add Record page to file a new birth certificate.
        </p>
      </div>
    </DashboardShell>
  );
}
