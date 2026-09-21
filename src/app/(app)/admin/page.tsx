import Link from 'next/link';

const STATS = [
  { label: 'Upcoming Fixtures', value: 12, href: '/admin/fixtures', color: 'bg-navy' },
  { label: 'Registered Users', value: 1247, href: '/admin/users', color: 'bg-light-blue' },
  { label: 'Published Guides', value: 34, href: '/admin/articles', color: 'bg-success' },
  { label: 'Pending Reviews', value: 8, href: '/admin/reviews', color: 'bg-warning' },
  { label: 'Affiliate Clicks', value: 3892, href: '/admin/affiliates', color: 'bg-gold' },
  { label: 'Grounds in DB', value: 92, href: '/admin/grounds', color: 'bg-navy-light' },
];

const QUICK_LINKS = [
  { label: 'Sync Fixtures', href: '/admin/fixtures', description: 'Pull latest fixture data from API' },
  { label: 'Moderate Reviews', href: '/admin/reviews', description: '8 reviews awaiting moderation' },
  { label: 'New Article', href: '/admin/articles/new', description: 'Create a new article or guide' },
  { label: 'Add Ground', href: '/admin/grounds', description: 'Add a new venue to the database' },
  { label: 'View Affiliate Stats', href: '/admin/affiliates', description: 'Check partner click performance' },
  { label: 'Manage Places', href: '/admin/places', description: 'Add or edit pubs, restaurants, hotels' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">
            COYS Matchday Companion management panel
          </p>
        </div>
        <span className="badge badge-success text-xs">Development Mode</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card p-4 hover:shadow-lg transition-shadow group"
          >
            <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-white text-xs font-bold">
                {stat.value > 999 ? `${(stat.value / 1000).toFixed(1)}k` : stat.value}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
            <p className="text-xs text-muted mt-0.5 group-hover:text-foreground transition-colors">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="card p-4 flex items-start gap-3 hover:shadow-lg transition-shadow group"
            >
              <div className="w-8 h-8 bg-navy/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-navy/20 transition-colors">
                <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground group-hover:text-navy transition-colors">
                  {link.label}
                </p>
                <p className="text-xs text-muted mt-0.5">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-3">Recent Activity</h2>
        <div className="card divide-y divide-border">
          {[
            { action: 'Fixture synced', detail: 'Spurs vs Arsenal - Oct 5, 2026', time: '2 hours ago' },
            { action: 'Review approved', detail: 'Emirates Stadium - 4 stars', time: '4 hours ago' },
            { action: 'Article published', detail: 'Away Guide: Manchester City', time: '1 day ago' },
            { action: 'New user registered', detail: 'user1247@example.com', time: '1 day ago' },
            { action: 'Affiliate click', detail: 'Trainline - Away Days page', time: '2 days ago' },
          ].map((activity, i) => (
            <div key={i} className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted">{activity.detail}</p>
              </div>
              <span className="text-xs text-muted-light shrink-0 ml-4">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
