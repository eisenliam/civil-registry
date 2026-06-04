import type { SessionOptions } from 'iron-session';
import { getIronSession } from 'iron-session';
import type { AuthUser } from './auth';
import type { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export type UserSession = {
  user?: AuthUser;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? 'change_this_secret_in_production',
  cookieName: 'civil_registry_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  },
};

export async function getSession(
  request: NextRequest,
  response: NextResponse
): Promise<UserSession> {
  return getIronSession(request, response, sessionOptions) as Promise<UserSession>;
}

export async function getCurrentUser(): Promise<AuthUser | undefined> {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions) as UserSession;
  return session.user;
}
