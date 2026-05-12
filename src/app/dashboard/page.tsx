import DashboardShell from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Serif+Display:ital@0;1&family=Syne:wght@600;700;800&display=swap');

        .font-barlow  { font-family: 'Barlow Condensed', sans-serif; }
        .font-syne    { font-family: 'Syne', sans-serif; }
        .font-dm-serif { font-family: 'DM Serif Display', serif; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #f59e0b 0%, #fcd34d 40%, #f59e0b 60%, #d97706 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .ticker-track { animation: ticker 22s linear infinite; }
      `}</style>

      <DashboardShell title="Dashboard" description="Overview of your Civil Registry workspace.">
        <div className="relative pl-6 max-w-2xl">

          {/* Accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-amber-300 to-transparent" />

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-syne text-[11px] font-700 tracking-[.18em] uppercase text-amber-500">
              Registry Portal
            </span>
          </div>

          {/* Heading */}
          <h3 className="font-barlow text-6xl font-900 text-slate-900 leading-none tracking-tight uppercase mb-1">
            Welcome to the
          </h3>
          <h3 className="font-barlow text-6xl font-900 leading-none tracking-tight uppercase mb-4 shimmer-text">
            Dashboard
          </h3>
          <p className="font-syne text-sm text-slate-500 leading-relaxed max-w-md mb-8">
            Use the sidebar to manage records, view registrations, and access help.
          </p>

          {/* ── SCROLLING TICKER ── */}
          <div className="w-full overflow-hidden rounded-2xl bg-slate-900 py-3 mb-6">
            <div className="ticker-track flex gap-0 whitespace-nowrap w-max">
              {[...Array(2)].map((_, rep) => (
                <span key={rep} className="flex items-center gap-6 pr-6">
                  {['Birth Certificate', 'Marriage Certificate', 'Death Certificate'].map((item) => (
                    <span key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span className="font-syne text-[11px] font-700 tracking-widest uppercase text-slate-300">{item}</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button variant="ghost" className="pl-0 text-amber-500 hover:text-amber-600 hover:bg-transparent font-syne font-700 text-[13px] gap-2 group">
            View all records
            <span className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Button>

        </div>
      </DashboardShell>
    </>
  );
}