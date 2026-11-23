import { NextRequest, NextResponse } from 'next/server';
import { RAGStore } from '@/engine/rag';

export async function GET() {
  const config = RAGStore.getMasterRuleConfig();
  return NextResponse.json({ config });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = RAGStore.updateMasterRuleConfig(body);
    return NextResponse.json({ success: true, config: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
