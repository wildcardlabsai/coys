'use client';

import { useState } from 'react';

type Partner = {
  id: string;
  name: string;
  type: string;
  website: string;
  commissionRate: number;
  isActive: boolean;
  totalClicks: number;
  thisMonth: number;
  lastMonth: number;
};

const SAMPLE_PARTNERS: Partner[] = [
  { id: '1', name: 'Trainline', type: 'transport', website: 'thetrainline.com', commissionRate: 3.5, isActive: true, totalClicks: 1542, thisMonth: 234, lastMonth: 198 },
  { id: '2', name: 'Booking.com', type: 'accommodation', website: 'booking.com', commissionRate: 4.0, isActive: true, totalClicks: 892, thisMonth: 156, lastMonth: 142 },
  { id: '3', name: 'StubHub', type: 'tickets', website: 'stubhub.co.uk', commissionRate: 5.0, isActive: true, totalClicks: 756, thisMonth: 189, lastMonth: 167 },
  { id: '4', name: 'Kitbag', type: 'merchandise', website: 'kitbag.com', commissionRate: 6.0, isActive: true, totalClicks: 412, thisMonth: 78, lastMonth: 65 },
  { id: '5', name: 'Hotels.com', type: 'accommodation', website: 'hotels.com', commissionRate: 3.0, isActive: false, totalClicks: 290, thisMonth: 0, lastMonth: 45 },
];

function ClickBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-navy rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted w-8 text-right">{value}</span>
    </div>
  );
}

export default function AdminAffiliates() {
  const [showForm, setShowForm] = useState(false);

  const maxClicks = Math.max(...SAMPLE_PARTNERS.map((p) => p.thisMonth));
  const totalClicksThisMonth = SAMPLE_PARTNERS.reduce((sum, p) => sum + p.thisMonth, 0);
  const totalClicksLastMonth = SAMPLE_PARTNERS.reduce((sum, p) => sum + p.lastMonth, 0);
  const clickChange = totalClicksLastMonth > 0
    ? Math.round(((totalClicksThisMonth - totalClicksLastMonth) / totalClicksLastMonth) * 100)
    : 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">Affiliates</h1>
          <p className="text-sm text-muted mt-1">Manage affiliate partners and track performance</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm">
          {showForm ? 'Cancel' : '+ Add Partner'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="card p-4">
          <p className="text-xs text-muted">Active Partners</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {SAMPLE_PARTNERS.filter((p) => p.isActive).length}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total Clicks (All Time)</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {SAMPLE_PARTNERS.reduce((sum, p) => sum + p.totalClicks, 0).toLocaleString()}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">This Month</p>
          <p className="text-2xl font-bold text-foreground mt-1">{totalClicksThisMonth}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">vs Last Month</p>
          <p className={`text-2xl font-bold mt-1 ${clickChange >= 0 ? 'text-success' : 'text-error'}`}>
            {clickChange >= 0 ? '+' : ''}{clickChange}%
          </p>
        </div>
      </div>

      {/* Click Dashboard */}
      <div className="card p-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Clicks This Month</h2>
        <div className="space-y-2.5">
          {SAMPLE_PARTNERS
            .filter((p) => p.isActive)
            .sort((a, b) => b.thisMonth - a.thisMonth)
            .map((partner) => (
              <div key={partner.id} className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground w-24 shrink-0">{partner.name}</span>
                <div className="flex-1">
                  <ClickBar value={partner.thisMonth} max={maxClicks} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="card p-4 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Add New Partner</h2>
          <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Partner Name</label>
              <input
                required
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="Partner name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Type</label>
              <select className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground">
                <option value="travel">Travel</option>
                <option value="tickets">Tickets</option>
                <option value="merchandise">Merchandise</option>
                <option value="accommodation">Accommodation</option>
                <option value="transport">Transport</option>
                <option value="food_drink">Food & Drink</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Website</label>
              <input
                type="url"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Commission Rate (%)</label>
              <input
                type="number"
                step="0.1"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="e.g. 3.5"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Affiliate URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="https://partner.com/?ref=coys"
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="btn btn-primary btn-sm w-full">Save Partner</button>
            </div>
          </form>
        </div>
      )}

      {/* Partners Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-border/30">
                <th className="text-left px-4 py-3 font-medium text-muted">Partner</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Commission</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Clicks</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SAMPLE_PARTNERS.map((partner) => (
                <tr key={partner.id} className="hover:bg-border/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{partner.name}</p>
                    <p className="text-xs text-muted">{partner.website}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="badge badge-muted">{partner.type}</span>
                  </td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">{partner.commissionRate}%</td>
                  <td className="px-4 py-3 text-foreground font-medium">{partner.totalClicks.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {partner.isActive ? (
                      <span className="badge badge-success">Active</span>
                    ) : (
                      <span className="badge badge-muted">Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="btn btn-ghost btn-sm" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
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
