import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createSession(
  userId: string,
  deviceInfo?: string,
  ipAddress?: string
): Promise<string> {
  const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Invalidate all other active sessions for this user
  await supabase
    .from('user_sessions')
    .update({ is_active: false })
    .eq('user_id', userId)
    .eq('is_active', true);

  // Create new session
  const { data, error } = await supabase
    .from('user_sessions')
    .insert({
      user_id: userId,
      session_token: sessionToken,
      device_info: deviceInfo,
      ip_address: ipAddress,
      is_active: true,
    })
    .select('id')
    .single();

  if (error) throw error;

  return sessionToken;
}

export async function invalidateSession(sessionToken: string): Promise<void> {
  const { error } = await supabase
    .from('user_sessions')
    .update({ is_active: false })
    .eq('session_token', sessionToken);

  if (error) throw error;
}

export async function getActiveSession(
  userId: string,
  sessionToken: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('user_sessions')
    .select('id')
    .eq('user_id', userId)
    .eq('session_token', sessionToken)
    .eq('is_active', true)
    .single();

  return !!data && !error;
}

export async function updateSessionActivity(sessionToken: string): Promise<void> {
  await supabase
    .from('user_sessions')
    .update({ last_activity_at: new Date().toISOString() })
    .eq('session_token', sessionToken);
}

export async function cleanupExpiredSessions(maxAgeHours: number = 24): Promise<void> {
  const cutoffTime = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000).toISOString();
  await supabase
    .from('user_sessions')
    .update({ is_active: false })
    .lt('last_activity_at', cutoffTime);
}
