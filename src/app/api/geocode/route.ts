import { NextRequest, NextResponse } from 'next/server';
import { searchPlaces } from '@/services/geocoding';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const places = await searchPlaces(q);
  return NextResponse.json({ places });
}
