import { NextRequest, NextResponse } from 'next/server';
import { RAGStore } from '@/engine/rag';
import { RAGSearchQuery } from '@/types/rag';

export async function POST(req: NextRequest) {
  try {
    const body: RAGSearchQuery = await req.json();
    if (!body.query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const results = RAGStore.search(body);
    return NextResponse.json({ results, total: results.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
