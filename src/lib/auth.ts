import bcrypt from 'bcryptjs';

export type AuthUser = {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'registrar' | 'clerk' | 'viewer';
};

type StoredUser = AuthUser & {
  passwordHash: string;
};

const users: StoredUser[] = [
  {
    id: 'user-1',
    username: 'admin',
    name: 'System Administrator',
    role: 'admin',
    passwordHash: '$2b$10$6rT1mtAiYrRsLQ5dO1NjJOC8LhRI2OcgTfrTX9EfZupFWlaKLVT3u',
  },
  {
    id: 'user-2',
    username: 'registrar',
    name: 'Registrar Officer',
    role: 'registrar',
    passwordHash: '$2b$10$E7WIZYUD7MHbZ15YXOO9XOYSeaKo4SARD/w1ZJBgz10q1sYQsV4HK',
  },
  {
    id: 'user-3',
    username: 'clerk',
    name: 'Registry Clerk',
    role: 'clerk',
    passwordHash: '$2b$10$An9yEsNntrf.GcNsbcDaW.HKg0nZ.TI6SKxVOyJKxtZXjUwZUdoNa',
  },
  {
    id: 'user-4',
    username: 'viewer',
    name: 'Records Viewer',
    role: 'viewer',
    passwordHash: '$2b$10$sD/wfWRW4x0yigoT0sxJrOeatRzfZQ0uS2l2kvU0RHtN2w3hMb8q.',
  },
];

export function getUserByUsername(username: string): AuthUser | undefined {
  const user = users.find((item) => item.username === username);
  if (!user) return undefined;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function validateUser(username: string, password: string): AuthUser | null {
  const user = users.find((item) => item.username === username);
  if (!user) return null;
  const passwordValid = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordValid) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
