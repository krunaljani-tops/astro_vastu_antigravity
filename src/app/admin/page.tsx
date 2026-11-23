'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import {
  BookOpen,
  Upload,
  Trash2,
  Settings,
  Database,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  Sliders,
  FileText,
  Tag,
  Compass,
} from 'lucide-react';
import { DocumentChunk, MasterRuleConfig, ReferenceBook } from '@/types/rag';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'books' | 'upload' | 'rules'>('books');
  const [books, setBooks] = useState<ReferenceBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBook, setSelectedBook] = useState<ReferenceBook | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAuthor, setUploadAuthor] = useState('');
  const [uploadSystem, setUploadSystem] = useState<string>('Vastu');
  const [uploadEra, setUploadEra] = useState('Classical Vedic');
  const [uploadTags, setUploadTags] = useState('Vastu, Architecture, Remedies');
  const [uploadContent, setUploadContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Master Rule Config State
  const [ruleConfig, setRuleConfig] = useState<MasterRuleConfig | null>(null);
  const [isSavingRules, setIsSavingRules] = useState(false);
  const [ruleSaveMessage, setRuleSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
    fetchRules();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/books');
      if (res.ok) {
        const data = await res.json();
        setBooks(data.books || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRules = async () => {
    try {
      const res = await fetch('/api/admin/rules');
      if (res.ok) {
        const data = await res.json();
        setRuleConfig(data.config);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!uploadTitle) {
      setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setUploadContent(text);
    };
    reader.readAsText(file);
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadAuthor || !uploadContent) {
      setSubmitMessage({ type: 'error', text: 'Please fill in Title, Author, and Book Content.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const res = await fetch('/api/admin/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: uploadTitle,
          author: uploadAuthor,
          system: uploadSystem,
          classicalEra: uploadEra,
          tags: uploadTags.split(',').map((t) => t.trim()),
          textContent: uploadContent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmitMessage({
          type: 'success',
          text: `Successfully ingested "${uploadTitle}" into Vector Store with ${data.chunksCreated} semantic chunks!`,
        });
        setUploadTitle('');
        setUploadAuthor('');
        setUploadContent('');
        fetchBooks();
        setTimeout(() => setActiveTab('books'), 1500);
      } else {
        const err = await res.json();
        setSubmitMessage({ type: 'error', text: err.error || 'Failed to ingest book' });
      }
    } catch (err: any) {
      setSubmitMessage({ type: 'error', text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Are you sure you want to remove this book from the active RAG index?')) return;

    try {
      const res = await fetch(`/api/admin/books?id=${encodeURIComponent(bookId)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchBooks();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveRules = async () => {
    if (!ruleConfig) return;
    setIsSavingRules(true);
    setRuleSaveMessage(null);

    try {
      const res = await fetch('/api/admin/rules', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleConfig),
      });

      if (res.ok) {
        setRuleSaveMessage('Master Astro-Vastu System rules updated successfully!');
        setTimeout(() => setRuleSaveMessage(null), 3000);
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsSavingRules(false);
    }
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.system.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalChunks = books.reduce((acc, b) => acc + b.totalChunks, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <Database className="w-7 h-7 text-amber-400" />
              <span>Admin Knowledge Base & RAG Manager</span>
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Manage classical treatises (*Brihat Samhita, Vishwakarma Prakash, Mayamatam, BNN*), semantic chunking, and master system prompt rules.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center space-x-3">
          <div className="glass-panel px-4 py-2 rounded-xl text-center border-amber-500/20">
            <span className="block text-xs uppercase tracking-wider text-slate-400">Indexed Books</span>
            <span className="text-lg font-bold text-amber-300">{books.length}</span>
          </div>
          <div className="glass-panel px-4 py-2 rounded-xl text-center border-amber-500/20">
            <span className="block text-xs uppercase tracking-wider text-slate-400">RAG Chunks</span>
            <span className="text-lg font-bold text-emerald-400">{totalChunks}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 mt-6 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('books')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'books'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Reference Books ({books.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'upload'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload & Ingest Book</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'rules'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Prompt & Rule Configurator</span>
        </button>
      </div>

      {/* TAB 1: Books Table */}
      {activeTab === 'books' && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search reference books by title, author, system..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cosmic-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              onClick={fetchBooks}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-cosmic-900 border border-slate-700 hover:bg-slate-800 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Registry</span>
            </button>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-cosmic-900/90 text-slate-400 border-b border-slate-800 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Book Title & Author</th>
                    <th className="py-3 px-4">System</th>
                    <th className="py-3 px-4">Era</th>
                    <th className="py-3 px-4">Chunks</th>
                    <th className="py-3 px-4">Tags</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{book.title}</div>
                        <div className="text-[11px] text-slate-400">{book.author}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {book.system}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 text-xs">{book.classicalEra}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-emerald-400 font-semibold">{book.totalChunks} chunks</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {book.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedBook(book)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition"
                            title="Inspect Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {!book.isPreseeded && (
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                              title="Delete Book"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBooks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500 text-xs">
                        No reference books match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Upload New Reference Book */}
      {activeTab === 'upload' && (
        <div className="mt-6 max-w-3xl glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-amber-400" />
            <span>Ingest Classical Reference Book into RAG Store</span>
          </h2>

          {submitMessage && (
            <div
              className={`p-3 rounded-xl mb-4 text-xs flex items-center space-x-2 ${
                submitMessage.type === 'success'
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
              }`}
            >
              {submitMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{submitMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleBookSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Quick File Drop Area */}
            <div className="border-2 border-dashed border-slate-700/80 rounded-xl p-4 text-center hover:border-amber-500/50 transition bg-cosmic-950/50">
              <Upload className="w-6 h-6 mx-auto text-amber-400 mb-1" />
              <p className="text-xs text-slate-300 font-medium">Select TXT / Markdown file to populate content</p>
              <input
                type="file"
                accept=".txt,.md,.text"
                onChange={handleFileUpload}
                className="mt-2 text-xs text-slate-400 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-500/20 file:text-amber-300 hover:file:bg-amber-500/30 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Book Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Vishwakarma Prakash (Ayadi Section)"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-cosmic-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Author / Sage *</label>
                <input
                  type="text"
                  placeholder="e.g. Acharya Vishwakarma"
                  value={uploadAuthor}
                  onChange={(e) => setUploadAuthor(e.target.value)}
                  className="w-full bg-cosmic-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Astrological System</label>
                <select
                  value={uploadSystem}
                  onChange={(e) => setUploadSystem(e.target.value)}
                  className="w-full bg-cosmic-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Vastu">Vastu Shastra</option>
                  <option value="Parashari">Parashari</option>
                  <option value="Navatara">Navatara</option>
                  <option value="BNN">Bhrigu Nandi Nadi</option>
                  <option value="Jaimini">Jaimini</option>
                  <option value="Lal Kitab">Lal Kitab</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Classical Era</label>
                <input
                  type="text"
                  placeholder="e.g. Vedic Classic"
                  value={uploadEra}
                  onChange={(e) => setUploadEra(e.target.value)}
                  className="w-full bg-cosmic-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Doors, 16 Zones, Ishanya"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  className="w-full bg-cosmic-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Book Content / Passages * (Paragraphs are automatically chunked & tagged)
              </label>
              <textarea
                rows={8}
                placeholder="Paste classical Sanskrit translation, commentary, or Astro-Vastu rules here. Paragraph breaks (double linebreaks) will define semantic chunks with automatic keyword and direction tagging..."
                value={uploadContent}
                onChange={(e) => setUploadContent(e.target.value)}
                className="w-full bg-cosmic-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-yellow-400 text-cosmic-950 hover:from-amber-400 hover:to-yellow-300 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Chunking & Indexing...' : 'Index Book into Vector Store'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Master Rule & Prompt Configurator */}
      {activeTab === 'rules' && ruleConfig && (
        <div className="mt-6 max-w-4xl glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Master Astro-Vastu System Prompt & Rules Configurator</span>
            </h2>
            <button
              onClick={handleSaveRules}
              disabled={isSavingRules}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-cosmic-950 hover:bg-amber-400 transition"
            >
              {isSavingRules ? 'Saving...' : 'Save Rule Config'}
            </button>
          </div>

          {ruleSaveMessage && (
            <div className="p-3 rounded-xl text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{ruleSaveMessage}</span>
            </div>
          )}

          {/* Master Prompt */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Backend Master Astro-Vastu AI System Prompt
            </label>
            <textarea
              rows={6}
              value={ruleConfig.systemPrompt}
              onChange={(e) => setRuleConfig({ ...ruleConfig, systemPrompt: e.target.value })}
              className="w-full bg-cosmic-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Planet-Direction Mapping Grid */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Planet-to-Direction Vastu Grid (Immutable Classical Baseline)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(ruleConfig.planetDirectionMap).map(([planet, direction]) => (
                <div key={planet} className="p-2.5 rounded-xl bg-cosmic-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{planet}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                    {direction}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BNN Directional Trines */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Bhrigu Nandi Nadi (BNN) Element-to-Direction Mapping
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(ruleConfig.bnnTrineElements).map(([elem, dir]) => (
                <div key={elem} className="p-2.5 rounded-xl bg-cosmic-900/80 border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400 font-medium">{elem} Signs</div>
                  <div className="text-sm font-bold text-amber-400">{dir}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel max-w-2xl w-full rounded-2xl p-6 border border-amber-500/30 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedBook.title}</h3>
                <p className="text-xs text-amber-400 font-medium">{selectedBook.author} • {selectedBook.classicalEra}</p>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-300">
              <p><strong className="text-white">System:</strong> {selectedBook.system}</p>
              <p><strong className="text-white">Description:</strong> {selectedBook.description}</p>
              <p><strong className="text-white">Total Indexed Chunks:</strong> {selectedBook.totalChunks}</p>
              <div>
                <strong className="text-white">Tags:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedBook.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setSelectedBook(null)}
                className="px-4 py-1.5 rounded-xl text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
