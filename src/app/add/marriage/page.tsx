"use client";

import { useState } from 'react';
import DashboardShell from '@/components/dashboard-shell';

export default function AddMarriageRecordPage() {
  const [form, setForm] = useState({
    registryNumber: '',
    registrationDate: '',
    husbandName: '',
    husbandAge: '',
    husbandCivilStatus: '',
    husbandOccupation: '',
    husbandResidence: '',
    husbandCitizenship: '',
    husbandFatherName: '',
    husbandMotherName: '',
    wifeName: '',
    wifeAge: '',
    wifeCivilStatus: '',
    wifeOccupation: '',
    wifeResidence: '',
    wifeCitizenship: '',
    wifeFatherName: '',
    wifeMotherName: '',
    dateOfMarriage: '',
    placeOfMarriage: '',
    marriageLicenseNumber: '',
    ministerName: '',
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

    const response = await fetch('/api/records/marriage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data?.error ?? 'Failed to save marriage record');
      return;
    }

    setMessage('Marriage record saved successfully.');
    setForm({
      registryNumber: '',
      registrationDate: '',
      husbandName: '',
      husbandAge: '',
      husbandCivilStatus: '',
      husbandOccupation: '',
      husbandResidence: '',
      husbandCitizenship: '',
      husbandFatherName: '',
      husbandMotherName: '',
      wifeName: '',
      wifeAge: '',
      wifeCivilStatus: '',
      wifeOccupation: '',
      wifeResidence: '',
      wifeCitizenship: '',
      wifeFatherName: '',
      wifeMotherName: '',
      dateOfMarriage: '',
      placeOfMarriage: '',
      marriageLicenseNumber: '',
      ministerName: '',
    });
  }

  return (
    <DashboardShell title="Marriage Registration" description="Form 3A - Enter all required information for a new marriage record.">
      <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
        {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 font-semibold">{message}</p>}
        {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 font-semibold">{error}</p>}

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Marriage Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Registry Number *</span>
              <input name="registryNumber" value={form.registryNumber} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="MR-2026-0001" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Registration Date *</span>
              <input name="registrationDate" type="date" value={form.registrationDate} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Date of Marriage *</span>
              <input name="dateOfMarriage" type="date" value={form.dateOfMarriage} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Place of Marriage *</span>
              <input name="placeOfMarriage" value={form.placeOfMarriage} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Church, venue, or city" required />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Marriage License Number</span>
              <input name="marriageLicenseNumber" value={form.marriageLicenseNumber} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="License number" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Minister Name</span>
              <input name="ministerName" value={form.ministerName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Officiating clergy or judge" />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Husband Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Name *</span>
              <input name="husbandName" value={form.husbandName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Age</span>
              <input name="husbandAge" type="number" value={form.husbandAge} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Age" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Civil Status</span>
              <select name="husbandCivilStatus" value={form.husbandCivilStatus} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="widowed">Widowed</option>
                <option value="divorced">Divorced</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Occupation</span>
              <input name="husbandOccupation" value={form.husbandOccupation} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Profession" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Residence</span>
              <input name="husbandResidence" value={form.husbandResidence} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Address" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Citizenship</span>
              <input name="husbandCitizenship" value={form.husbandCitizenship} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Citizenship" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Father's Name</span>
              <input name="husbandFatherName" value={form.husbandFatherName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Father's full name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mother's Name</span>
              <input name="husbandMotherName" value={form.husbandMotherName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Mother's full name" />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Wife Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Name *</span>
              <input name="wifeName" value={form.wifeName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Age</span>
              <input name="wifeAge" type="number" value={form.wifeAge} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Age" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Civil Status</span>
              <select name="wifeCivilStatus" value={form.wifeCivilStatus} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="widowed">Widowed</option>
                <option value="divorced">Divorced</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Occupation</span>
              <input name="wifeOccupation" value={form.wifeOccupation} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Profession" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Residence</span>
              <input name="wifeResidence" value={form.wifeResidence} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Address" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Citizenship</span>
              <input name="wifeCitizenship" value={form.wifeCitizenship} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Citizenship" />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Father's Name</span>
              <input name="wifeFatherName" value={form.wifeFatherName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Father's full name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mother's Name</span>
              <input name="wifeMotherName" value={form.wifeMotherName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Mother's full name" />
            </label>
          </div>
        </section>

        <div className="flex gap-3 border-t border-slate-200 pt-6">
          <button type="submit" disabled={loading} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-70">
            {loading ? 'Saving...' : 'Save marriage record'}
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}
