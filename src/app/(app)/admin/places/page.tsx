'use client';

import { useState } from 'react';

type Place = {
  id: string;
  name: string;
  type: 'pub' | 'restaurant' | 'hotel';
  city: string;
  rating: number;
  isVerified: boolean;
  isPublished: boolean;
  nearVenue: string;
};

const SAMPLE_PLACES: Place[] = [
  { id: '1', name: 'The Bricklayers Arms', type: 'pub', city: 'London', rating: 4.3, isVerified: true, isPublished: true, nearVenue: 'Tottenham Hotspur Stadium' },
  { id: '2', name: 'The Corner Pin', type: 'pub', city: 'London', rating: 4.1, isVerified: true, isPublished: true, nearVenue: 'Tottenham Hotspur Stadium' },
  { id: '3', name: 'Beavertown Tottenham', type: 'restaurant', city: 'London', rating: 4.5, isVerified: true, isPublished: true, nearVenue: 'Tottenham Hotspur Stadium' },
  { id: '4', name: 'The Antwerp Arms', type: 'pub', city: 'London', rating: 4.4, isVerified: true, isPublished: true, nearVenue: 'Tottenham Hotspur Stadium' },
  { id: '5', name: 'The Tollington', type: 'pub', city: 'London', rating: 3.9, isVerified: false, isPublished: false, nearVenue: 'Emirates Stadium' },
  { id: '6', name: 'The Cittie of Yorke', type: 'pub', city: 'Manchester', rating: 4.2, isVerified: true, isPublished: true, nearVenue: 'Etihad Stadium' },
  { id: '7', name: 'Premier Inn Tottenham Hale', type: 'hotel', city: 'London', rating: 3.9, isVerified: true, isPublished: true, nearVenue: 'Tottenham Hotspur Stadium' },
  { id: '8', name: 'The Albert', type: 'pub', city: 'Liverpool', rating: 4.0, isVerified: false, isPublished: false, nearVenue: 'Anfield' },
];

const TYPE_BADGE: Record<string, string> = {
  pub: 'badge-gold',
  restaurant: 'badge-blue',
  hotel: 'badge-navy',
};

export default function AdminPlaces() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = typeFilter === 'all'
    ? SAMPLE_PLACES
    : SAMPLE_PLACES.filter((p) => p.type === typeFilter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">Places</h1>
          <p className="text-sm text-muted mt-1">Manage pubs, restaurants, and hotels near grounds</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm">
          {showForm ? 'Cancel' : '+ Add Place'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="card p-4 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Add New Place</h2>
          <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Name</label>
              <input
                required
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="Place name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Type</label>
              <select className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground">
                <option value="pub">Pub</option>
                <option value="restaurant">Restaurant</option>
                <option value="hotel">Hotel</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">City</label>
              <input
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Address</label>
              <input
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="Full address"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Near Venue</label>
              <input
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="Nearest ground"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Website</label>
              <input
                type="url"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 text-foreground"
                placeholder="https://..."
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline btn-sm">Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm">Save Place</button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'pub', 'restaurant', 'hotel'].map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              typeFilter === type
                ? 'bg-navy text-white'
                : 'bg-border/50 text-muted hover:text-foreground'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-border/30">
                <th className="text-left px-4 py-3 font-medium text-muted">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">City</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Near</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Rating</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((place) => (
                <tr key={place.id} className="hover:bg-border/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{place.name}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${TYPE_BADGE[place.type]}`}>{place.type}</span>
                  </td>
                  <td className="px-4 py-3 text-muted hidden sm:table-cell">{place.city}</td>
                  <td className="px-4 py-3 text-muted text-xs hidden md:table-cell">{place.nearVenue}</td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">{place.rating}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {place.isVerified && <span className="badge badge-success text-[10px]">Verified</span>}
                      {place.isPublished ? (
                        <span className="badge badge-blue text-[10px]">Published</span>
                      ) : (
                        <span className="badge badge-muted text-[10px]">Draft</span>
                      )}
                    </div>
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
