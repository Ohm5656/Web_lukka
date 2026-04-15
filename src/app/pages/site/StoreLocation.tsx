import { Link } from "react-router";
import { motion } from "motion/react";
import { Clock3, MapPin, Phone, TrainFront, CarFront, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { STORE_INFO } from "../../data";

const travelTips = [
  { icon: TrainFront, title: "BTS พร้อมพงษ์", desc: "เดินต่อประมาณ 6 นาทีจากสถานีถึงหน้าร้าน" },
  { icon: CarFront, title: "ที่จอดรถในอาคาร", desc: "จอดฟรี 2 ชั่วโมงแรกเมื่อมีสลิปซื้อสินค้า" },
];

export function StoreLocation() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-sky-700">หน้าร้านและแผนที่</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              แวะมาลองสินค้าและพูดคุยกับทีมหน้าร้านได้จริง
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              ถ้ายังลังเลเรื่องขนาด ฟีลปุ่ม หรืออยากเปรียบเทียบรุ่นก่อนซื้อ คุณสามารถมาดูสินค้าจริงและขอคำแนะนำจากทีมได้ที่หน้าร้าน
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="aspect-[16/10] bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_38%,#ffffff_100%)] p-6">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-dashed border-sky-200 bg-white/70 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-sky-700">มุมดูหน้าร้านและแผนที่</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">TechHaven Experience Corner</h2>
                </div>
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {travelTips.map((tip) => (
                  <div key={tip.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <tip.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium text-slate-900">{tip.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">ข้อมูลการเดินทาง</h2>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">ที่อยู่ร้าน</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{STORE_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">เบอร์โทร</p>
                  <p className="mt-1 text-sm text-slate-600">{STORE_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">เวลาเปิดทำการ</p>
                  <p className="mt-1 text-sm text-slate-600">{STORE_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-7 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">อยากให้ทีมช่วยแนะนำก่อนมาร้าน?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              ส่งข้อความมาบอกงบประมาณหรือหมวดที่สนใจล่วงหน้าได้ ทีมจะช่วยแนะนำรุ่นที่ควรลองไว้ให้
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl bg-white text-slate-900 hover:bg-slate-100">
                <Link to="/contact">คุยกับทีมหน้าร้าน</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-slate-700 bg-transparent text-white hover:bg-slate-800">
                <Link to="/products">
                  ดูสินค้าที่มีในร้าน <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
