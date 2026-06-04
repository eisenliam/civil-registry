import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export async function GET(req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const session = (await getIronSession(req, response, sessionOptions)) as any;
  const user = session.user ?? null;
  return NextResponse.json({ ok: true, user });
}
