'use client';

import { useState } from 'react';
import Link from 'next/link';

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  publishedAt: string | null;
  views: number;
};

const SAMPLE_ARTICLES: Article[] = [
  { id: '1', title: 'Away Guide: Arsenal at the Emirates', slug: 'away-guide-arsenal-emirates', category: 'away_day', author: 'Admin', status: 'published', publishedAt: '2026-09-15', views: 1245 },
  { id: '2', title: 'Away Guide: Manchester City at the Etihad', slug: 'away-guide-manchester-city-etihad', category: 'away_day', author: 'Admin', status: 'published', publishedAt: '2026-09-12', views: 892 },
  { id: '3', title: 'Best Pubs Near Tottenham Hotspur Stadium', slug: 'best-pubs-near-ths', category: 'guide', author: 'Admin', status: 'published', publishedAt: '2026-09-01', views: 2341 },
  { id: '4', title: 'Match Preview: Spurs vs Arsenal', slug: 'match-preview-spurs-vs-arsenal', category: 'match_preview', author: 'Admin', status: 'draft', publishedAt: null, views: 0 },
  { id: '5', title: 'Season Ticket Guide 2026/27', slug: 'season-ticket-guide-2026-27', category: 'guide', author: 'Admin', status: 'published', publishedAt: '2026-08-20', views: 4521 },
  { id: '6', title: 'Away Guide: Liverpool at Anfield', slug: 'away-guide-liverpool-anfield', category: 'away_day', author: 'Admin', status: 'draft', publishedAt: null, views: 0 },
];

export default function AdminArticles() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = statusFilter === 'all'
    ? SAMPLE_ARTICLES
    : SAMPLE_ARTICLES.filter((a) => a.status === statusFilter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">Articles</h1>
          <p className="text-sm text-muted mt-1">Manage guides, previews, and editorial content</p>
        </div>
        <Link href="/admin/articles/new" className="btn btn-primary btn-sm">
          + New Article
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'published', 'draft'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
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
                <th className="text-left px-4 py-3 font-medium text-muted">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-muted hidden md:table-cell">Views</th>
                <th className="text-right px-4 py-3 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((article) => (
                <tr key={article.id} className="hover:bg-border/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{article.title}</p>
                    <p className="text-xs text-muted mt-0.5">/{article.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="badge badge-muted">{article.category.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-3">
                    {article.status === 'published' ? (
                      <span className="badge badge-success">Published</span>
                    ) : (
                      <span className="badge badge-warning">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">
                    {article.publishedAt ?? '--'}
                  </td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">
                    {article.views.toLocaleString()}
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
      </div>
    </div>
  );
}
