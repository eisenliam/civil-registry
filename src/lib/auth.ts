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
    username: 'Uno',
    name: 'Uno User',
    role: 'admin',
    passwordHash: '$2b$10$lWwzm7sTJF2EZCL.Nxwdju0.NMQzueiZ1Up0Vq2a1SN.41FSXrCPu',
  },
  {
    id: 'user-2',
    username: 'Dos',
    name: 'Dos User',
    role: 'registrar',
    passwordHash: '$2b$10$Dkb7x0Cc4gyBEgUnpj5uKOohDPhvcYE69nr1Kpjn.3v.aY5Hf2sfe',
  },
  {
    id: 'user-3',
    username: 'Tres',
    name: 'Tres User',
    role: 'clerk',
    passwordHash: '$2b$10$9d7bcUa9WXwXi0dchWn8T.St/1Ll8nF2C4oyutAm2yyFmP9UX3pni',
  },
  {
    id: 'user-4',
    username: 'Quatro',
    name: 'Quatro User',
    role: 'viewer',
    passwordHash: '$2b$10$DhXJRr9GKHtRBPcUebbMu.zISshUKiXyaOO1t/xGVptLldNb.6v66',
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
