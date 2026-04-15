import * as React from "react";
import { motion } from "motion/react";
import { Clock, Mail, MapPin, Phone, Send, TrainFront, CarFront } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { STORE_INFO } from "../../data";



export function Contact() {
  const [isSent, setIsSent] = React.useState(false);

  return (
    <div className="w-full bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-medium text-sky-700">ติดต่อเรา</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">มีคำถามเรื่องสินค้า </h1>
          <p className="mt-2 text-lg leading-relaxed text-slate-600">
            ส่งข้อความหาเราได้เลย ไม่ว่าจะถามเรื่องการใช้งาน นัดเข้ามาดูสินค้า หรือดูเส้นทางมาหน้าร้าน
            <br/>ทีมงานเราพร้อมช่วยแนะนำ
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">ข้อมูลติดต่อและหน้าร้าน</h2>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-950">ที่ตั้งหน้าร้าน</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{STORE_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-950">เบอร์ติดต่อ</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{STORE_INFO.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-950">อีเมลและโซเชียล</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{STORE_INFO.email}</p>
                    <p className="mt-2 text-sm text-slate-500">LINE: {STORE_INFO.line} · Facebook: {STORE_INFO.facebook}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-950">เวลาเปิดทำการ</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{STORE_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 shadow-sm aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="หน้าร้านและบรรยากาศภายในร้าน"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/30" />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] bg-white/92 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-slate-950">อยากแวะมาดูสินค้าจริงก่อนซื้อ</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  ใช้ข้อมูลด้านบนเพื่อนัดหมาย ดูเวลาเปิดทำการ และวางแผนการเดินทางได้เลย ถ้ายังลังเลเรื่องขนาดหรือฟีลการใช้งาน
                  สามารถติดต่อเข้ามาก่อนได้
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
              <div className="absolute right-0 top-0 h-56 w-56 rounded-bl-full bg-sky-50" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-950">ส่งข้อความหาเรา</h2>
             

                <form
                  className="mt-8 space-y-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setIsSent(true);
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">ชื่อ</label>
                      <input
                        type="text"
                        required
                        placeholder="เช่น มายด์"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">นามสกุล</label>
                      <input
                        type="text"
                        required
                        placeholder="เช่น ศรีสุข"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">อีเมล</label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@example.com"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">หัวข้อที่ต้องการสอบถาม</label>
                    <select className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20">
                      <option>ขอคำแนะนำก่อนซื้อ</option>
                      <option>สอบถามเรื่องสินค้า</option>
                      <option>สอบถามเรื่องออเดอร์</option>
                      <option>นัดดูสินค้าที่หน้าร้าน</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">ข้อความ</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="ส่งข้อความหาเรา"
                      className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <Button type="submit" size="lg" className="h-14 w-full rounded-xl text-base">
                    ส่งข้อความหาเรา <Send className="ml-2 h-4 w-4" />
                  </Button>

                  {isSent && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      ส่งข้อความเรียบร้อยแล้วในเดโมนี้ ถ้าต่อ backend ภายหลัง ส่วนนี้พร้อมแปลงเป็นฟอร์มใช้งานจริงได้เลย
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
