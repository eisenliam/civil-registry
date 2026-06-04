import Link from 'next/link';
import DashboardShell from '@/components/dashboard-shell';
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
        .form-btn {
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .form-btn:hover {
          background-color: #f59e0b;
          transform: translateY(-1px);
        }
        .form-btn:active {
          transform: scale(0.97);
        }
      `}</style>

      <DashboardShell title="Add Record" description="Choose a record type and fill in the matching form.">
        <div className="flex flex-col gap-4">
          {recordTypes.map((record) => (
            <section
              key={record.href}
              className="record-card rounded-[2rem] bg-white shadow-sm px-8 py-6"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-syne text-[11px] font-semibold tracking-[.18em] uppercase text-amber-500">
                  {record.eyebrow}
                </span>
              </div>

              {/* Heading + Button row */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col">
                  <h3 className="font-barlow text-4xl font-black uppercase text-slate-900 leading-none">
                    {record.title}
                  </h3>
                  <span className="font-barlow text-4xl font-black uppercase leading-none shimmer-text">
                    Registration
                  </span>
                </div>

                <Link
                  href={record.href}
                  className="form-btn font-syne shrink-0 inline-flex items-center gap-2 bg-amber-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl"
                >
                  Open form
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          ))}
        </div>
      </DashboardShell>
    </>
  );
}