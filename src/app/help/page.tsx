import DashboardShell from '@/components/dashboard-shell';

export default function HelpPage() {
  return (
    <DashboardShell title="Help" description="Open the help modal for guidance about the Civil Registry app.">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Help and support</p>
        <p className="mt-4 text-slate-600">
          The Help panel can be opened from the sidebar or directly visited here. It includes quick instructions for working with birth, death, and marriage records.
        </p>
      </div>
    </DashboardShell>
  );
}
