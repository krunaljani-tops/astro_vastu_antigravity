import { NextRequest, NextResponse } from 'next/server';
import { RAGStore } from '@/engine/rag';
import { DocumentChunk, ReferenceBook } from '@/types/rag';

export async function GET() {
  const books = RAGStore.getBooks();
  const allChunks = RAGStore.getAllChunks();

  return NextResponse.json({
    books,
    totalBooks: books.length,
    totalChunks: allChunks.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, system, classicalEra, description, tags, textContent } = body;

    if (!title || !author || !textContent) {
      return NextResponse.json({ error: 'Title, author, and text content are required.' }, { status: 400 });
    }

    const bookId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Semantic chunking: split by paragraphs / headings
    const rawParagraphs = textContent.split(/\n\s*\n+/);
    const chunks: DocumentChunk[] = [];

    rawParagraphs.forEach((para: string, idx: number) => {
      const cleanPara = para.trim();
      if (cleanPara.length < 30) return;

      // Detect potential direction and planet mentions in chunk
      let detectedDirection = undefined;
      const directions = ['North-East', 'South-East', 'North-West', 'South-West', 'North', 'South', 'East', 'West', 'Center'];
      for (const d of directions) {
        if (cleanPara.toLowerCase().includes(d.toLowerCase())) {
          detectedDirection = d as any;
          break;
        }
      }

      let detectedPlanet = undefined;
      const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
      for (const p of planets) {
        if (cleanPara.toLowerCase().includes(p.toLowerCase())) {
          detectedPlanet = p as any;
          break;
        }
      }

      chunks.push({
        id: `${bookId}-c${idx + 1}`,
        bookId,
        bookTitle: title,
        author,
        system: system || 'Vastu',
        chapter: `Section ${idx + 1}`,
        direction: detectedDirection,
        planet: detectedPlanet,
        tags: Array.isArray(tags) ? tags : ['Uploaded Book', system || 'Vastu'],
        content: cleanPara,
        citation: `[${title}, Sec. ${idx + 1}]`,
      });
    });

    const newBook: ReferenceBook = {
      id: bookId,
      title,
      author,
      classicalEra: classicalEra || 'Contemporary Reference',
      system: system || 'Vastu',
      description: description || `Uploaded manual with ${chunks.length} indexed chunks.`,
      totalChunks: chunks.length,
      tags: Array.isArray(tags) ? tags : ['Custom Book'],
      uploadedAt: new Date().toISOString(),
      isPreseeded: false,
    };

    RAGStore.addBook(newBook, chunks);

    return NextResponse.json({
      success: true,
      book: newBook,
      chunksCreated: chunks.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Book ID required' }, { status: 400 });
  }

  const deleted = RAGStore.deleteBook(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: `Book ${id} deleted.` });
}
