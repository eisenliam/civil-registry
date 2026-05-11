import Link from 'next/link';
import DashboardShell from '@/components/dashboard-shell';

const recordTypes = [
  {
    href: '/add/birth',
    title: 'Birth Registration',
    description: 'Register a newborn and capture required details for a birth certificate.',
    button: 'Open birth form',
  },
  {
    href: '/add/death',
    title: 'Death Registration',
    description: 'Create a death certificate record for compliance and archival.',
    button: 'Open death form',
  },
  {
    href: '/add/marriage',
    title: 'Marriage Registration',
    description: 'Capture marriage details and issue certified registry documentation.',
    button: 'Open marriage form',
  },
];

export default function AddRecordPage() {
  return (
    <DashboardShell title="Add Record" description="Choose a record type and fill in the matching form.">
      <div className="grid gap-6 lg:grid-cols-3">
        {recordTypes.map((record) => (
          <section key={record.href} className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">{record.title}</h3>
            <p className="mt-3 text-sm text-slate-600">{record.description}</p>
            <Link
              href={record.href}
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              {record.button}
            </Link>
          </section>
        ))}
      </div>
    </DashboardShell>
  );
}
