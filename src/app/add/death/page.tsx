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
      <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] bg-gradient-to-br from-white via-amber-50/20 to-slate-50/30 p-8 shadow-sm border border-amber-100/50">
        {message && <p className="rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-50/40 px-4 py-3 text-sm text-emerald-700 font-bold border border-emerald-200/50 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>{message}</p>}
        {error && <p className="rounded-2xl bg-gradient-to-r from-red-50 to-red-50/40 px-4 py-3 text-sm text-red-700 font-bold border border-red-200/50 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span>{error}</p>}

        <section className="space-y-4 border-t-2 border-amber-200/50 pt-6 pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-amber-400 before:to-amber-300 before:rounded-l">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Death Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Registry Number *</span>
              <input name="registryNumber" value={form.registryNumber} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="DR-2026-0001" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Registration Date *</span>
              <input name="registrationDate" type="date" value={form.registrationDate} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" required />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Deceased's Name *</span>
              <input name="deceasedName" value={form.deceasedName} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Full name" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Sex *</span>
              <select name="deceasedSex" value={form.deceasedSex} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" required>
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Date of Death *</span>
              <input name="dateOfDeath" type="date" value={form.dateOfDeath} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Place of Death *</span>
              <input name="placeOfDeath" value={form.placeOfDeath} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Hospital or location" required />
            </label>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Age at Death</span>
              <input name="ageAtDeath" type="number" value={form.ageAtDeath} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Age" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Civil Status</span>
              <select name="civilStatus" value={form.civilStatus} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition">
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
              <span className="text-sm font-bold text-slate-900">Occupation</span>
              <input name="occupation" value={form.occupation} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Profession or occupation" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Residence</span>
              <input name="residence" value={form.residence} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Address" />
            </label>
          </div>
          <label className="space-y-2">
            <span className="text-sm font-bold text-slate-900">Cause of Death</span>
            <input name="causeOfDeath" value={form.causeOfDeath} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Medical cause" />
          </label>
        </section>

        <section className="space-y-4 border-t-2 border-amber-200/50 pt-6 pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-amber-400 before:to-amber-300 before:rounded-l">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Family Information</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Father's Name</span>
              <input name="fatherName" value={form.fatherName} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Full name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Mother's Name</span>
              <input name="motherName" value={form.motherName} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Full name" />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t-2 border-amber-200/50 pt-6 pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-amber-400 before:to-amber-300 before:rounded-l">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Informant Information</h3>
          <label className="space-y-2">
            <span className="text-sm font-bold text-slate-900">Informant's Name</span>
            <input name="informantName" value={form.informantName} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Full name" />
          </label>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Relationship</span>
              <input name="informantRelationship" value={form.informantRelationship} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Relative, spouse, etc." />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Address</span>
              <input name="informantAddress" value={form.informantAddress} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Complete address" />
            </label>
          </div>
        </section>

        <section className="space-y-4 border-t-2 border-amber-200/50 pt-6 pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-amber-400 before:to-amber-300 before:rounded-l">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Medical Attendant</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">Physician Name</span>
              <input name="attendingPhysicianName" value={form.attendingPhysicianName} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Doctor's name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-900">License Number</span>
              <input name="attendingPhysicianLicenseNo" value={form.attendingPhysicianLicenseNo} onChange={handleChange} className="w-full rounded-2xl border-2 border-amber-200/60 bg-gradient-to-r from-white to-amber-50/20 px-4 py-3 outline-none focus:border-amber-400 focus:shadow-md transition" placeholder="Medical license number" />
            </label>
          </div>
        </section>

        <div className="flex gap-3 border-t-2 border-amber-200/50 pt-6">
          <button type="submit" disabled={loading} className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:from-amber-600 hover:to-orange-600 disabled:opacity-70 shadow-sm hover:shadow-md">
            {loading ? 'Saving...' : 'Save death record'}
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}
