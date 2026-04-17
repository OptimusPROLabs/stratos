'use client';

import { useEffect, useState } from 'react';
import type { WaitlistAdminSnapshot } from '@/lib/waitlist-admin';

export function AdminDashboard({ initialData }: { initialData: WaitlistAdminSnapshot }) {
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const refresh = async () => {
      try {
        setIsRefreshing(true);
        const response = await fetch('/api/admin/waitlist', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || 'Failed to refresh admin dashboard');
        }

        const payload = (await response.json()) as WaitlistAdminSnapshot;
        if (active) {
          setData(payload);
          setError(null);
        }
      } catch (refreshError) {
        if (active) {
          setError(refreshError instanceof Error ? refreshError.message : 'Failed to refresh admin dashboard');
        }
      } finally {
        if (active) {
          setIsRefreshing(false);
        }
      }
    };

    const interval = window.setInterval(refresh, 5000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Users" value={data.totals.users} />
        <MetricCard label="Responses" value={data.totals.responses} />
        <MetricCard label="Clubs" value={data.totals.clubs} />
        <MetricCard label="Club Players" value={data.totals.clubPlayers} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-6">
        <div className="border border-[#1a2332] bg-[#0a0f14] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Live Status</h2>
            <span className={`text-xs uppercase tracking-wide ${isRefreshing ? 'text-[#b8ff56]' : 'text-[#8899aa]'}`}>
              {isRefreshing ? 'Refreshing' : 'Idle'}
            </span>
          </div>

          <p className="text-sm text-[#8899aa]">
            Last refresh: {new Date(data.refreshedAt).toLocaleTimeString()}
          </p>
          <p className="text-sm text-[#8899aa]">
            Completed profiles: {data.totals.completedProfiles}
          </p>

          {error && (
            <div className="border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white">Roles</h3>
            {data.roleCounts.length === 0 ? (
              <p className="text-sm text-[#8899aa]">No role data yet.</p>
            ) : (
              data.roleCounts.map((entry) => (
                <div key={entry.role} className="flex items-center justify-between text-sm border-b border-[#1a2332]/60 pb-2">
                  <span className="text-[#c5d0db] capitalize">{entry.role}</span>
                  <span className="text-[#b8ff56] font-medium">{entry.count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="overflow-x-auto border border-[#1a2332] bg-[#0a0f14]">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="border-b border-[#1a2332] text-left text-xs uppercase tracking-wide text-[#8899aa]">
                <th className="p-4">Spot</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Question</th>
                <th className="p-4">Answer</th>
                <th className="p-4">Players</th>
                <th className="p-4">Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.id} className="border-b border-[#1a2332]/60 align-top">
                  <td className="p-4 font-mono text-[#b8ff56]">#{user.waitlistNumber.toString().padStart(4, '0')}</td>
                  <td className="p-4 text-white font-medium">{user.name}</td>
                  <td className="p-4 text-[#8899aa]">{user.email}</td>
                  <td className="p-4 text-[#c5d0db] capitalize">{user.role || '—'}</td>
                  <td className="p-4 text-sm text-[#8899aa]">{user.questionText || '—'}</td>
                  <td className="p-4 text-sm text-[#8899aa]">{user.answer || '—'}</td>
                  <td className="p-4 text-sm text-[#8899aa]">
                    {user.players.length > 0 ? user.players.map((player) => player.name).join(', ') : '—'}
                  </td>
                  <td className="p-4 text-sm text-[#8899aa]">
                    {new Date(user.updatedAt || user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {data.users.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#8899aa]">
                    No waitlist records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-[#1a2332] bg-[#0a0f14] p-5">
      <p className="text-sm uppercase tracking-wide text-[#8899aa]">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
