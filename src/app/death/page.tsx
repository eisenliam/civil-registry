import DashboardShell from '@/components/dashboard-shell';

export default function DeathRecordsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Serif+Display:ital@0;1&family=Syne:wght@600;700;800&display=swap');

        .font-barlow  { font-family: 'Barlow Condensed', sans-serif; }
        .font-syne    { font-family: 'Syne', sans-serif; }
        .font-dm-serif { font-family: 'DM Serif Display', serif; }
      `}</style>

      <DashboardShell title="Death Records" description="Browse recently registered death certificates.">
        <div className="relative pl-6 max-w-2xl">

          {/* Accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-amber-300 to-transparent" />

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-syne text-[11px] font-700 tracking-[.18em] uppercase text-amber-500">
              Death Registry
            </span>
          </div>

          {/* Heading */}
          <h3 className="font-barlow text-5xl font-900 text-slate-900 leading-none tracking-tight uppercase mb-4">
            Death Certificates
          </h3>
          <p className="font-syne text-sm text-slate-500 leading-relaxed max-w-lg mb-8">
            This section displays death certificates recorded by the registry team. Use the Add Record page to file a new death registration.
          </p>

          {/* Content Box */}
          <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 p-8 shadow-sm">
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-syne text-xs uppercase tracking-[0.2em] text-amber-600 font-700 mb-3">Overview</p>
                <p className="text-slate-600 leading-relaxed">
                  Death records are an essential part of the civil registry. They contain vital information about registered deaths including date, location, and personal details of the deceased.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white border border-slate-200 p-4">
                  <p className="font-syne text-2xl font-700 text-amber-600">—</p>
                  <p className="font-syne text-xs uppercase tracking-wide text-slate-500 mt-2">Total Records</p>
                </div>
                <div className="rounded-lg bg-white border border-slate-200 p-4">
                  <p className="font-syne text-2xl font-700 text-amber-600">—</p>
                  <p className="font-syne text-xs uppercase tracking-wide text-slate-500 mt-2">This Month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
    </>
  );
}
