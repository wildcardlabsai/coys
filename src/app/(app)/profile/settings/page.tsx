'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  Trash2,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
        border-2 border-transparent transition-colors duration-200
        ${enabled ? 'bg-navy dark:bg-light-blue' : 'bg-gray-200 dark:bg-gray-700'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm
          ring-0 transition-transform duration-200
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    matchReminders: true,
    liveScores: true,
    teamNews: false,
    awayDayAlerts: true,
    pubDeals: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/profile"
          className="p-2 rounded-lg hover:bg-card-bg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3 px-1">
            Appearance
          </h2>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              <button
                onClick={() => setTheme('light')}
                className="flex items-center justify-between w-full p-4 hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sun className="h-5 w-5 text-amber-500" />
                  <span className="text-foreground">Light Mode</span>
                </div>
                {theme === 'light' && (
                  <div className="h-2 w-2 rounded-full bg-navy dark:bg-light-blue" />
                )}
              </button>
              <button
                onClick={() => setTheme('dark')}
                className="flex items-center justify-between w-full p-4 hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-indigo-500" />
                  <span className="text-foreground">Dark Mode</span>
                </div>
                {theme === 'dark' && (
                  <div className="h-2 w-2 rounded-full bg-navy dark:bg-light-blue" />
                )}
              </button>
              <button
                onClick={() => setTheme('system')}
                className="flex items-center justify-between w-full p-4 hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-green-500" />
                  <span className="text-foreground">System Default</span>
                </div>
                {theme === 'system' && (
                  <div className="h-2 w-2 rounded-full bg-navy dark:bg-light-blue" />
                )}
              </button>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3 px-1">
            Notifications
          </h2>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {[
                { key: 'matchReminders' as const, icon: Bell, label: 'Match Reminders', desc: 'Get notified before kick-off' },
                { key: 'liveScores' as const, icon: Bell, label: 'Live Score Updates', desc: 'Goals and key events' },
                { key: 'teamNews' as const, icon: Bell, label: 'Team News', desc: 'Lineups and transfers' },
                { key: 'awayDayAlerts' as const, icon: Bell, label: 'Away Day Alerts', desc: 'Travel updates and guides' },
                { key: 'pubDeals' as const, icon: Bell, label: 'Pub Deals', desc: 'Special offers near grounds' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle
                    enabled={notifications[item.key]}
                    onToggle={() => toggleNotification(item.key)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3 px-1">
            Account
          </h2>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              <Link
                href="/profile"
                className="flex items-center justify-between p-4 hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted" />
                  <span className="text-foreground">Privacy & Data</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted" />
              </Link>
              <button className="flex items-center justify-between w-full p-4 hover:bg-card-hover transition-colors">
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5 text-muted" />
                  <span className="text-foreground">Sign Out</span>
                </div>
              </button>
              <button className="flex items-center justify-between w-full p-4 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">Delete Account</span>
                </div>
              </button>
            </CardContent>
          </Card>
        </section>

        <p className="text-center text-xs text-muted py-4">
          COYS v1.0.0 &middot; Made with ❤️ for Spurs fans
        </p>
      </div>
    </div>
  );
}
