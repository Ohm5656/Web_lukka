import { Link } from "react-router";
import { motion } from "motion/react";
import { Award, CheckCircle2, Lightbulb, MapPin, Users } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { STORE_INFO } from "../../data";

const values = [
  {
    icon: CheckCircle2,
    title: "คัดสินค้าที่ตรงการใช้งาน",
    desc: "เราให้ความสำคัญกับสินค้าที่ตอบโจทย์การใช้งานจริง และเลือกสิ่งที่ลูกค้าหาได้ง่ายและใช้งานได้คุ้มค่า",
  },
  {
    icon: Lightbulb,
    title: "ขายพร้อมคำแนะนำ",
    desc: "ทุกหมวดมีทั้งหน้าสินค้าและบทความประกอบ เพื่อช่วยให้มือใหม่เลือกได้มั่นใจขึ้น",
  },
  {
    icon: Award,
    title: "แนะนำอย่างตรงไปตรงมา",
    desc: "เราอยากให้การเลือกซื้ออุปกรณ์คอมรู้สึกเหมือนมีคนช่วยแนะนำตามการใช้งานจริง ",
  },
  {
    icon: Users,
    title: "เหมาะกับทั้งมือใหม่และคนใช้งานจริง",
    desc: "เราอยากให้การเลือกซื้ออุปกรณ์คอมไม่ว่าคุณจะเริ่มประกอบคอมครั้งแรก มองหาอุปกรณ์เสริม ทางเราจะช่วยแนะนำ",
  },
];

export function About() {
  return (
    <div className="w-full bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.14),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_36%)]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-sm font-medium text-sky-700">เกี่ยวกับร้าน</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                TechHaven ไม่ได้เป็นแค่ร้านขายอุปกรณ์คอม

                <span className="mt-2 block text-sky-600">แต่เป็นร้านที่ช่วยให้คุณเลือกฮาร์ดแวร์ได้ตรงกับการใช้งาน</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                เราคัดหมวดสินค้าให้ดูง่าย พร้อมข้อมูลและบทความแนะนำ เพื่อช่วยให้คุณเลือกอุปกรณ์คอมได้เหมาะกับงบ เหมาะกับงาน และใช้งานได้คุ้มจริง
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-xl px-6">
                  <Link to="/products">ดูสินค้าทั้งหมด</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-xl px-6">
                  <Link to="/articles">อ่านบทความแนะนำ</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                <p className="text-sm text-sky-300">ภาพรวมของร้าน</p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-3xl font-semibold">5 หมวดหลัก</p>
                    <p className="mt-1 text-sm text-slate-300">ครบทั้งอุปกรณ์สำคัญสำหรับคอม</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">50+ สินค้า</p>
                    <p className="mt-1 text-sm text-slate-300">คัดให้เลือกง่ายตามการใช้งาน</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">บทความแนะนำ</p>
                    <p className="mt-1 text-sm text-slate-300">บทความให้ความรู้ก่อนตัดสินใจ</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">หน้าร้านจริง</p>
                    <p className="mt-1 text-sm text-slate-300">ติดต่อสะดวกและเช็กข้อมูลได้ชัดเจน</p>
                  </div>
                </div>
              </div>

              
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-sky-700">สิ่งที่เราให้ความสำคัญ</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"> ขายอุปกรณ์คอมด้วยแนวคิดที่เน้นของตรงงาน ข้อมูลชัด และเลือกง่าย </h2>
            <p className="mt-3 text-lg text-slate-600">
เราเชื่อว่าการเลือกอุปกรณ์คอมไม่ควรยากเกินไป ดังนั้นการบริการของเรา ลูกค้าจะเห็นข้อมูลที่เข้าใจง่าย เปรียบเทียบได้สะดวก และเลือกสินค้าได้เหมาะกับการใช้งานจริงในงบที่ต้องการ            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold">อยากเริ่มจากดูสินค้า หรืออยากอ่านก่อนค่อยตัดสินใจก็ได้</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
        จะเริ่มจากหมวดสินค้า บทความ หรือไปดูหน้าร้านก่อนก็ได้ทั้งหมด
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-xl bg-white text-slate-950 hover:bg-slate-100">
              <Link to="/products">เริ่มดูสินค้า</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-slate-700 bg-transparent text-white hover:bg-slate-900">
              <Link to="/contact">ดูข้อมูลติดต่อและหน้าร้าน</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
