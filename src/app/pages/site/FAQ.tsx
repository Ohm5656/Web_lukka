import * as React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../../components/ui/Button";

const faqs = [
  {
    q: "จัดส่งใช้เวลากี่วัน",
    a: "ตัวอย่าง flow นี้ตั้งใจให้เป็นหน้าเดโม แต่หากนำไปใช้จริงสามารถกำหนดได้ทั้งจัดส่งปกติ 2-4 วันทำการ และด่วนในเขตเมืองใหญ่ พร้อมแจ้งสถานะออเดอร์ต่อได้ในภายหลัง",
  },
  {
    q: "ถ้าเลือกสินค้าไม่เป็น เริ่มตรงไหนดี",
    a: "แนะนำให้เริ่มจากหน้าบทความความรู้ก่อน แล้วค่อยกดเข้าไปยังหน้าสินค้าที่เกี่ยวข้อง เพราะเราออกแบบ flow ให้บทความและสินค้าเชื่อมกันโดยตรง",
  },
  {
    q: "มีรับประกันสินค้าหรือไม่",
    a: "ในหน้าเดโมนี้ยังไม่ได้ลงรายละเอียดรายแบรนด์ แต่โครงสร้างหน้าสินค้ารองรับการเพิ่มข้อมูลประกัน เงื่อนไขเคลม และบริการหลังการขายได้ทันที",
  },
  {
    q: "สามารถแวะไปดูสินค้าจริงที่ร้านได้ไหม",
    a: "ได้ครับ หน้า Store Location และ Map ถูกแยกไว้เพื่อให้ดูที่อยู่ เวลาเปิดทำการ และข้อมูลการเดินทางได้ชัดเจน เหมาะกับคนที่อยากแวะหน้าร้านก่อนตัดสินใจ",
  },
  {
    q: "รองรับการชำระเงินแบบไหนบ้าง",
    a: "หน้า Checkout ตอนนี้เป็น UI demo แต่ถูกออกแบบให้ต่อยอดได้ทั้งบัตรเครดิต โอนผ่านธนาคาร หรือช่องทางชำระเงินอื่น ๆ ในภายหลัง",
  },
  {
    q: "บทความกับสินค้าเชื่อมกันอย่างไร",
    a: "ทุกบทความสามารถแนะนำสินค้าที่เกี่ยวข้อง และในหน้าสินค้าก็พาผู้ใช้ย้อนกลับไปอ่านคู่มือหรือ buying guide ได้ ทำให้เว็บนี้ไม่ใช่แค่หน้าร้านธรรมดา",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="w-full bg-slate-50 py-20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-sm font-medium text-sky-700">คำถามที่พบบ่อย</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">รวมคำถามที่คนมักอยากรู้ก่อนสั่งซื้อหรือเริ่มใช้งาน</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            หน้า FAQ นี้ช่วยลดความสับสนในจุดที่คนมักถามบ่อย ทั้งเรื่องสินค้า บทความ หน้าร้าน และ flow การสั่งซื้อแบบเดโม
          </p>
        </motion.div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-6 p-6 text-left"
              >
                <span className="text-lg font-semibold text-slate-950">{faq.q}</span>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${openIndex === index ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-500"}`}>
                  {openIndex === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>

              {openIndex === index && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-6 pb-6">
                  <div className="border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">{faq.a}</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">ยังมีคำถามเฉพาะรุ่นหรืออยากให้ช่วยเลือกให้</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            คุณสามารถไปที่หน้าติดต่อเราเพื่อส่งข้อความหาเราได้ หรือจะเริ่มจากอ่านบทความหมวดที่สนใจก่อนก็ได้เหมือนกัน
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-xl">
              <Link to="/contact">ไปหน้าติดต่อเรา</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/articles">ดูบทความความรู้</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
