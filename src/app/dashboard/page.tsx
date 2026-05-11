import DashboardShell from '@/components/dashboard-shell';

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard" description="Overview of your Civil Registry workspace.">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Welcome to the dashboard</h3>
        <p className="mt-3 text-sm text-slate-600">
          Use the sidebar to manage records, view registrations, and access help.
        </p>
      </div>
    </DashboardShell>
  );
}
