import * as React from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "../../components/ProductCard";
import { ArticleCard } from "../../components/ArticleCard";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { articles, categories, products } from "../../data";

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("featured");
  const [showFeaturedOnly, setShowFeaturedOnly] = React.useState(false);
  const [showNewOnly, setShowNewOnly] = React.useState(false);

  const categoryInfo = categories.find((category) => category.id === activeCategory);

  const filteredProducts = React.useMemo(() => {
    let result = products;

    if (activeCategory) {
      result = result.filter((product) => product.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.features.some((feature) => feature.toLowerCase().includes(q))
      );
    }

    if (showFeaturedOnly) {
      result = result.filter((product) => product.isFeatured);
    }

    if (showNewOnly) {
      result = result.filter((product) => product.isNew);
    }

    const sorted = [...result];
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name, "th"));
      default:
        return sorted.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
    }
  }, [activeCategory, searchQuery, showFeaturedOnly, showNewOnly, sortBy]);

  const relatedArticles = React.useMemo(() => {
    if (!activeCategory) {
      return articles.slice(0, 2);
    }
    return articles
      .filter((article) =>
        article.relatedProducts.some((productId) => products.find((product) => product.id === productId)?.categoryId === activeCategory)
      )
      .slice(0, 2);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="absolute inset-0 z-0">
          {categoryInfo ? (
            <img src={categoryInfo.image} alt={categoryInfo.name} className="h-full w-full object-cover opacity-[0.08]" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.1),_transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />
          )}
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100">
              {categoryInfo ? "หมวดสินค้า" : "สินค้าทั้งหมด"}
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {categoryInfo ? categoryInfo.name : "เลือกสินค้าที่เหมาะกับโต๊ะและวิธีใช้งานของคุณ"}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {categoryInfo
                ? categoryInfo.description
                : "รวมสินค้าในร้านทั้งหมด พร้อมระบบค้นหา จัดเรียง และป้ายกำกับที่ช่วยให้คุณคัดรุ่นที่ตรงกับงบและการใช้งานได้เร็วขึ้น"}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900">
                <SlidersHorizontal className="h-4 w-4" />
                <h2 className="text-sm font-semibold">หมวดหมู่สินค้า</h2>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setSearchParams({})}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${!activeCategory ? "bg-sky-100 text-sky-800" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
                >
                  สินค้าทั้งหมด
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSearchParams({ category: category.id })}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${activeCategory === category.id ? "bg-sky-100 text-sky-800" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

          

    
          </aside>

          <div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-md">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="ค้นหาชื่อสินค้า"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-sky-300"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <p className="text-sm text-slate-500">
                    พบ <span className="font-semibold text-slate-950">{filteredProducts.length}</span> รายการ
                  </p>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="min-w-[220px] appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-800 outline-none transition-colors focus:border-sky-300"
                    >
                      <option value="featured">เรียงตามรุ่นแนะนำ</option>
                      <option value="price-asc">ราคาน้อยไปมาก</option>
                      <option value="price-desc">ราคามากไปน้อย</option>
                      <option value="name">เรียงตามชื่อสินค้า</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                  <h3 className="text-xl font-semibold text-slate-950">ยังไม่พบสินค้าที่ตรงกับเงื่อนไข</h3>
                  <p className="mt-2 text-sm text-slate-600">ลองล้างคำค้นหา ปิดตัวกรอง หรือเปลี่ยนหมวดสินค้าแล้วดูอีกครั้ง</p>
                  <Button className="mt-5 rounded-xl" onClick={() => { setSearchQuery(""); setShowFeaturedOnly(false); setShowNewOnly(false); setSearchParams({}); }}>
                    ล้างตัวกรองทั้งหมด
                  </Button>
                </div>
              )}
            </div>

            {relatedArticles.length > 0 && (
              <div className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <Badge variant="secondary" className="bg-sky-100 text-sky-800">บทความที่เกี่ยวข้อง</Badge>
                    <h2 className="mt-3 text-2xl font-bold text-slate-950">อ่านเพิ่มก่อนตัดสินใจ</h2>
                    <p className="mt-2 text-sm text-slate-600">เนื้อหานี้จะช่วยให้คุณเข้าใจหมวดสินค้านี้มากขึ้นก่อนเลือกซื้อ</p>
                  </div>
                  <Button asChild variant="ghost" className="hidden md:inline-flex">
                    <Link to="/articles">ดูบทความทั้งหมด</Link>
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
