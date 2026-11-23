import {
  DocumentChunk,
  MasterRuleConfig,
  RAGSearchQuery,
  RAGSearchResult,
  ReferenceBook,
} from '../types/rag';
import { PRESEEDED_BOOKS, PRESEEDED_CHUNKS } from '../data/seedBooks';
import { DirectionType, PlanetKey } from '../types/astrology';

// In-memory persistent registry for active runtime
class KnowledgeBaseStore {
  private books: Map<string, ReferenceBook> = new Map();
  private chunks: Map<string, DocumentChunk> = new Map();
  private masterRuleConfig: MasterRuleConfig;

  constructor() {
    // Initialize preseeded books and chunks
    PRESEEDED_BOOKS.forEach((b) => this.books.set(b.id, { ...b }));
    PRESEEDED_CHUNKS.forEach((c) => this.chunks.set(c.id, { ...c }));

    this.masterRuleConfig = {
      systemPrompt: `You are the Master Astro-Vastu Diagnostic Intelligence Engine.
You synthesize four classical systems:
1. Parashari (Lagna, Bhavas, Vimshottari Mahadasha/Antardasha)
2. Navatara Paddhati (27 Nakshatras 9-Tara Chakra, flagging 3rd Vipat, 5th Pratyak, 7th Naidhana defects)
3. Bhrigu Nandi Nadi (1-5-9 Trinal conjunctions & Directional signs: Fire=East, Earth=South, Air=West, Water=North)
4. Jaimini Paddhati (Chara Karakas, Rashi Drishti & A4 Matri Pada external surroundings)

Always ground every diagnostic prediction in verified classical texts retrieved from the Knowledge Base, providing clear citations in [Source: Book Name, Ch. X] format. Provide 3-Tier personalized remedies (Physical Decluttering, Elemental Color Vastu, Classical Remedies).`,
      planetDirectionMap: {
        Sun: 'East',
        Moon: 'North-West',
        Mars: 'South',
        Mercury: 'North',
        Jupiter: 'North-East',
        Venus: 'South-East',
        Saturn: 'West',
        Rahu: 'South-West',
        Ketu: 'Center',
        Ascendant: 'East',
      },
      bnnTrineElements: {
        Fire: 'East',
        Earth: 'South',
        Air: 'West',
        Water: 'North',
      },
      maleficTaraThresholds: [3, 5, 7],
      updatedAt: new Date().toISOString(),
    };
  }

  public getBooks(): ReferenceBook[] {
    return Array.from(this.books.values());
  }

  public getBook(id: string): ReferenceBook | undefined {
    return this.books.get(id);
  }

  public getAllChunks(): DocumentChunk[] {
    return Array.from(this.chunks.values());
  }

  public getChunksByBook(bookId: string): DocumentChunk[] {
    return Array.from(this.chunks.values()).filter((c) => c.bookId === bookId);
  }

  public addBook(book: ReferenceBook, chunks: DocumentChunk[]): void {
    this.books.set(book.id, book);
    chunks.forEach((c) => this.chunks.set(c.id, c));
  }

  public deleteBook(bookId: string): boolean {
    const book = this.books.get(bookId);
    if (!book) return false;

    // Delete chunks associated with book
    const chunkIdsToDelete: string[] = [];
    this.chunks.forEach((chunk, id) => {
      if (chunk.bookId === bookId) {
        chunkIdsToDelete.push(id);
      }
    });

    chunkIdsToDelete.forEach((id) => this.chunks.delete(id));
    this.books.delete(bookId);
    return true;
  }

  public getMasterRuleConfig(): MasterRuleConfig {
    return this.masterRuleConfig;
  }

  public updateMasterRuleConfig(config: Partial<MasterRuleConfig>): MasterRuleConfig {
    this.masterRuleConfig = {
      ...this.masterRuleConfig,
      ...config,
      updatedAt: new Date().toISOString(),
    };
    return this.masterRuleConfig;
  }

  /**
   * Hybrid semantic keyword & metadata similarity search
   */
  public search(query: RAGSearchQuery): RAGSearchResult[] {
    const terms = query.query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
    const results: { chunk: DocumentChunk; score: number }[] = [];

    const allChunks = Array.from(this.chunks.values());

    for (const chunk of allChunks) {
      let score = 0;
      const lowerContent = chunk.content.toLowerCase();
      const lowerTitle = chunk.bookTitle.toLowerCase();
      const lowerChapter = (chunk.chapter || '').toLowerCase();
      const lowerTags = chunk.tags.map((t) => t.toLowerCase()).join(' ');

      // Keyword matching
      for (const term of terms) {
        if (lowerContent.includes(term)) score += 3;
        if (lowerTags.includes(term)) score += 4;
        if (lowerTitle.includes(term)) score += 2;
        if (lowerChapter.includes(term)) score += 2;
      }

      // Metadata boost
      if (query.system && chunk.system.toLowerCase() === query.system.toLowerCase()) {
        score += 5;
      }
      if (query.direction && chunk.direction === query.direction) {
        score += 6;
      }
      if (query.planet && chunk.planet === query.planet) {
        score += 6;
      }

      if (score > 0) {
        results.push({
          chunk,
          score,
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    const limit = query.limit || 5;

    return results.slice(0, limit).map((r) => ({
      chunk: r.chunk,
      score: r.score,
      citation: r.chunk.citation,
    }));
  }
}

// Global singleton instance across API routes
const globalForRAG = globalThis as unknown as { knowledgeBase?: KnowledgeBaseStore };
export const RAGStore = globalForRAG.knowledgeBase ?? new KnowledgeBaseStore();
if (process.env.NODE_ENV !== 'production') globalForRAG.knowledgeBase = RAGStore;
