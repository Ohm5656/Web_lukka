import { useParams, Link } from 'react-router';
import { ARTICLES, PRODUCTS } from '../../data';
import { ProductCard } from '../../components/ProductCard';
import { FadeIn, Button } from '../../components/ui';
import { Calendar, Clock, ChevronRight, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

export function Article() {
  const { articleId } = useParams();
  
  // Also handle listing page if no ID is provided, but we'll assume the route setup handles this or we create a separate ArticleList
  // For now this is specifically the detail template.
  
  const article = ARTICLES.find(a => a.id === articleId);

  if (!article) return <div className="p-24 text-center">Article not found</div>;

  const relatedProducts = article.relatedProducts.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as typeof PRODUCTS;

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-slate-900 flex items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-300 mb-6 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {article.excerpt}
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Content Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Markdown-ish content rendering mock */}
        <div className="prose prose-lg prose-slate max-w-none text-slate-700 font-serif leading-relaxed space-y-8">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-sans tracking-tight">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.match(/^[0-9]\. /)) {
              return (
                <div key={idx} className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0 mt-1">
                    {paragraph.split('. ')[0]}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900 font-sans mb-2 text-xl">
                      {paragraph.split('. ')[1].split(':')[0]}
                    </h4>
                    <p className="mb-0 text-slate-600">
                      {paragraph.split(':').slice(1).join(':').trim()}
                    </p>
                  </div>
                </div>
              );
            }
            return <p key={idx} className="mb-6">{paragraph}</p>;
          })}
        </div>

        {/* Share & Meta */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/100?img=11" alt="Author" className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Written by Workspace Expert</p>
              <p className="text-xs text-slate-500">Tech & Design Enthusiast</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">Share this guide:</span>
            <div className="flex gap-2">
              {[Twitter, Facebook, LinkIcon].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-200">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* Recommended Products based on article */}
      {relatedProducts.length > 0 && (
        <section className="bg-slate-50 py-24 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Gear Mentioned in this Guide</h2>
              <p className="text-lg text-slate-600">Start building your ideal setup with these recommended items.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link to="/categories/all">Shop All Setup Gear</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Explore More Articles */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Ready to learn more?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {ARTICLES.filter(a => a.id !== articleId).slice(0, 2).map((a, i) => (
              <Link 
                key={a.id}
                to={`/articles/${a.id}`}
                className="group flex gap-6 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left items-center bg-slate-50"
              >
                <img src={a.image} alt="" className="w-24 h-24 rounded-xl object-cover shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-2 mb-2">
                    {a.title}
                  </h3>
                  <span className="text-sm text-blue-600 font-medium flex items-center">
                    Read Guide <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link to="/articles">View All Guides</Link>
          </Button>
        </div>
      </section>

    </article>
  );
}
