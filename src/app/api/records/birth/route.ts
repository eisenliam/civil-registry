import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Database } from '@/types/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabase = await createServerSupabaseClient();

    const birthRecord: Database['public']['Tables']['birth_records']['Insert'] = {
      registry_number: body.registryNumber,
      registration_date: body.registrationDate,
      child_name: body.childName,
      child_sex: body.childSex,
      date_of_birth: body.dateOfBirth,
      place_of_birth: body.placeOfBirth,
      father_name: body.fatherName || null,
      father_age: body.fatherAge ? parseInt(body.fatherAge) : null,
      father_birthplace: body.fatherBirthplace || null,
      father_citizenship: body.fatherCitizenship || null,
      mother_name: body.motherName || null,
      mother_age: body.motherAge ? parseInt(body.motherAge) : null,
      mother_birthplace: body.motherBirthplace || null,
      mother_citizenship: body.motherCitizenship || null,
      informant_name: body.informantName || null,
      informant_relationship: body.informantRelationship || null,
      informant_address: body.informantAddress || null,
      attendant_name: body.attendantName || null,
      attendant_designation: body.attendantDesignation || null,
    };

    const { data, error } = await supabase.from('birth_records').insert([birthRecord] as any);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
