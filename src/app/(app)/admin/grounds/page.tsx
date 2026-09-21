'use client';

import { useState } from 'react';

type Ground = {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  address: string;
  surface: string;
  hasGuide: boolean;
};

const SAMPLE_GROUNDS: Ground[] = [
  { id: '1', name: 'Tottenham Hotspur Stadium', city: 'London', country: 'England', capacity: 62850, address: '782 High Road, London N17 0BX', surface: 'Grass', hasGuide: true },
  { id: '2', name: 'Emirates Stadium', city: 'London', country: 'England', capacity: 60704, address: 'Hornsey Rd, London N7 7AJ', surface: 'Grass', hasGuide: true },
  { id: '3', name: 'Etihad Stadium', city: 'Manchester', country: 'England', capacity: 53400, address: 'Ashton New Rd, Manchester M11 3FF', surface: 'Grass', hasGuide: true },
  { id: '4', name: 'Anfield', city: 'Liverpool', country: 'England', capacity: 61276, address: 'Anfield Rd, Liverpool L4 0TH', surface: 'Grass', hasGuide: true },
  { id: '5', name: 'Stamford Bridge', city: 'London', country: 'England', capacity: 40853, address: 'Fulham Rd, London SW6 1HS', surface: 'Grass', hasGuide: false },
  { id: '6', name: 'Old Trafford', city: 'Manchester', country: 'England', capacity: 74310, address: 'Sir Matt Busby Way, Manchester M16 0RA', surface: 'Grass', hasGuide: true },
  { id: '7', name: 'St James\' Park', city: 'Newcastle', country: 'England', capacity: 52305, address: 'Strawberry Pl, Newcastle NE1 4ST', surface: 'Grass', hasGuide: false },
  { id: '8', name: 'Villa Park', city: 'Birmingham', country: 'England', capacity: 42682, address: 'Trinity Rd, Birmingham B6 6HE', surface: 'Grass', hasGuide: false },
];

export default function AdminGrounds() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    country: 'England',
    capacity: '',
    address: '',
    surface: 'Grass',
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, would POST to API
    console.log('New ground:', formData);
    setShowForm(false);
    setFormData({ name: '', city: '', country: 'England', capacity: '', address: '', surface: 'Grass' });
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">Grounds</h1>
          <p className="text-sm text-muted mt-1">Manage venues and stadium information</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm">
          {showForm ? 'Cancel' : '+ Add Ground'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="card p-4 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Add New Ground</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="Stadium name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Capacity</label>
              <input
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="e.g. 60000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="Full address"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Surface</label>
              <select
                name="surface"
                value={formData.surface}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
              >
                <option>Grass</option>
                <option>Artificial</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Ground
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-border/30">
                <th className="text-left px-4 py-3 font-medium text-muted">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">City</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Capacity</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden lg:table-cell">Surface</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Guide</th>
                <th className="text-right px-4 py-3 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SAMPLE_GROUNDS.map((ground) => (
                <tr key={ground.id} className="hover:bg-border/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{ground.name}</p>
                    <p className="text-xs text-muted sm:hidden">{ground.city}</p>
                  </td>
                  <td className="px-4 py-3 text-muted hidden sm:table-cell">{ground.city}, {ground.country}</td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">{ground.capacity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted hidden lg:table-cell">{ground.surface}</td>
                  <td className="px-4 py-3">
                    {ground.hasGuide ? (
                      <span className="badge badge-success">Published</span>
                    ) : (
                      <span className="badge badge-muted">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="btn btn-ghost btn-sm" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-sm text-error" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
