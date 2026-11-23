import React, { useEffect, useState } from 'react';
import {
  Search,
  Bookmark,
  Download,
  Share2,
  ArrowLeft,
  ArrowRight,
  Check,
} from 'lucide-react';
import {
  INSIGHT_ARTICLES,
  ArticleCategory,
  InsightArticle,
  DOWNLOADABLE_RESOURCES,
  PODCAST_INFO,
} from '../data/editorialData';
import { useRouter } from '../context/RouterContext';

const CATEGORIES: ArticleCategory[] = [
  'Todos',
  'Investigación',
  'Neuromarketing',
  'Percepción',
  'Comportamiento',
  'Curiosidades',
];

const FAVORITES_STORAGE_KEY = 'sensia_insights_favorites_v1';

export const InsightsPage: React.FC = () => {
  const { articleSlug, navigate } = useRouter();

  const [categoryFilter, setCategoryFilter] = useState<ArticleCategory>('Todos');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota errors
    }
  }, [favorites]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleShare = async (article: InsightArticle) => {
    const shareUrl = `${window.location.origin}/insights/${article.slug}`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setCopiedSlug(article.slug);
      setTimeout(() => setCopiedSlug(null), 2200);
    } catch {
      setCopiedSlug(article.slug);
      setTimeout(() => setCopiedSlug(null), 2200);
    }
  };

  const handleDownloadResource = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus(null);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!emailValid) {
      setNewsletterError('Introduce una dirección de correo electrónico válida.');
      return;
    }
    if (!newsletterConsent) {
      setNewsletterError('Debes aceptar el consentimiento explícito de privacidad.');
      return;
    }
    setNewsletterError('');
    setNewsletterStatus(
      `Validación completada para ${newsletterEmail.trim()}. Este entorno no tiene aún un proveedor de newsletter externo conectado, por lo que no se ha enviado ningún correo real ni almacenado tu dirección en servidores remotos.`
    );
  };

  const allTags = Array.from(new Set(INSIGHT_ARTICLES.flatMap((a) => a.tags)));

  const activeArticle = articleSlug
    ? INSIGHT_ARTICLES.find((a) => a.slug === articleSlug) ?? null
    : null;

  // Article Reader View (9-part structure)
  if (activeArticle) {
    const currentIndex = INSIGHT_ARTICLES.findIndex((a) => a.slug === activeArticle.slug);
    const prevArticle = currentIndex > 0 ? INSIGHT_ARTICLES[currentIndex - 1] : null;
    const nextArticle =
      currentIndex < INSIGHT_ARTICLES.length - 1 ? INSIGHT_ARTICLES[currentIndex + 1] : null;
    const relatedArticles = INSIGHT_ARTICLES.filter(
      (a) =>
        a.slug !== activeArticle.slug &&
        (a.category === activeArticle.category ||
          a.tags.some((t) => activeArticle.tags.includes(t)))
    ).slice(0, 2);

    const isFav = favorites.includes(activeArticle.slug);

    return (
      <article className="bg-white text-black py-12 lg:py-20">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          {/* Top Navigation & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/15">
            <button
              type="button"
              onClick={() => navigate('/insights')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black hover:text-[#0042FD] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a SENSIA Insights</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleFavorite(activeArticle.slug)}
                aria-pressed={isFav}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 border text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                  isFav
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/20 hover:border-black'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isFav ? 'Guardado' : 'Guardar'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleShare(activeArticle)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-black/20 hover:border-black text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                {copiedSlug === activeArticle.slug ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00D6B6]" aria-hidden="true" />
                    <span>Enlace copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Compartir</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 1. Título & Tipología */}
          <header className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-black/60">
              <span className="font-semibold text-[#0042FD]">{activeArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-black">{activeArticle.typology}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] text-black">
              {activeArticle.title}
            </h1>

            {/* 2. Introducción */}
            <p className="text-lg sm:text-xl text-black/80 leading-relaxed max-w-3xl">
              {activeArticle.introduction}
            </p>
          </header>

          {activeArticle.coverImage && (
            <figure className="space-y-2">
              <div className="aspect-[16/9] bg-neutral-100 overflow-hidden border border-black/10">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.coverAlt ?? activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs text-black/55">
                Imagen editorial conceptual · SENSIA Insights
              </figcaption>
            </figure>
          )}

          {/* 3–9 Structured Research Sections */}
          <div className="space-y-10 max-w-3xl pt-4">
            {/* 3. Pregunta de investigación */}
            <section className="p-6 bg-neutral-50 border border-black/15 space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                Pregunta de investigación
              </h2>
              <p className="font-display text-lg sm:text-xl text-black">
                {activeArticle.researchQuestion}
              </p>
            </section>

            {/* 4. Explicación del fenómeno */}
            <section className="space-y-3">
              <h2 className="font-display text-2xl text-black">Explicación del fenómeno</h2>
              <p className="text-base text-black/80 leading-relaxed">
                {activeArticle.phenomenonExplanation}
              </p>
            </section>

            {/* 5. Estudio o evidencia */}
            <section className="space-y-3">
              <h2 className="font-display text-2xl text-black">Estudio o evidencia</h2>
              <p className="text-base text-black/80 leading-relaxed">
                {activeArticle.studyOrEvidence}
              </p>
            </section>

            {/* 6. Metodología y muestra (cuando disponible) */}
            {activeArticle.methodologyAndSample && (
              <section className="space-y-3">
                <h2 className="font-display text-2xl text-black">Metodología y alcance</h2>
                <p className="text-base text-black/80 leading-relaxed">
                  {activeArticle.methodologyAndSample}
                </p>
              </section>
            )}

            {/* 7. Hallazgos */}
            <section className="space-y-3">
              <h2 className="font-display text-2xl text-black">Hallazgos clave</h2>
              <ul className="space-y-2.5 text-base text-black/80">
                {activeArticle.findings.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-[#0042FD] font-bold" aria-hidden="true">
                      ·
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. Aplicación al marketing */}
            <section className="p-6 border border-black bg-black text-white space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
                Aplicación al marketing y la estrategia
              </h2>
              <p className="text-base text-white/90 leading-relaxed">
                {activeArticle.marketingApplication}
              </p>
            </section>

            {/* 9. Fuentes y referencias */}
            <section className="space-y-3 pt-4 border-t border-black/15">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-black/55">
                Fuentes y referencias bibliográficas
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm text-black/70">
                {activeArticle.sources.map((src) => (
                  <li key={src}>{src}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Article-to-Article Navigation */}
          <nav
            aria-label="Navegación entre artículos"
            className="pt-8 border-t border-black/15 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {prevArticle ? (
              <button
                type="button"
                onClick={() => navigate(`/insights/${prevArticle.slug}`)}
                className="text-left p-5 border border-black/15 hover:border-black transition-colors cursor-pointer space-y-1"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Artículo anterior</span>
                </span>
                <span className="block font-display text-base text-black">
                  {prevArticle.title}
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextArticle && (
              <button
                type="button"
                onClick={() => navigate(`/insights/${nextArticle.slug}`)}
                className="text-left sm:text-right p-5 border border-black/15 hover:border-black transition-colors cursor-pointer space-y-1"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 inline-flex items-center gap-1.5 sm:justify-end">
                  <span>Siguiente artículo</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                <span className="block font-display text-base text-black">
                  {nextArticle.title}
                </span>
              </button>
            )}
          </nav>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="pt-8 border-t border-black/15 space-y-6">
              <h2 className="font-display text-2xl text-black">Artículos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.slug}
                    className="p-6 border border-black/15 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-xs text-black/55">
                        {rel.category} · {rel.typology}
                      </span>
                      <h3 className="font-display text-lg text-black">{rel.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/insights/${rel.slug}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0042FD] hover:underline cursor-pointer self-start"
                    >
                      <span>Leer artículo</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    );
  }

  // Magazine Overview Mode
  const featuredArticle = INSIGHT_ARTICLES.find((a) => a.featured) ?? INSIGHT_ARTICLES[0];

  const filteredArticles = INSIGHT_ARTICLES.filter((article) => {
    const matchesCategory =
      categoryFilter === 'Todos' || article.category === categoryFilter;
    const matchesTag = !tagFilter || article.tags.includes(tagFilter);
    const matchesFav = !onlyFavorites || favorites.includes(article.slug);
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.introduction.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesTag && matchesFav && matchesSearch;
  });

  return (
    <div>
      {/* Editorial Magazine Masthead */}
      <section className="bg-white text-black py-16 lg:py-24 border-b border-black/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                SENSIA Insights · Revista digital de investigación
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-[1.03]">
                UNA PREGUNTA PUEDE CAMBIARLO TODO.
              </h1>
            </div>
            <p className="text-sm sm:text-base text-black/70 max-w-md">
              Divulgación rigurosa sobre percepción, atención, toma de decisiones y comportamiento
              humano aplicada a marcas.
            </p>
          </div>

          {/* Search, Category Filter & Favorites Filter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4">
            <div className="lg:col-span-4 relative">
              <label htmlFor="insights-search" className="sr-only">
                Buscar artículos en SENSIA Insights
              </label>
              <Search
                className="w-4 h-4 text-black/45 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="insights-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tema, concepto o etiqueta..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/20 focus:border-[#0042FD] focus:outline-none text-sm text-black"
              />
            </div>

            <div
              className="lg:col-span-6 flex flex-wrap gap-2 items-center"
              role="group"
              aria-label="Categorías de artículos"
            >
              {CATEGORIES.map((cat) => {
                const active = categoryFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    aria-pressed={active}
                    className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black/80 border-black/20 hover:border-black'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-2 flex lg:justify-end">
              <button
                type="button"
                onClick={() => setOnlyFavorites((v) => !v)}
                aria-pressed={onlyFavorites}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border cursor-pointer whitespace-nowrap ${
                  onlyFavorites
                    ? 'bg-[#0042FD] text-white border-[#0042FD]'
                    : 'bg-white text-black border-black/20 hover:border-black'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="tabular-nums">Favoritos ({favorites.length})</span>
              </button>
            </div>
          </div>

          {/* Interactive Tag Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-black/50 mr-1">
              Etiquetas:
            </span>
            {tagFilter && (
              <button
                type="button"
                onClick={() => setTagFilter(null)}
                className="px-2.5 py-1 bg-black text-white text-xs font-medium cursor-pointer"
              >
                Todas ×
              </button>
            )}
            {allTags.map((tag) => {
              const active = tagFilter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTagFilter(active ? null : tag)}
                  aria-pressed={active}
                  className={`px-2.5 py-1 border text-xs transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0042FD] text-white border-[#0042FD]'
                      : 'bg-white text-black/70 border-black/15 hover:border-black'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {!onlyFavorites && categoryFilter === 'Todos' && !tagFilter && !searchQuery && (
        <section className="py-12 lg:py-16 bg-white border-b border-black/15">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-black">
              <div className="lg:col-span-6 bg-neutral-100 aspect-[16/9] lg:aspect-auto">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.coverAlt ?? featuredArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-black/60">
                    <span className="font-semibold text-[#0042FD] uppercase tracking-wider">
                      Artículo destacado
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.typology}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-black leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-base text-black/75 leading-relaxed">
                    {featuredArticle.introduction}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-black/10">
                  <button
                    type="button"
                    onClick={() => navigate(`/insights/${featuredArticle.slug}`)}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Leer investigación completa</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(featuredArticle.slug)}
                    aria-label="Guardar artículo destacado en favoritos"
                    className="p-2.5 border border-black/15 hover:border-black cursor-pointer"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        favorites.includes(featuredArticle.slug) ? 'fill-black text-black' : 'text-black/60'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section id="investigaciones" className="py-16 lg:py-20 bg-white scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-black">Últimos artículos e investigaciones</h2>
            <span className="text-xs text-black/55 tabular-nums">
              {filteredArticles.length} publicación{filteredArticles.length === 1 ? '' : 'es'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-12 border border-black/15 text-center space-y-3">
              <p className="font-display text-xl text-black">
                No hay artículos que coincidan con este filtro.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('Todos');
                  setTagFilter(null);
                  setSearchQuery('');
                  setOnlyFavorites(false);
                }}
                className="text-xs font-semibold uppercase tracking-wider text-[#0042FD] underline cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => {
                const isFav = favorites.includes(article.slug);
                return (
                  <article
                    key={article.slug}
                    className="border border-black/15 bg-white p-6 sm:p-8 flex flex-col justify-between gap-6"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs text-black/55">
                        <span>
                          <strong className="text-black">{article.category}</strong> ·{' '}
                          {article.typology}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(article.slug)}
                          aria-label={isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                          className="p-1 hover:text-black cursor-pointer"
                        >
                          <Bookmark
                            className={`w-4 h-4 ${isFav ? 'fill-black text-black' : 'text-black/45'}`}
                          />
                        </button>
                      </div>

                      <h3 className="font-display text-xl text-black leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-black/75 leading-relaxed">{article.introduction}</p>

                      <p className="text-xs text-black/50 pt-1">
                        {article.tags.join(' · ')}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => navigate(`/insights/${article.slug}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0042FD] hover:underline cursor-pointer"
                      >
                        <span>Leer artículo</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare(article)}
                        className="text-xs font-medium text-black/55 hover:text-black cursor-pointer"
                      >
                        {copiedSlug === article.slug ? 'Copiado' : 'Compartir'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Downloadable Resources & Newsletter */}
      <section id="recursos" className="py-16 lg:py-24 bg-neutral-50 border-t border-black/15 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Resources */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0042FD]">
                Recursos gratuitos
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-black">
                Guías, checklists y plantillas divulgativas
              </h2>
            </div>

            <div className="space-y-4">
              {DOWNLOADABLE_RESOURCES.map((res) => (
                <div
                  key={res.id}
                  className="p-6 bg-white border border-black/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs text-black/55">
                      <strong className="text-[#0042FD]">{res.kind}</strong> · {res.formatLabel}
                    </span>
                    <h3 className="font-display text-base sm:text-lg text-black">{res.title}</h3>
                    <p className="text-xs sm:text-sm text-black/70">{res.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadResource(res.filename, res.content)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white hover:bg-[#0042FD] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer self-start sm:self-center"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Descargar</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter: TU DOSIS DE CURIOSIDAD HUMANA. */}
          <div className="lg:col-span-6 bg-black text-white p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00D6B6]">
                Newsletter editorial
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">
                TU DOSIS DE CURIOSIDAD HUMANA.
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Ideas, investigaciones y descubrimientos sobre cómo pensamos, sentimos y decidimos.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="w-full px-4 py-3.5 bg-white/10 border border-white/25 focus:border-[#00D6B6] focus:outline-none text-sm text-white placeholder:text-white/45"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-2.5 text-xs text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={(e) => setNewsletterConsent(e.target.checked)}
                    className="mt-0.5 accent-[#00D6B6]"
                  />
                  <span>
                    Acepto recibir publicaciones de SENSIA LABs y he leído la{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacyInfo((v) => !v)}
                      className="underline text-[#00D6B6] cursor-pointer"
                    >
                      política de privacidad
                    </button>
                    .
                  </span>
                </label>

                {showPrivacyInfo && (
                  <p className="text-xs text-white/65 bg-white/5 p-3 border border-white/15">
                    Política de privacidad: SENSIA LABs trata los datos únicamente para enviar
                    comunicaciones editoriales cuando exista un sistema de suscripción activo, sin
                    cesión a terceros y con baja en cualquier momento.
                  </p>
                )}
              </div>

              {newsletterError && (
                <p role="alert" className="text-xs font-medium text-[#FFD203]">
                  {newsletterError}
                </p>
              )}

              {newsletterStatus && (
                <p
                  role="status"
                  className="text-xs text-[#00D6B6] bg-white/5 p-3.5 border border-[#00D6B6]/40 leading-relaxed"
                >
                  {newsletterStatus}
                </p>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#0042FD] hover:bg-[#00D6B6] hover:text-black text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Suscribirme a SENSIA Insights
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Podcast SENSIA LABs */}
      <section id="podcast" className="py-16 lg:py-24 bg-white border-t border-black/15 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-4">
              <div className="aspect-square bg-neutral-100 border border-black/15 overflow-hidden">
                <img
                  src={PODCAST_INFO.coverImage}
                  alt={PODCAST_INFO.coverAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FE5D0A]">
                  {PODCAST_INFO.subtitle}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black">
                  {PODCAST_INFO.title}
                </h2>
                <p className="text-base sm:text-lg text-black/75 max-w-2xl leading-relaxed">
                  {PODCAST_INFO.description}
                </p>
              </div>

              {PODCAST_INFO.episodes.length > 0 ? (
                <div className="space-y-3">
                  {PODCAST_INFO.episodes.map((ep) => (
                    <div
                      key={ep.id}
                      className="p-4 border border-black/15 flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-xs font-semibold text-[#0042FD]">{ep.number}</span>
                        <h3 className="font-display text-base text-black">{ep.title}</h3>
                      </div>
                      <span className="text-xs text-black/55 tabular-nums">{ep.duration}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-neutral-50 border border-black/15 space-y-3">
                  <p className="font-display text-lg text-black">
                    Espacio sonoro preparado para próximos episodios
                  </p>
                  <p className="text-sm text-black/70">
                    No publicamos episodios ficticios. A medida que se graben y publiquen las
                    primeras conversaciones, aparecerán aquí junto con su reproductor y los enlaces
                    directos a plataformas de audio.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {PODCAST_INFO.platforms.map((plat) =>
                  plat.url ? (
                    <a
                      key={plat.label}
                      href={plat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-black text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                    >
                      {plat.label}
                    </a>
                  ) : (
                    <span
                      key={plat.label}
                      className="px-4 py-2 border border-black/20 text-xs font-semibold uppercase tracking-wider text-black/45"
                    >
                      {plat.label} (próximamente)
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
