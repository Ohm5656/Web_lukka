import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Calendar, CheckCircle2, ChevronLeft, Clock, ShoppingCart } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { articles, products } from "../../data";
import { formatPrice } from "../../lib/site";

export function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((item) => item.id === id) || articles[0];
  const relatedProducts = products.filter((product) => article.relatedProducts.includes(product.id)).slice(0, 3);

  const contentBlocks = article.content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="w-full bg-white pb-24">
      <section className="relative flex min-h-[430px] items-end overflow-hidden pb-16">
        <div className="absolute inset-0">
          <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/10" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link to="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white">
              <ChevronLeft className="h-4 w-4" />
              กลับไปหน้าบทความ
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge className="border-none bg-sky-500 text-white hover:bg-sky-500">{article.category}</Badge>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Calendar className="h-4 w-4 text-slate-400" />
                {article.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Clock className="h-4 w-4 text-slate-400" />
                ใช้อ่านประมาณ {article.readTime}
              </div>
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">{article.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="flex flex-col gap-12 lg:flex-row">
          <article className="w-full lg:w-2/3">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-950">สรุปสั้นก่อนอ่าน</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
                  <p className="text-sm leading-relaxed text-slate-600">บทความนี้ออกแบบให้เข้าใจง่าย เหมาะกับคนที่กำลังหาข้อมูลก่อนซื้อจริง</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
                  <p className="text-sm leading-relaxed text-slate-600">อ่านจบแล้วสามารถกดต่อไปยังสินค้าที่เกี่ยวข้องได้ทันทีโดยไม่ต้องกลับไปเริ่มใหม่</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
                  <p className="text-sm leading-relaxed text-slate-600">ถ้ายังไม่แน่ใจเรื่องรุ่น สามารถใช้บทความนี้เป็นจุดเริ่มก่อนเข้าไปเทียบหน้าสินค้าแต่ละตัว</p>
                </div>
              </div>
            </div>

            <div className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-headings:text-slate-950 prose-p:leading-relaxed prose-p:text-slate-600">
              {contentBlocks.map((block, index) =>
                block.startsWith("### ") ? (
                  <h3 key={`${block}-${index}`}>{block.replace("### ", "")}</h3>
                ) : (
                  <p key={`${block}-${index}`}>{block}</p>
                )
              )}
            </div>

            <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-slate-950">อ่านต่อแล้วเลือกซื้อให้ตรงขึ้น</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                ถ้าต้องการดูรุ่นจริงหลังอ่านบทความจบ สามารถไปที่หน้ารวมสินค้า หรือเลือกจากสินค้าที่เกี่ยวข้องด้านข้างได้ทันที
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-xl">
                  <Link to="/products">ดูสินค้าทั้งหมด</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/contact">ให้ทีมช่วยแนะนำเพิ่มเติม</Link>
                </Button>
              </div>
            </div>
          </article>

          <aside className="w-full lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-[2rem] border border-sky-100 bg-sky-50 p-8">
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                  <ShoppingCart className="h-5 w-5 text-sky-700" />
                  สินค้าที่เกี่ยวข้อง
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">เลือกดูรุ่นที่เชื่อมกับบทความนี้ไว้เป็นตัวอย่าง เพื่อพาไปยังหน้ารายละเอียดสินค้าได้ทันที</p>

                <div className="mt-6 space-y-4">
                  {relatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="group flex gap-4 rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-sky-200"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover mix-blend-multiply transition-transform group-hover:scale-105" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <h4 className="line-clamp-2 text-sm font-semibold text-slate-950 transition-colors group-hover:text-sky-700">{product.name}</h4>
                        <p className="mt-1 text-xs text-slate-500">{product.category}</p>
                        <span className="mt-2 font-bold text-slate-950">{formatPrice(product.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Button asChild className="mt-6 w-full rounded-xl bg-white text-slate-950 hover:bg-slate-100">
                  <Link to="/products">
                    ไปหน้ารวมสินค้า
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
