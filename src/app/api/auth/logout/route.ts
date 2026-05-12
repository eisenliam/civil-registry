import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { invalidateSession } from '@/lib/supabase-sessions';

export async function POST(req: NextRequest) {
  // Get session and clean up database record
  const response = NextResponse.json({ ok: true });
  const session = (await getIronSession(req, response, sessionOptions)) as any;
  
  if (session.sessionToken) {
    await invalidateSession(session.sessionToken);
  }

  session.destroy();
  return response;
}
