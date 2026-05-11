import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { validateUser } from '@/lib/auth';

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

  const response = NextResponse.json({ ok: true, user });
  const session = (await getIronSession(req, response, sessionOptions)) as any;
  session.user = user;
  await session.save();

  return response;
}
