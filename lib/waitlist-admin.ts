import type { WaitlistUser } from '@/lib/db-neon';

export interface WaitlistAdminRoleCount {
  role: string;
  count: number;
}

export interface WaitlistAdminSnapshot {
  totals: {
    users: number;
    responses: number;
    clubs: number;
    clubPlayers: number;
    completedProfiles: number;
  };
  roleCounts: WaitlistAdminRoleCount[];
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string | null;
    questionText: string | null;
    answer: string | null;
    players: WaitlistUser['players'];
    waitlistNumber: number;
    createdAt: string;
    updatedAt?: string;
  }>;
  refreshedAt: string;
}

export function buildWaitlistAdminSnapshot(users: WaitlistUser[]): WaitlistAdminSnapshot {
  const roleCountsMap = new Map<string, number>();

  for (const user of users) {
    if (user.response?.role) {
      roleCountsMap.set(user.response.role, (roleCountsMap.get(user.response.role) || 0) + 1);
    }
  }

  const normalizedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.response?.role || null,
    questionText: user.response?.questionText || null,
    answer: user.response?.answer || null,
    players: user.players,
    waitlistNumber: user.waitlistNumber,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  return {
    totals: {
      users: users.length,
      responses: users.filter((user) => user.response).length,
      clubs: users.filter((user) => user.response?.role === 'club').length,
      clubPlayers: users.reduce((sum, user) => sum + user.players.length, 0),
      completedProfiles: users.filter((user) => user.response?.answer || user.players.length > 0).length,
    },
    roleCounts: Array.from(roleCountsMap.entries())
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => b.count - a.count),
    users: normalizedUsers,
    refreshedAt: new Date().toISOString(),
  };
}
