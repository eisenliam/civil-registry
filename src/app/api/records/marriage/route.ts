import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Database } from '@/types/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabase = await createServerSupabaseClient();

    const marriageRecord: Database['public']['Tables']['marriage_records']['Insert'] = {
      registry_number: body.registryNumber,
      registration_date: body.registrationDate,
      husband_name: body.husbandName,
      husband_age: body.husbandAge ? parseInt(body.husbandAge) : null,
      husband_civil_status: body.husbandCivilStatus || null,
      husband_occupation: body.husbandOccupation || null,
      husband_residence: body.husbandResidence || null,
      husband_citizenship: body.husbandCitizenship || null,
      husband_father_name: body.husbandFatherName || null,
      husband_mother_name: body.husbandMotherName || null,
      wife_name: body.wifeName,
      wife_age: body.wifeAge ? parseInt(body.wifeAge) : null,
      wife_civil_status: body.wifeCivilStatus || null,
      wife_occupation: body.wifeOccupation || null,
      wife_residence: body.wifeResidence || null,
      wife_citizenship: body.wifeCitizenship || null,
      wife_father_name: body.wifeFatherName || null,
      wife_mother_name: body.wifeMotherName || null,
      date_of_marriage: body.dateOfMarriage,
      place_of_marriage: body.placeOfMarriage,
      marriage_license_number: body.marriageLicenseNumber || null,
      minister_name: body.ministerName || null,
    };

    const { data, error } = await supabase.from('marriage_records').insert([marriageRecord] as any);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
