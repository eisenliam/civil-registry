"use client";

import { useState } from 'react';
import DashboardShell from '@/components/dashboard-shell';

export default function AddBirthRecordPage() {
  const [form, setForm] = useState({
    registryNumber: '',
    registrationDate: '',
    childName: '',
    childSex: '',
    dateOfBirth: '',
    placeOfBirth: '',
    fatherName: '',
    fatherAge: '',
    fatherBirthplace: '',
    fatherCitizenship: '',
    motherName: '',
    motherAge: '',
    motherBirthplace: '',
    motherCitizenship: '',
    informantName: '',
    informantRelationship: '',
    informantAddress: '',
    attendantName: '',
    attendantDesignation: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const response = await fetch('/api/records/birth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data?.error ?? 'Failed to save birth record');
      return;
    }

    setMessage('Birth record saved successfully.');
    setForm({
      registryNumber: '',
      registrationDate: '',
      childName: '',
      childSex: '',
      dateOfBirth: '',
      placeOfBirth: '',
      fatherName: '',
      fatherAge: '',
      fatherBirthplace: '',
      fatherCitizenship: '',
      motherName: '',
      motherAge: '',
      motherBirthplace: '',
      motherCitizenship: '',
      informantName: '',
      informantRelationship: '',
      informantAddress: '',
      attendantName: '',
      attendantDesignation: '',
    });
  }

  return (
    <DashboardShell title="Birth Registration" description="Form 1A - Enter all required information for a new birth record.">
      <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
        {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 font-semibold">{message}</p>}
        {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 font-semibold">{error}</p>}

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Birth Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Registry Number *</span>
              <input name="registryNumber" value={form.registryNumber} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="BR-2026-0001" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Registration Date *</span>
              <input name="registrationDate" type="date" value={form.registrationDate} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Child's Name *</span>
              <input name="childName" value={form.childName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Sex *</span>
              <select name="childSex" value={form.childSex} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required>
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Date of Birth *</span>
              <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Place of Birth *</span>
              <input name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Hospital, city, or municipality" required />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Father's Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Father's Name</span>
              <input name="fatherName" value={form.fatherName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Father's Age</span>
              <input name="fatherAge" type="number" value={form.fatherAge} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Age" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Father's Birthplace</span>
              <input name="fatherBirthplace" value={form.fatherBirthplace} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="City or municipality" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Father's Citizenship</span>
              <input name="fatherCitizenship" value={form.fatherCitizenship} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Citizenship" />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Mother's Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mother's Name</span>
              <input name="motherName" value={form.motherName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mother's Age</span>
              <input name="motherAge" type="number" value={form.motherAge} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Age" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mother's Birthplace</span>
              <input name="motherBirthplace" value={form.motherBirthplace} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="City or municipality" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mother's Citizenship</span>
              <input name="motherCitizenship" value={form.motherCitizenship} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Citizenship" />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Informant & Attendant Information</h3>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Informant's Name</span>
            <input name="informantName" value={form.informantName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" />
          </label>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Relationship to Child</span>
              <input name="informantRelationship" value={form.informantRelationship} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Mother, Father, Etc." />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Informant's Address</span>
              <input name="informantAddress" value={form.informantAddress} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Complete address" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Attendant's Name</span>
              <input name="attendantName" value={form.attendantName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Doctor, midwife, Etc." />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Attendant's Designation</span>
              <input name="attendantDesignation" value={form.attendantDesignation} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Medical professional title" />
            </label>
          </div>
        </section>

        <div className="flex gap-3 border-t border-slate-200 pt-6">
          <button type="submit" disabled={loading} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-70">
            {loading ? 'Saving...' : 'Save birth record'}
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}
