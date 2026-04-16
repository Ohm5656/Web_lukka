import * as React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Article, Category, Product } from "../../data";
import { Section } from "../../components/Section";
import { ProductCard } from "../../components/ProductCard";
import { ArticleCard } from "../../components/ArticleCard";
import { Button } from "../../components/ui/Button";
import { fetchArticles, fetchCategories, fetchProducts } from "../../lib/catalog-api";

const testimonials = [
  {
    quote: "ชอบที่เว็บไม่ได้แค่ลงสินค้า แต่ช่วยให้เห็นภาพว่ารุ่นไหนเหมาะกับการใช้งานของเรา ทำให้ตัดสินใจง่ายขึ้นเยอะ",
    name: "มะปราง",
    role: "นักศึกษามหาวิทยาลัย",
  },
  {
    quote: "สินค้าเยอะดีครับ มีให้เลือกหลายแบบ แถมบทความช่วยให้เข้าใจสเปคและการใช้งานได้ดีมากๆ ",
    name: "ธีร์",
    role: "พนักงานออฟฟิศ",
  },
  {
    quote: "ของมาส่งไว แพ็จเกจดีมากครับ แถมมีบทความให้ความรู้ก่อนซื้อด้วย ชอบมากๆ เลยครับ",
    name: "ต้นน้ำ",
    role: "ฟรีแลนซ์สายครีเอทีฟ",
  },
];

const sectionIntroVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" },
  },
};

const sectionItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: "easeOut", delay: index * 0.08 },
  }),
};

export function Home() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        setIsLoading(true);
        setError(null);

        const [categoriesData, productsData, articlesData] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
          fetchArticles(),
        ]);

        if (!isMounted) return;

        setCategories(categoriesData);
        setProducts(productsData);
        setArticles(articlesData);
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : "ไม่สามารถโหลดข้อมูลหน้าแรกได้");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProducts = React.useMemo(
    () => products.filter((product) => product.isFeatured).slice(0, 8),
    [products],
  );
  const recentArticles = React.useMemo(() => articles.slice(0, 3), [articles]);

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-slate-50 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.14),_transparent_36%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1625461291092-13d0c45608b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
            alt="Clean computer desk setup"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/20 to-white/0" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 md:text-6xl lg:text-7xl lg:leading-[1.05]">
                ขายอุปกรณ์ฮาร์ดแวร์
                <span className="mt-2 block text-sky-600">สำหรับคอมพิวเตอร์</span>
                <span className="mt-2 block text-sky-600">ครบจบในที่เดียว</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                TechHaven ร้านขายอุปกรณ์คอม พร้อมบทความและข้อมูลแนะนำสำหรับคนที่อยากเลือกให้คุ้มและตรงการใช้งาน
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="h-14 rounded-xl px-8 text-base shadow-lg shadow-sky-600/15">
                  <Link to="/products">
                    ดูสินค้าทั้งหมด
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 rounded-xl bg-white/70 px-8 text-base">
                  <Link to="/articles">อ่านบทความแนะนำก่อนซื้อ</Link>
                </Button>
              </div>

              {error && (
                <div className="mt-5 inline-flex rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  โหลดข้อมูลบางส่วนไม่สำเร็จ: {error}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Section className="bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={sectionIntroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mb-12 flex flex-col items-center text-center"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-700">เลือกตามหมวดได้ง่าย</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">หมวดหมู่สินค้า</h2>
              <p className="mt-3 text-lg text-slate-600">รวมหมวดสินค้าของร้าน TechHaven ไว้ให้เลือกต่อได้สะดวก</p>
            </div>
            <Button variant="ghost" className="group mt-5 hidden md:inline-flex" asChild>
              <Link to="/products">
                ดูสินค้าทั้งหมด <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {isLoading ? (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-14 text-center">
              <h3 className="text-xl font-semibold text-slate-950">กำลังโหลดหมวดสินค้า</h3>
              <p className="mt-2 text-sm text-slate-600">กำลังดึงข้อมูลจากระบบหลังบ้าน</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-5">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={sectionItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <Link
                    to={`/products?category=${category.id}`}
                    className="group block rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-sky-700 transition-colors group-hover:bg-sky-50">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-950">{category.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{category.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={sectionIntroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mb-12 flex flex-col items-center text-center"
          >
            <div className="max-w-3xl">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700 shadow-sm shadow-red-900/10">
                  <ShoppingCart className="h-6 w-6" />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">สินค้าของเรา</h2>
            </div>
            <Button variant="ghost" className="group mt-5 hidden md:inline-flex" asChild>
              <Link to="/products">
                ดูสินค้าทั้งหมด <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {isLoading ? (
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <h3 className="text-xl font-semibold text-slate-950">กำลังโหลดสินค้าแนะนำ</h3>
              <p className="mt-2 text-sm text-slate-600">รอสักครู่ เรากำลังดึงข้อมูลสินค้าจริงจากระบบ</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={sectionItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={sectionIntroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mb-12 flex flex-col items-center text-center"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-700">บทความแนะนำ</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">บทความให้ความรู้</h2>
              <p className="mt-3 text-lg text-slate-600">รวมคู่มือและคำแนะนำที่ช่วยให้เข้าใจได้ง่ายก่อนตัดสินใจซื้อ</p>
            </div>
            <Button variant="ghost" className="group mt-5 hidden md:inline-flex" asChild>
              <Link to="/articles">
                ดูบทความทั้งหมด <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {isLoading ? (
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <h3 className="text-xl font-semibold text-slate-950">กำลังโหลดบทความแนะนำ</h3>
              <p className="mt-2 text-sm text-slate-600">กำลังดึงข้อมูลบทความจาก API</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {recentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={sectionItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={sectionIntroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mb-12 flex flex-col items-center text-center"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-700">เสียงจากผู้ใช้งาน</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">รีวิวจากผู้ใช้งาน</h2>
              <p className="mt-3 text-lg text-slate-600">จากคนที่ใช้งานและอ่านข้อมูลของร้านก่อนตัดสินใจซื้อจริง</p>
            </div>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                variants={sectionItemVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true, amount: 0.25 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-base leading-relaxed text-slate-700">"{item.quote}"</p>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-medium text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_45%,#f8fafc_100%)] p-8 md:p-14">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">อยากดูข้อมูลให้ครบก่อนตัดสินใจ?</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                ดูสินค้าที่เราแนะนำต่อ หรือคุยกับทีมเพื่อให้ช่วยแนะนำอุปกรณ์ที่เหมาะกับงบและการใช้งานของคุณ
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-xl px-6">
                  <Link to="/products">ดูสินค้าทั้งหมด</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-xl px-6">
                  <Link to="/contact">คุยกับทีมแนะนำสินค้า</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
