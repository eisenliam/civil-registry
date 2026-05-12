import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { validateUser } from '@/lib/auth';
import { createSession } from '@/lib/supabase-sessions';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  const user = validateUser(username, password);

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  }

  // Create session and invalidate other active sessions
  const userAgent = req.headers.get('user-agent') || 'Unknown';
  const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown';
  const sessionToken = await createSession(user.id, userAgent, ipAddress);

  const response = NextResponse.json({ ok: true, user, sessionToken });
  const session = (await getIronSession(req, response, sessionOptions)) as any;
  session.user = user;
  session.sessionToken = sessionToken;
  await session.save();

  return response;
}
