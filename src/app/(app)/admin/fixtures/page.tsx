'use client';

import { useState } from 'react';

type FixtureRow = {
  id: number;
  home: string;
  away: string;
  date: string;
  kickoff: string;
  venue: string;
  competition: string;
  status: 'scheduled' | 'live' | 'finished' | 'postponed';
};

const SAMPLE_FIXTURES: FixtureRow[] = [
  { id: 1001, home: 'Tottenham', away: 'Arsenal', date: '2026-10-05', kickoff: '15:00', venue: 'Tottenham Hotspur Stadium', competition: 'Premier League', status: 'scheduled' },
  { id: 1002, home: 'Man City', away: 'Tottenham', date: '2026-10-12', kickoff: '17:30', venue: 'Etihad Stadium', competition: 'Premier League', status: 'scheduled' },
  { id: 1003, home: 'Tottenham', away: 'Newcastle', date: '2026-10-19', kickoff: '15:00', venue: 'Tottenham Hotspur Stadium', competition: 'Premier League', status: 'scheduled' },
  { id: 900, home: 'Tottenham', away: 'Liverpool', date: '2026-09-17', kickoff: '15:00', venue: 'Tottenham Hotspur Stadium', competition: 'Premier League', status: 'finished' },
  { id: 899, home: 'Chelsea', away: 'Tottenham', date: '2026-09-10', kickoff: '12:30', venue: 'Stamford Bridge', competition: 'Premier League', status: 'finished' },
  { id: 898, home: 'Tottenham', away: 'Aston Villa', date: '2026-09-03', kickoff: '15:00', venue: 'Tottenham Hotspur Stadium', competition: 'Premier League', status: 'finished' },
  { id: 897, home: 'Man Utd', away: 'Tottenham', date: '2026-08-27', kickoff: '14:00', venue: 'Old Trafford', competition: 'Premier League', status: 'finished' },
  { id: 896, home: 'Tottenham', away: 'Brighton', date: '2026-08-20', kickoff: '15:00', venue: 'Tottenham Hotspur Stadium', competition: 'Premier League', status: 'finished' },
];

const STATUS_STYLES: Record<string, string> = {
  scheduled: 'badge-blue',
  live: 'badge-error',
  finished: 'badge-success',
  postponed: 'badge-warning',
};

export default function AdminFixtures() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [syncing, setSyncing] = useState(false);

  const filtered = statusFilter === 'all'
    ? SAMPLE_FIXTURES
    : SAMPLE_FIXTURES.filter((f) => f.status === statusFilter);

  function handleSync() {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">Fixtures</h1>
          <p className="text-sm text-muted mt-1">Manage Spurs fixtures and match data</p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="btn btn-primary btn-sm"
        >
          {syncing ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Syncing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sync from API
            </>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {['all', 'scheduled', 'live', 'finished', 'postponed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              statusFilter === status
                ? 'bg-navy text-white'
                : 'bg-border/50 text-muted hover:text-foreground'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-border/30">
                <th className="text-left px-4 py-3 font-medium text-muted">ID</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Match</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Venue</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Date</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">Kickoff</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((fixture) => (
                <tr key={fixture.id} className="hover:bg-border/20 transition-colors">
                  <td className="px-4 py-3 text-muted-light font-mono text-xs">{fixture.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {fixture.home} vs {fixture.away}
                  </td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">{fixture.venue}</td>
                  <td className="px-4 py-3 text-muted">{fixture.date}</td>
                  <td className="px-4 py-3 text-muted hidden sm:table-cell">{fixture.kickoff}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${STATUS_STYLES[fixture.status]}`}>
                      {fixture.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="btn btn-ghost btn-sm" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-sm" title="View">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-muted">
            No fixtures found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
