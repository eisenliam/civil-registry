import DashboardShell from '@/components/dashboard-shell';


export default function MarriageRecordsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Syne:wght@600;700;800&display=swap');
        .font-barlow { font-family: 'Barlow Condensed', sans-serif; }
        .font-syne   { font-family: 'Syne', sans-serif; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #f59e0b 0%, #fcd34d 40%, #f59e0b 60%, #d97706 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <DashboardShell title="Marriage Records" description="Browse recently registered marriage records.">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-syne text-[11px] font-semibold tracking-[.18em] uppercase text-amber-500">
              Marriage Registry
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-barlow text-5xl font-black uppercase text-slate-900 leading-none mb-1">
            Marriage
          </h2>
          <h2 className="font-barlow text-5xl font-black uppercase leading-none mb-4 shimmer-text">
            Records
          </h2>

          {/* Description */}
          <p className="font-syne text-sm text-slate-500 leading-relaxed max-w-md mb-8">
            This section will display marriage filings and certificates. Use Add Record to register a new marriage entry.
          </p>



        </div>
      </DashboardShell>
    </>
  );
}
