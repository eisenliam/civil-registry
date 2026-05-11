"use client";

import { useState } from 'react';
import DashboardShell from '@/components/dashboard-shell';

export default function AddDeathRecordPage() {
  const [form, setForm] = useState({
    registryNumber: '',
    registrationDate: '',
    deceasedName: '',
    deceasedSex: '',
    dateOfDeath: '',
    placeOfDeath: '',
    ageAtDeath: '',
    civilStatus: '',
    occupation: '',
    residence: '',
    causeOfDeath: '',
    fatherName: '',
    motherName: '',
    informantName: '',
    informantRelationship: '',
    informantAddress: '',
    attendingPhysicianName: '',
    attendingPhysicianLicenseNo: '',
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

    const response = await fetch('/api/records/death', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data?.error ?? 'Failed to save death record');
      return;
    }

    setMessage('Death record saved successfully.');
    setForm({
      registryNumber: '',
      registrationDate: '',
      deceasedName: '',
      deceasedSex: '',
      dateOfDeath: '',
      placeOfDeath: '',
      ageAtDeath: '',
      civilStatus: '',
      occupation: '',
      residence: '',
      causeOfDeath: '',
      fatherName: '',
      motherName: '',
      informantName: '',
      informantRelationship: '',
      informantAddress: '',
      attendingPhysicianName: '',
      attendingPhysicianLicenseNo: '',
    });
  }

  return (
    <DashboardShell title="Death Registration" description="Form 2A - Enter all required information for a new death record.">
      <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
        {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 font-semibold">{message}</p>}
        {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 font-semibold">{error}</p>}

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Death Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Registry Number *</span>
              <input name="registryNumber" value={form.registryNumber} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="DR-2026-0001" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Registration Date *</span>
              <input name="registrationDate" type="date" value={form.registrationDate} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Deceased's Name *</span>
              <input name="deceasedName" value={form.deceasedName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Sex *</span>
              <select name="deceasedSex" value={form.deceasedSex} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required>
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Date of Death *</span>
              <input name="dateOfDeath" type="date" value={form.dateOfDeath} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Place of Death *</span>
              <input name="placeOfDeath" value={form.placeOfDeath} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Hospital or location" required />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Age at Death</span>
              <input name="ageAtDeath" type="number" value={form.ageAtDeath} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Age" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Civil Status</span>
              <select name="civilStatus" value={form.civilStatus} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="divorced">Divorced</option>
              </select>
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Occupation</span>
              <input name="occupation" value={form.occupation} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Profession or occupation" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Residence</span>
              <input name="residence" value={form.residence} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Address" />
            </label>
          </div>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Cause of Death</span>
            <input name="causeOfDeath" value={form.causeOfDeath} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Medical cause" />
          </label>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Family Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Father's Name</span>
              <input name="fatherName" value={form.fatherName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mother's Name</span>
              <input name="motherName" value={form.motherName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Informant Information</h3>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Informant's Name</span>
            <input name="informantName" value={form.informantName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Full name" />
          </label>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Relationship</span>
              <input name="informantRelationship" value={form.informantRelationship} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Relative, spouse, etc." />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Address</span>
              <input name="informantAddress" value={form.informantAddress} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Complete address" />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">Medical Attendant</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Physician Name</span>
              <input name="attendingPhysicianName" value={form.attendingPhysicianName} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Doctor's name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">License Number</span>
              <input name="attendingPhysicianLicenseNo" value={form.attendingPhysicianLicenseNo} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Medical license number" />
            </label>
          </div>
        </section>

        <div className="flex gap-3 border-t border-slate-200 pt-6">
          <button type="submit" disabled={loading} className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-70">
            {loading ? 'Saving...' : 'Save death record'}
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}
