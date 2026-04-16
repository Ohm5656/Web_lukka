import * as React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import type { Article } from "../../data";
import { ArticleCard } from "../../components/ArticleCard";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { fetchArticles } from "../../lib/catalog-api";

const articleTabs = ["ทั้งหมด", "คู่มือเลือกซื้อ", "เทคนิคเลือกอุปกรณ์", "เริ่มต้นสำหรับมือใหม่"];

const articlesHeroBackground = "";

export function Articles() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("ทั้งหมด");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function loadArticles() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchArticles();
        if (!isMounted) return;
        setArticles(data);
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : "ไม่สามารถโหลดบทความได้ในตอนนี้");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredArticles = React.useMemo(() => {
    return articles.filter((article) => {
      const matchesTab = activeTab === "ทั้งหมด" || article.category === activeTab;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, articles, searchQuery]);

  const [featuredArticle, ...restArticles] = filteredArticles;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={articlesHeroBackground ? { backgroundImage: `url(${articlesHeroBackground})` } : undefined}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.28),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.16),_transparent_40%)]" />
        <div className="absolute inset-0 bg-slate-950/75" />

        <div className="container relative mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            <Badge className="mb-5 bg-white/10 text-sky-200 hover:bg-white/10">คลังบทความความรู้</Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">บทความให้ความรู้</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              รวมคู่มือและคำแนะนำที่ช่วยให้เลือกอุปกรณ์คอมได้ง่ายขึ้น ทั้งสายเล่นเกมและสายทำงาน
            </p>

            <div className="relative mt-8 w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                type="text"
                placeholder="ค้นหาหัวข้อที่สนใจ เช่น จอ 4K หรือ SSD"
                className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-11 pr-4 text-white outline-none placeholder:text-slate-400 focus:border-sky-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 flex gap-3 overflow-x-auto border-b border-slate-200 pb-3">
          {articleTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab ? "bg-sky-100 text-sky-800" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-slate-950">กำลังโหลดบทความ</h3>
            <p className="mt-2 text-sm text-slate-600">กำลังดึงข้อมูลจากระบบหลังบ้านของร้าน TechHaven</p>
          </div>
        ) : error ? (
          <div className="rounded-[1.75rem] border border-red-200 bg-red-50 px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-slate-950">โหลดบทความไม่สำเร็จ</h3>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
          </div>
        ) : featuredArticle ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8"
            >
              <div className="overflow-hidden rounded-[1.5rem]">
                <img src={featuredArticle.image} alt={featuredArticle.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit bg-sky-100 text-sky-800">
                  {featuredArticle.category}
                </Badge>
                <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950">{featuredArticle.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{featuredArticle.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <Button asChild size="lg" className="mt-8 w-fit rounded-xl">
                  <Link to={`/articles/${featuredArticle.id}`}>
                    อ่านบทความเต็ม <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="mt-12">
              <div className="mb-8 flex items-center gap-2 text-slate-900">
                <BookOpen className="h-5 w-5 text-sky-700" />
                <h3 className="text-2xl font-bold">บทความเพิ่มเติม</h3>
              </div>

              {restArticles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {restArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ArticleCard article={article} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                  <h3 className="text-xl font-semibold text-slate-950">เหลือบทความที่ตรงเงื่อนไขเพียงรายการเดียว</h3>
                  <p className="mt-2 text-sm text-slate-600">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดอื่นเพื่อดูบทความเพิ่มเติม</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-slate-950">ยังไม่พบบทความที่ตรงกับเงื่อนไข</h3>
            <p className="mt-2 text-sm text-slate-600">ลองล้างคำค้นหา หรือเปลี่ยนหมวดบทความที่เลือกอยู่</p>
          </div>
        )}
      </section>
    </div>
  );
}
