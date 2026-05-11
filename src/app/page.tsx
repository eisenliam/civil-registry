import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="bg-primary text-white py-10 shadow-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-100">Civil Registry</p>
            <h1 className="mt-2 text-5xl font-bold tracking-tight">Philippine Civil Registry</h1>
            <p className="mt-3 max-w-2xl text-sm text-orange-100 sm:text-base">
              A clean Next.js 15 app shell for managing birth, death, and marriage records with Supabase, Tailwind CSS, and iron-session.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-orange-50"
            >
              Project Setup
            </Link>
            <Link
              href="#next-steps"
              className="inline-flex items-center justify-center rounded-full border border-white/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Next Steps
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section id="features" className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-secondary">App Foundation</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Next.js 15 application structure with a global layout, font loading, and Tailwind CSS configuration. This is the starting point for the Civil Registry app.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-secondary">Supabase Ready</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Supabase client files are in place and ready to connect to your database. The app has the right packages installed for Supabase and future record operations.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-secondary">No Image Upload</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              This app intentionally avoids image upload or storage features. The UI and database flow will focus on document data only.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-orange-200 bg-orange-50 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary">Project Status</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Completed</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>Next.js 15 + TypeScript app shell</li>
                <li>Tailwind CSS configured</li>
                <li>Supabase client files created</li>
                <li>Brand palette and layout established</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Ready for Part 2</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>Database schema for birth, death, marriage records</li>
                <li>Authentication flow with hardcoded accounts</li>
                <li>Dashboard and sidebar UI</li>
                <li>Record add/search pages</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="next-steps" className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary">Next Steps</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <p>
              You are on Part 1. The next phase is to implement the database schema and authentication before building the dashboard and record pages.
            </p>
            <p>
              If you want, I can continue with Part 2 now and create the Supabase SQL schema for the three registry tables.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-white py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-white/90">
          <p>© 2026 Civil Registry. Built with Next.js, Tailwind CSS, Supabase, and iron-session.</p>
        </div>
      </footer>
    </div>
  );
}
