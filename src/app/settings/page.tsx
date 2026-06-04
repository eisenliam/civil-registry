import DashboardShell from '@/components/dashboard-shell';

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings" description="Configure your Civil Registry dashboard and user preferences.">
      <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
        <section>
          <h3 className="text-xl font-semibold text-slate-900">Workspace Settings</h3>
          <p className="mt-3 text-slate-600">
            Manage your registry workspace, preferences, and quick actions here. Future settings will include theme controls, notification preferences, and security options.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">Notifications</p>
            <p className="mt-2 text-sm text-slate-600">Receive alerts when new records are added or when critical registry actions require review.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">Privacy</p>
            <p className="mt-2 text-sm text-slate-600">Control who can access registry data and what is visible on the dashboard.</p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
