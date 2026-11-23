import { DirectionType, PlanetKey } from './astrology';

export type AstrologicalSystem = 'Parashari' | 'Navatara' | 'BNN' | 'Jaimini' | 'Vastu' | 'Lal Kitab';

export interface DocumentChunk {
  id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  system: AstrologicalSystem;
  chapter?: string;
  direction?: DirectionType;
  planet?: PlanetKey;
  tags: string[];
  content: string;
  citation: string;
  embedding?: number[];
}

export interface ReferenceBook {
  id: string;
  title: string;
  author: string;
  classicalEra: string;
  system: AstrologicalSystem;
  description: string;
  totalChunks: number;
  tags: string[];
  uploadedAt: string;
  isPreseeded: boolean;
}

export interface RAGSearchQuery {
  query: string;
  system?: AstrologicalSystem;
  direction?: DirectionType;
  planet?: PlanetKey;
  limit?: number;
}

export interface RAGSearchResult {
  chunk: DocumentChunk;
  score: number;
  citation: string;
}

export interface MasterRuleConfig {
  systemPrompt: string;
  planetDirectionMap: Record<PlanetKey, DirectionType>;
  bnnTrineElements: {
    Fire: DirectionType;
    Earth: DirectionType;
    Air: DirectionType;
    Water: DirectionType;
  };
  maleficTaraThresholds: number[]; // [3, 5, 7]
  updatedAt: string;
}
