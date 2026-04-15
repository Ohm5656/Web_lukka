import * as React from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { BookOpen, CheckCircle2, Heart, Info, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { articles, products } from "../../data";
import { ProductCard } from "../../components/ProductCard";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { formatPrice } from "../../lib/site";

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) || products[0];
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState("overview");

  const relatedProducts = products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
    .slice(0, 4);

  const comparisonTargets = relatedProducts.slice(0, 3);
  const relatedGuide = articles.find((article) => article.relatedProducts.includes(product.id)) || articles[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center gap-2 px-4 py-4 text-sm text-slate-500 md:px-6">
          <Link to="/" className="hover:text-sky-700">หน้าแรก</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-sky-700">สินค้า</Link>
          <span>/</span>
          <Link to={`/products?category=${product.categoryId}`} className="hover:text-sky-700">{product.categoryId}</Link>
          <span>/</span>
          <span className="truncate text-slate-900">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-rose-500">
                <Heart className="h-4 w-4" />
              </button>
              <img src={product.image} alt={product.name} className="aspect-square w-full rounded-[1.5rem] object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`overflow-hidden rounded-2xl border bg-white p-2 ${item === 1 ? "border-sky-300 ring-2 ring-sky-100" : "border-slate-200"}`}>
                  <img src={product.image} alt="" className="aspect-square w-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {product.isNew && <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">มาใหม่</Badge>}
                  {product.isFeatured && <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">รุ่นแนะนำ</Badge>}
                </div>
                <p className="text-sm text-slate-500">เหมาะกับ: {product.bestFor}</p>
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{product.name}</h1>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{product.description}</p>

              <div className="mt-6 flex items-end justify-between gap-4 border-y border-slate-100 py-6">
                <div>
                  <p className="text-sm text-slate-500">ราคาแนะนำ</p>
                  <p className="mt-1 text-3xl font-bold text-slate-950">{formatPrice(product.price)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
                  <p className="text-xs text-slate-500">จัดส่ง</p>
                  <p className="text-sm font-medium text-slate-900">ฟรีเมื่อครบ 1,500 บาท</p>
                </div>
              </div>

              <div className="mt-6 flex items-end gap-4">
                <div className="w-28">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">จำนวน</label>
                  <div className="flex h-12 items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-full w-1/3 items-center justify-center text-slate-500 hover:bg-slate-200">-</button>
                    <input value={quantity} readOnly className="h-full w-1/3 bg-transparent text-center text-sm font-semibold text-slate-900 outline-none" />
                    <button onClick={() => setQuantity(quantity + 1)} className="flex h-full w-1/3 items-center justify-center text-slate-500 hover:bg-slate-200">+</button>
                  </div>
                </div>
                <Button size="lg" className="h-12 flex-1 rounded-xl shadow-lg shadow-sky-600/10">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  เพิ่มลงตะกร้า
                </Button>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  <Truck className="h-4 w-4 text-slate-400" /> จัดส่งภายใน 1-2 วันทำการ
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-slate-400" /> รับประกันร้านและสินค้าแท้
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-sky-100 bg-sky-50 p-5">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-700">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-950">คำแนะนำก่อนซื้อ</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{product.buyingGuideText}</p>
                    <a href="#guide" className="mt-3 inline-flex text-sm font-medium text-sky-700 hover:text-sky-800">เลื่อนไปดูคำแนะนำแบบละเอียด</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 flex overflow-x-auto border-b border-slate-200">
            {[
              { key: "overview", label: "ภาพรวม" },
              { key: "specs", label: "สเปกหลัก" },
              { key: "guide", label: "เหมาะกับใคร / คำแนะนำ" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`border-b-2 px-5 py-4 text-sm font-semibold transition-colors ${activeTab === tab.key ? "border-sky-600 text-sky-700" : "border-transparent text-slate-500 hover:text-slate-900"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <h3 className="text-2xl font-semibold text-slate-950">จุดเด่นที่ควรรู้ก่อนตัดสินใจ</h3>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {product.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-[1.5rem] bg-slate-50 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">เหมาะกับใคร</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{product.whoIsItFor}</p>
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6">
                <h3 className="text-2xl font-semibold text-slate-950">คำอธิบายเชิงแนะนำ</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{product.advice}</p>
                <div className="mt-6 space-y-3">
                  {product.features.map((feature) => (
                    <div key={feature} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
              <table className="w-full border-collapse bg-white text-left">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <tr key={key} className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <th className="w-1/3 border-b border-slate-200 px-6 py-4 text-sm font-semibold text-slate-950">{key}</th>
                      <td className="border-b border-slate-200 px-6 py-4 text-sm text-slate-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "guide" && (
            <div id="guide" className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-sky-700" />
                  <h3 className="text-2xl font-semibold text-slate-950">คำแนะนำสำหรับคนกำลังตัดสินใจ</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{product.buyingGuideText}</p>
                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">Checklist ก่อนซื้อ</h4>
                <ul className="mt-4 space-y-3">
                  {[
                    "เช็กพื้นที่โต๊ะและรูปแบบการใช้งานจริงก่อนเลือกขนาด",
                    "ดูว่าพอร์ตหรือการเชื่อมต่อรองรับกับอุปกรณ์ที่ใช้อยู่หรือไม่",
                    "เทียบกับรุ่นใกล้เคียงในงบเดียวกันก่อนตัดสินใจ",
                    "ถ้ายังไม่แน่ใจ อ่านบทความแนะนำหรือแวะมาลองที่หน้าร้านได้",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white">
                <p className="text-sm text-sky-300">บทความที่เกี่ยวข้อง</p>
                <h3 className="mt-2 text-2xl font-semibold">{relatedGuide.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{relatedGuide.excerpt}</p>
                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800">
                  <img src={relatedGuide.image} alt={relatedGuide.title} className="h-48 w-full object-cover" />
                </div>
                <Button asChild className="mt-5 w-full rounded-xl bg-white text-slate-950 hover:bg-slate-100">
                  <Link to={`/articles/${relatedGuide.id}`}>อ่านบทความนี้</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-sky-700">เปรียบเทียบเบื้องต้น</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">รุ่นใกล้เคียงในหมวดเดียวกัน</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-4 py-3 font-medium">รุ่น</th>
                    <th className="px-4 py-3 font-medium">เหมาะกับ</th>
                    <th className="px-4 py-3 font-medium">จุดเด่น</th>
                  </tr>
                </thead>
                <tbody>
                  {[product, ...comparisonTargets].map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <td className="px-4 py-4 font-medium text-slate-950">{item.name}</td>
                      <td className="px-4 py-4 text-slate-600">{item.bestFor}</td>
                      <td className="px-4 py-4 text-slate-600">{item.highlights[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-medium text-sky-700">สรุปให้สั้นที่สุด</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">ถ้าคุณกำลังมองหา...</h2>
            <ul className="mt-5 space-y-3">
              {[
                `รุ่นที่เหมาะกับ ${product.bestFor}`,
                "ข้อมูลสเปกดูง่าย พร้อมคำแนะนำใช้งานจริง",
                "มีรุ่นใกล้เคียงให้เปรียบเทียบต่อทันที",
                "เชื่อมไปยังบทความหรือหน้าหมวดได้ต่อเนื่อง",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-sky-700">สินค้าใกล้เคียง</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">รุ่นที่ควรเทียบเพิ่มก่อนตัดสินใจ</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
