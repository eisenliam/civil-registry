"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AuthUser = {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'registrar' | 'clerk' | 'viewer';
};

type DashboardShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const navItems = [
  { href: '/add', label: 'Add Record', description: 'Start a new registry entry' },
  { href: '/birth', label: 'Birth', description: 'View birth registrations' },
  { href: '/death', label: 'Death', description: 'View death certificates' },
  { href: '/marriage', label: 'Marriage', description: 'View marriage records' },
  { href: '/settings', label: 'Settings', description: 'Manage application preferences' },
  { href: '/help', label: 'Help', description: 'Open the support panel' },
];

export default function DashboardShell({ title, description, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [helpOpen, setHelpOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setHelpOpen(pathname === '/help');
  }, [pathname]);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((response) => response.json())
      .then((data) => {
        if (data?.ok && data?.user) {
          setUser(data.user);
        }
      });
  }, []);

  const isActive = (href: string) => pathname === href;

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.assign('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-amber-100 bg-gradient-to-b from-white via-amber-50/20 to-slate-50/40 p-5 shadow-sm lg:w-80 lg:border-r lg:border-b-0">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Syne:wght@600;700;800&display=swap');
            .font-syne { font-family: 'Syne', sans-serif; }
            .font-barlow { font-family: 'Barlow Condensed', sans-serif; }
          `}</style>
          <div className="mb-8 flex items-center justify-between gap-3 pl-3 border-l-3 border-amber-400">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-600 font-syne font-800">Civil Registry</p>
              <h1 className="mt-2 text-3xl font-900 text-slate-900 font-barlow tracking-tight">Operations</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-2xl border pl-4 px-4 py-3 text-sm transition relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-l-2xl ${
                  isActive(item.href)
                    ? 'border-amber-300 bg-gradient-to-r from-amber-50/80 to-amber-50/30 text-slate-900 shadow-sm hover:shadow-md before:bg-amber-500'
                    : idx % 2 === 0
                    ? 'border-transparent text-slate-700 hover:border-amber-200 hover:bg-amber-50/20 before:bg-amber-300/30 group-hover:before:bg-amber-300'
                    : 'border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50/40 before:bg-slate-300/30 group-hover:before:bg-slate-300'
                }`}
              >
                <div className="font-bold font-syne">{item.label}</div>
                <p className="mt-1 text-xs text-slate-500">{item.description}</p>
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl bg-gradient-to-br from-amber-100/60 via-amber-50/40 to-orange-50/30 border border-amber-300/40 p-5 text-sm shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0 animate-pulse" />
              <div>
                <p className="font-bold text-slate-900 font-syne">Dashboard help</p>
                <p className="mt-2 text-slate-600 text-xs leading-relaxed">Use the sidebar to access registry sections and open help for quick guidance.</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 w-full rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-white to-amber-50/40 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-amber-100/40 hover:border-amber-500 hover:text-slate-900 hover:shadow-md"
          >
            Sign out
          </button>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Serif+Display:ital@0;1&family=Syne:wght@600;700;800&display=swap');
            .font-barlow  { font-family: 'Barlow Condensed', sans-serif; }
            .font-syne    { font-family: 'Syne', sans-serif; }
            .font-dm-serif { font-family: 'DM Serif Display', serif; }
          `}</style>
          <div className="mb-8 rounded-[2rem] bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm border border-slate-100">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-600 font-syne font-800 mb-3">Navigation</p>
                <h2 className="text-4xl font-900 text-slate-900 font-barlow uppercase leading-tight tracking-tight">{title}</h2>
                <p className="mt-3 text-sm text-slate-600 font-syne font-700">{description}</p>
              </div>
              <div className="inline-flex flex-col gap-3 rounded-2xl bg-white border border-amber-100 px-5 py-4 text-sm shadow-sm hover:shadow-md transition sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-syne font-800 text-xs uppercase tracking-wide text-slate-600">{user ? `Signed in as ${user.username}` : 'Loading user...'}</span>
                </div>
              </div>
            </div>
          </div>

          {children}
        </main>
      </div>

      {helpOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Help center</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Need support?</h3>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-6 text-slate-700">
              <p>The Civil Registry dashboard helps you manage records across birth, death, and marriage sections. Use the sidebar to jump to the registration type you need.</p>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">Quick tips</p>
                <ul className="mt-3 space-y-3 text-sm leading-6">
                  <li>• Select <strong>Add Record</strong> to start a new entry.</li>
                  <li>• Review counts on the dashboard for an overview of registered records.</li>
                  <li>• Use Settings to update your workspace preferences.</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">Support</p>
                <p className="mt-2 text-sm text-slate-600">If you need additional help, contact your system administrator or review the registry handbook.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
