import React, { useState, useMemo } from 'react';
import { X, Hash, MapPin, Tag, Users, Baby, Shield, Loader2, Save, RefreshCw } from 'lucide-react';

const initialForm = {
  name: '',
  anganwadiCode: '',
  location: '',
  pincode: '',
  workersCount: '',
  childrenCount: '',
  status: 'Active',
};

const AddAnganwadiModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const e = {};
    // Name
    if (!values.name?.trim()) e.name = 'Center name is required';
    else if (values.name.trim().length < 3) e.name = 'Name must be at least 3 characters';

    // Code (uppercase, no spaces)
    if (!values.anganwadiCode?.trim()) e.anganwadiCode = 'Unique code is required';
    else if (!/^[A-Z0-9-]{3,}$/.test(values.anganwadiCode.trim())) e.anganwadiCode = 'Use A–Z, 0–9 and hyphen only (min 3 chars)';

    // Location
    if (!values.location?.trim()) e.location = 'Location/Ward is required';
    else if (values.location.trim().length < 3) e.location = 'Location must be at least 3 characters';

    // Pincode
    if (!values.pincode?.trim()) e.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(values.pincode.trim())) e.pincode = 'Pincode must be a 6-digit number';

    // Workers
    const workers = Number(values.workersCount);
    if (Number.isNaN(workers)) e.workersCount = 'Enter a valid number';
    else if (!Number.isInteger(workers) || workers < 0) e.workersCount = 'Workers must be a non-negative integer';

    // Children
    const children = Number(values.childrenCount);
    if (Number.isNaN(children)) e.childrenCount = 'Enter a valid number';
    else if (!Number.isInteger(children) || children < 0) e.childrenCount = 'Children must be a non-negative integer';

    // Status
    if (!['Active', 'Inactive'].includes(values.status)) e.status = 'Invalid status';

    return e;
  };

  const hasErrors = useMemo(() => Object.keys(validate(form)).length > 0, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let next = value;

    if (name === 'anganwadiCode') {
      // Uppercase and replace spaces with hyphen
      next = value.toUpperCase().replace(/\s+/g, '-');
    }

    if (name === 'pincode') {
      // Keep only digits and limit to 6
      next = value.replace(/\D/g, '').slice(0, 6);
    }

    if (name === 'workersCount' || name === 'childrenCount') {
      // Allow only digits
      next = value.replace(/\D/g, '');
    }

    const updated = { ...form, [name]: next };
    setForm(updated);

    // Live-validate the changed field
    const v = validate(updated);
    setErrors(v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    try {
      const res = await fetch('/api/anganwadi-centers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          anganwadiCode: form.anganwadiCode.trim(),
          location: form.location.trim(),
          pincode: form.pincode.trim(),
          workersCount: Number(form.workersCount),
          childrenCount: Number(form.childrenCount),
          status: form.status,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to add center');
      }

      onAdd?.(data.data);
      setForm(initialForm);
      onClose?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onMouseDown={closeOnBackdrop}>
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5" onMouseDown={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-black">Add Anganwadi Center</h2>
            <p className="mt-1 text-sm text-gray-500">Fill the details below to create a new center.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Tag className="h-4 w-4 text-gray-400" /> Center Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g., Akkarakunnu AWC"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Code */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Hash className="h-4 w-4 text-gray-400" /> Unique Code
              </label>
              <input
                name="anganwadiCode"
                value={form.anganwadiCode}
                onChange={handleChange}
                required
                placeholder="e.g., AWC-001"
                className={`w-full uppercase rounded-lg border px-3.5 py-2.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.anganwadiCode ? 'border-red-300' : 'border-gray-300'}`}
              />
              <p className="mt-1 text-[11px] text-gray-500">Use uppercase letters, numbers and hyphen only.</p>
              {errors.anganwadiCode && <p className="mt-1 text-xs text-red-600">{errors.anganwadiCode}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin className="h-4 w-4 text-gray-400" /> Location / Ward
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="e.g., Ward 3, Akkarakunnu"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.location ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
            </div>

            {/* Pincode */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Tag className="h-4 w-4 text-gray-400" /> Pincode
              </label>
              <input
                name="pincode"
                inputMode="numeric"
                pattern="\\d{6}"
                value={form.pincode}
                onChange={handleChange}
                required
                placeholder="e.g., 686522"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.pincode ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.pincode && <p className="mt-1 text-xs text-red-600">{errors.pincode}</p>}
            </div>

            {/* Workers */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Users className="h-4 w-4 text-gray-400" /> Workers Count
              </label>
              <input
                name="workersCount"
                type="text"
                inputMode="numeric"
                value={form.workersCount}
                onChange={handleChange}
                required
                placeholder="e.g., 2"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.workersCount ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.workersCount && <p className="mt-1 text-xs text-red-600">{errors.workersCount}</p>}
            </div>

            {/* Children */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Baby className="h-4 w-4 text-gray-400" /> Children Count
              </label>
              <input
                name="childrenCount"
                type="text"
                inputMode="numeric"
                value={form.childrenCount}
                onChange={handleChange}
                required
                placeholder="e.g., 25"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.childrenCount ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.childrenCount && <p className="mt-1 text-xs text-red-600">{errors.childrenCount}</p>}
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Shield className="h-4 w-4 text-gray-400" /> Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={`w-full appearance-none rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.status ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">▾</span>
              </div>
              {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || hasErrors}
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Center
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnganwadiModal;