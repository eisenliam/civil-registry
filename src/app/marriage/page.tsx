import DashboardShell from '@/components/dashboard-shell';

export default function MarriageRecordsPage() {
  return (
    <DashboardShell title="Marriage Records" description="Browse recently registered marriage records.">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Marriage registry overview</p>
        <p className="mt-4 text-slate-600">
          This section will display marriage filings and certificates. Use Add Record to register a new marriage entry.
        </p>
      </div>
    </DashboardShell>
  );
}
