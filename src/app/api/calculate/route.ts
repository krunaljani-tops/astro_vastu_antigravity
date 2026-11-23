import { NextRequest, NextResponse } from 'next/server';
import { calculateVedicBirthChart } from '@/engine/calculator';
import { generateAstroVastuDiagnosticReport } from '@/engine/vastu';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, dob, tob, place, latitude, longitude, timezoneOffsetHours } = body;

    if (!fullName || !dob || !tob || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: 'Missing required birth details (fullName, dob, tob, latitude, longitude).' },
        { status: 400 }
      );
    }

    const chart = calculateVedicBirthChart({
      fullName,
      dob,
      tob,
      place: place || 'Unknown Place',
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      timezoneOffsetHours: parseFloat(timezoneOffsetHours ?? 5.5),
    });

    const report = generateAstroVastuDiagnosticReport(chart);

    return NextResponse.json({
      success: true,
      chart,
      report,
    });
  } catch (error: any) {
    console.error('Error in /api/calculate:', error);
    return NextResponse.json({ error: error.message || 'Calculation failed' }, { status: 500 });
  }
}
