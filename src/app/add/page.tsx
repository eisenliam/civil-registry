import Link from 'next/link';
import DashboardShell from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const recordTypes = [
  { href: '/add/birth',    title: 'Birth',    eyebrow: 'Birth Registry'    },
  { href: '/add/death',    title: 'Death',    eyebrow: 'Death Registry'    },
  { href: '/add/marriage', title: 'Marriage', eyebrow: 'Marriage Registry' },
];

export default function AddRecordPage() {
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
        .record-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .record-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px -8px rgba(0,0,0,0.07);
        }
      `}</style>

      <DashboardShell title="Add Record" description="Choose a record type and fill in the matching form.">
        <div className="flex flex-col gap-6">
          {recordTypes.map((record) => (
            <div key={record.href} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-syne text-[11px] font-semibold tracking-[.18em] uppercase text-amber-500">
                  {record.eyebrow}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <h3 className="font-barlow text-4xl font-black uppercase text-slate-900 leading-none">
                    {record.title}
                  </h3>
                  <span className="font-barlow text-4xl font-black uppercase leading-none shimmer-text">
                    Registration
                  </span>
                </div>
                <Link href={record.href}>
                  <Button
                    variant="ghost"
                    className="font-syne shrink-0 pl-0 text-amber-500 hover:text-amber-600 hover:bg-transparent font-bold text-[13px] gap-2 group"
                  >
                    <span className="flex items-center gap-2">
                      Open form
                      <span className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </DashboardShell>
    </>
  );
}