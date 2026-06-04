import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Database } from '@/types/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabase = await createServerSupabaseClient();

    const deathRecord: Database['public']['Tables']['death_records']['Insert'] = {
      registry_number: body.registryNumber,
      registration_date: body.registrationDate,
      deceased_name: body.deceasedName,
      deceased_sex: body.deceasedSex,
      date_of_death: body.dateOfDeath,
      place_of_death: body.placeOfDeath,
      age_at_death: body.ageAtDeath ? parseInt(body.ageAtDeath) : null,
      civil_status: body.civilStatus || null,
      occupation: body.occupation || null,
      residence: body.residence || null,
      cause_of_death: body.causeOfDeath || null,
      father_name: body.fatherName || null,
      mother_name: body.motherName || null,
      informant_name: body.informantName || null,
      informant_relationship: body.informantRelationship || null,
      informant_address: body.informantAddress || null,
      attending_physician_name: body.attendingPhysicianName || null,
      attending_physician_license_no: body.attendingPhysicianLicenseNo || null,
    };

    const { data, error } = await supabase.from('death_records').insert([deathRecord] as any);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
