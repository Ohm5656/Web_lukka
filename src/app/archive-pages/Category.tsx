import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { PRODUCTS, CATEGORIES, ARTICLES } from '../../data';
import { ProductCard } from '../../components/ProductCard';
import { ArticleCard } from '../../components/ArticleCard';
import { SectionTitle, FadeIn, Button } from '../../components/ui';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

export function Category() {
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const category = categoryId === 'all' 
    ? { id: 'all', name: 'All Products', description: 'Explore our complete collection of workspace gear.', image: 'https://images.unsplash.com/photo-1658337069142-b4b81a4881eb?w=2000&q=80' }
    : CATEGORIES.find(c => c.id === categoryId);

  if (!category) return <div className="p-24 text-center">Category not found</div>;

  const filteredProducts = useMemo(() => {
    let prods = categoryId === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === categoryId);

    if (searchTerm) {
      prods = prods.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (sortBy) {
      case 'price-asc': return [...prods].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...prods].sort((a, b) => b.price - a.price);
      case 'newest': return [...prods].sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
      default: return prods;
    }
  }, [categoryId, searchTerm, sortBy]);

  // Find related articles simply by checking if the article's related products contain any product in this category
  const relatedArticles = ARTICLES.filter(article => 
    categoryId === 'all' || article.relatedProducts.some(rpId => PRODUCTS.find(p => p.id === rpId)?.category === categoryId)
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Category Hero */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[40vh] flex items-center pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 bg-slate-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Toolbar (Search & Sort) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="md:hidden flex-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div className="flex items-center gap-2 flex-1 md:flex-none">
                <span className="text-sm font-medium text-slate-500 hidden sm:inline-block">Sort by:</span>
                <div className="relative flex-1 md:w-48">
                  <select
                    className="block w-full pl-3 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar (Desktop Filters Mock) */}
            <aside className={`w-64 shrink-0 hidden lg:block`}>
              <div className="sticky top-28 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link 
                        to="/categories/all" 
                        className={`text-sm flex items-center justify-between ${categoryId === 'all' ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-blue-600'}`}
                      >
                        All Products
                        <span className="text-xs bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full">{PRODUCTS.length}</span>
                      </Link>
                    </li>
                    {CATEGORIES.map(cat => {
                      const count = PRODUCTS.filter(p => p.category === cat.id).length;
                      return (
                        <li key={cat.id}>
                          <Link 
                            to={`/categories/${cat.id}`} 
                            className={`text-sm flex items-center justify-between ${categoryId === cat.id ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-blue-600'}`}
                          >
                            {cat.name}
                            <span className="text-xs bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full">{count}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                {/* Mock Filter Sections */}
                {['Price Range', 'Brand', 'Availability'].map(filterGroup => (
                  <div key={filterGroup}>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">{filterGroup}</h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map(item => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                          <span className="text-sm text-slate-600 group-hover:text-slate-900">Option {item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
                  <p className="text-slate-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                  <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle 
              title="Related Buying Guides" 
              subtitle="Learn more before making your decision."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
