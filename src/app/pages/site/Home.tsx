import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Section } from "../../components/Section";
import { ProductCard } from "../../components/ProductCard";
import { ArticleCard } from "../../components/ArticleCard";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { categories, products, articles } from "../../data";

const trustPoints = [
  { icon: ShieldCheck, title: "คัดสินค้าที่ใช้งานจริง", desc: "ไม่ยัดรุ่นเยอะเกินจำเป็นจนเลือกยาก" },
  { icon: Zap, title: "ช่วยแนะนำก่อนซื้อ", desc: "มีทั้งบทความและทีมหน้าร้านให้คำปรึกษา" },
  { icon: CheckCircle2, title: "ข้อมูลอ่านง่าย", desc: "สเปก จุดเด่น และเหมาะกับใครดูได้ทันที" },
  { icon: MapPin, title: "มีหน้าร้านให้ดูจริง", desc: "แวะมาลองสินค้าและพูดคุยก่อนตัดสินใจได้" },
];

const testimonials = [
  {
    quote: "ชอบที่เว็บไม่ได้ขายอย่างเดียว แต่ช่วยอธิบายให้เข้าใจว่ารุ่นไหนเหมาะกับเรา ทำให้ตัดสินใจง่ายขึ้นมาก",
    name: "มะปราง",
    role: "นักศึกษามหาวิทยาลัย",
  },
  {
    quote: "โครงหน้าอ่านง่าย ดูสะอาด และมีบทความโยงกับสินค้าแบบไม่ยัดเยียด เหมือนมีคนช่วยเลือกให้ตลอดทาง",
    name: "ธีร์",
    role: "พนักงานออฟฟิศ",
  },
  {
    quote: "ผมชอบที่มีหน้าร้านกับข้อมูลติดต่อชัดเจน รู้สึกน่าเชื่อถือกว่าเว็บขายของทั่วไปมาก",
    name: "ต้นน้ำ",
    role: "ฟรีแลนซ์สายครีเอทีฟ",
  },
];

