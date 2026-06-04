'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type RecordChange = {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  new: any;
  old: any;
};

export function useRealtimeRecords(
  table: 'birth_records' | 'death_records' | 'marriage_records',
  onChange: (change: RecordChange) => void
) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscription = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
        },
        (payload: any) => {
          onChange({
            type: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
            new: payload.new,
            old: payload.old,
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsSubscribed(true);
        } else if (status === 'CLOSED') {
          setIsSubscribed(false);
        }
      });

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [table, onChange]);

  return { isSubscribed };
}

export function useBirthRecordsRealtime(
  onRecordAdded: (record: any) => void,
  onRecordUpdated: (record: any) => void,
  onRecordDeleted: (record: any) => void
) {
  return useRealtimeRecords('birth_records', (change) => {
    if (change.type === 'INSERT') onRecordAdded(change.new);
    else if (change.type === 'UPDATE') onRecordUpdated(change.new);
    else if (change.type === 'DELETE') onRecordDeleted(change.old);
  });
}

export function useDeathRecordsRealtime(
  onRecordAdded: (record: any) => void,
  onRecordUpdated: (record: any) => void,
  onRecordDeleted: (record: any) => void
) {
  return useRealtimeRecords('death_records', (change) => {
    if (change.type === 'INSERT') onRecordAdded(change.new);
    else if (change.type === 'UPDATE') onRecordUpdated(change.new);
    else if (change.type === 'DELETE') onRecordDeleted(change.old);
  });
}

export function useMarriageRecordsRealtime(
  onRecordAdded: (record: any) => void,
  onRecordUpdated: (record: any) => void,
  onRecordDeleted: (record: any) => void
) {
  return useRealtimeRecords('marriage_records', (change) => {
    if (change.type === 'INSERT') onRecordAdded(change.new);
    else if (change.type === 'UPDATE') onRecordUpdated(change.new);
    else if (change.type === 'DELETE') onRecordDeleted(change.old);
  });
}