export function Home() {
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 8);
  const recentArticles = articles.slice(0, 3);

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-slate-50 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.14),_transparent_36%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1625461291092-13d0c45608b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
            alt="โต๊ะคอมสไตล์ clean setup"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/20 to-white/0" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-5 bg-sky-100 text-sky-800 hover:bg-sky-100">ร้านอุปกรณ์คอมที่ช่วยแนะนำก่อนซื้อ</Badge>
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 md:text-6xl lg:text-7xl lg:leading-[1.05]">
                เลือกอุปกรณ์คอมได้ง่ายขึ้น
                <span className="mt-2 block text-sky-700">ทั้งสายใช้งานจริงและสายจัดโต๊ะให้ดูดี</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                TechHaven รวมสินค้าคอมที่คัดมาแล้วพร้อมบทความความรู้ ช่วยให้คุณเทียบรุ่น ดูสเปก และตัดสินใจซื้อได้มั่นใจขึ้นในที่เดียว
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="h-14 rounded-xl px-8 text-base shadow-lg shadow-sky-600/15">
                  <Link to="/products">
                    ดูสินค้าทั้งหมด
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 rounded-xl px-8 text-base bg-white/70">
                  <Link to="/articles">อ่านบทความแนะนำก่อนซื้อ</Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-slate-200 bg-white/80 p-5 backdrop-blur md:grid-cols-3">
                <div>
                  <p className="text-2xl font-semibold text-slate-950">50+</p>
                  <p className="text-sm text-slate-600">สินค้าตัวอย่างที่จัดเป็นระบบเดียวกันพร้อมต่อยอด</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-950">5 หมวดหลัก</p>
                  <p className="text-sm text-slate-600">ตั้งแต่คีย์บอร์ด เมาส์ จอ หูฟัง ไปจนถึง SSD</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-950">ความรู้ + การขาย</p>
                  <p className="text-sm text-slate-600">ทุกเส้นทางออกแบบให้ผู้ใช้ตัดสินใจง่ายขึ้น ไม่ใช่แค่คลิกซื้อ</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {trustPoints.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-700">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Section className="bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-sky-700">เลือกตามหมวดได้ง่าย</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">หมวดสินค้าหลักของร้าน</h2>
              <p className="mt-3 text-lg text-slate-600">ทุกหมวดมีทั้งหน้ารวมสินค้าและบทความประกอบ เพื่อช่วยให้เปรียบเทียบและตัดสินใจได้ง่ายขึ้น</p>
            </div>
            <Button variant="ghost" className="group hidden md:inline-flex" asChild>
              <Link to="/products">
                ดูสินค้าทั้งหมด <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-5">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
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
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">รุ่นแนะนำ</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">สินค้าที่เหมาะกับคนเริ่มจัดเซ็ตและใช้งานจริง</h2>
              <p className="mt-3 text-lg text-slate-600">เราเลือกทั้งรุ่นที่คุ้มสำหรับเริ่มต้นและรุ่นที่เหมาะกับคนทำงานหรือใช้ต่อเนื่องหลายชั่วโมง</p>
            </div>
              <Button variant="ghost" className="group hidden md:inline-flex" asChild>
                <Link to="/products">
                  ดูสินค้าทั้งหมด <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-slate-950 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-slate-800 bg-white/5 p-8">
              <p className="text-sm font-medium text-sky-300">ดีลประจำสัปดาห์</p>
              <h2 className="mt-3 text-3xl font-bold">ซื้อเป็นเซ็ตคุ้มกว่า ซื้อทีละชิ้น</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
                ถ้ากำลังเริ่มจัดโต๊ะใหม่ เราแนะนำให้เริ่มจากคีย์บอร์ด + เมาส์ + จอ ที่โทนเดียวกันก่อน จะได้ทั้งความลงตัวและใช้งานจริงที่รู้สึกดีขึ้นทันที
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-xl bg-white text-slate-950 hover:bg-slate-100">
                    <Link to="/products">ดูสินค้าที่แนะนำ</Link>
                  </Button>
                <Button asChild variant="outline" className="rounded-xl border-slate-700 bg-transparent text-white hover:bg-slate-900">
                  <Link to="/store">นัดดูสินค้าที่หน้าร้าน</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "โค้ดลดเพิ่มสำหรับของใหม่ประจำเดือน",
                "เซ็ตแนะนำสำหรับมือใหม่ที่อยากเริ่มแบบไม่ซื้อเกินจำเป็น",
                "บทความและสินค้าที่เชื่อมกันทุกหมวด",
                "มีหน้าร้านจริงและข้อมูลติดต่อชัดเจน",
              ].map((item) => (
                <div key={item} className="rounded-[1.75rem] border border-slate-800 bg-white/5 p-5 text-sm leading-relaxed text-slate-200">
                  <Sparkles className="mb-3 h-5 w-5 text-sky-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-sky-700">บทความแนะนำ</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">อ่านก่อนซื้อ ช่วยให้เลือกได้ตรงขึ้น</h2>
              <p className="mt-3 text-lg text-slate-600">ตั้งแต่คู่มือสำหรับมือใหม่ ไปจนถึงบทความเปรียบเทียบที่ช่วยให้เข้าใจสเปกและความเหมาะสมของแต่ละหมวด</p>
            </div>
            <Button variant="ghost" className="group hidden md:inline-flex" asChild>
              <Link to="/articles">
                ดูบทความทั้งหมด <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {recentArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-sky-700">เสียงจากผู้ใช้</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">เว็บที่ทั้งขายของและช่วยให้คนเลือกได้ง่ายขึ้น</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-base leading-relaxed text-slate-700">“{item.quote}”</p>
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
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">อยากลองสินค้าจริงก่อนตัดสินใจ?</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                ดูหน้าร้าน แผนที่ เวลาเปิดปิด และช่องทางติดต่อได้ครบ หรือจะอ่านบทความแนะนำก่อนแล้วค่อยเลือกสินค้าก็ได้ใน flow เดียวกัน
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-xl px-6">
                  <Link to="/store">ดูหน้าร้านและแผนที่</Link>
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
