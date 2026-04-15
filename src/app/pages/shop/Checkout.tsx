import * as React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { products } from "../../data";
import { formatPrice } from "../../lib/site";

export function Checkout() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const cartItems = products.slice(0, 2);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal >= 3000 ? 0 : 120;
  const total = subtotal + shipping;
  const orderId = React.useMemo(() => `LK-${Math.floor(Math.random() * 900000 + 100000)}`, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl md:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-100 bg-emerald-50">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">ยืนยันคำสั่งซื้อเรียบร้อย</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            ขอบคุณที่ทดลองใช้งาน flow ของเว็บไซต์ครับ หน้านี้เป็นตัวอย่างการยืนยันออเดอร์หลังชำระเงินสำเร็จ
          </p>
          <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-500">
            หมายเลขคำสั่งซื้อ: <span className="font-semibold text-slate-950">{orderId}</span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="flex-1 rounded-xl">
              <Link to="/">กลับไปหน้าแรก</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 rounded-xl">
              <Link to="/products">ดูสินค้าต่อ</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <p className="text-sm font-medium text-sky-700">ชำระเงิน</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">ข้อมูลจัดส่งและชำระเงิน</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              หน้าเช็กเอาต์นี้เป็น UI demo สำหรับแสดง flow ฝั่งหน้าเว็บ โดยยังไม่เชื่อมต่อ backend จริง
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <form onSubmit={handleSubmit} className="p-6 md:p-10">
                <div className="mb-10">
                  <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-950">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs text-sky-700">1</span>
                    ข้อมูลผู้สั่งซื้อ
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">ชื่อ</label>
                      <input type="text" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">นามสกุล</label>
                      <input type="text" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">อีเมล</label>
                      <input type="email" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">เบอร์โทรศัพท์</label>
                      <input type="tel" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-950">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs text-sky-700">2</span>
                    ที่อยู่จัดส่ง
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">ที่อยู่</label>
                      <input type="text" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">เขต / อำเภอ</label>
                        <input type="text" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">จังหวัด</label>
                        <input type="text" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">รหัสไปรษณีย์</label>
                        <input type="text" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-950">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs text-sky-700">3</span>
                    วิธีชำระเงิน
                  </h2>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                    <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-6">
                      <input type="radio" id="card" name="payment" defaultChecked className="h-4 w-4 text-sky-600 focus:ring-sky-600" />
                      <label htmlFor="card" className="flex cursor-pointer items-center gap-2 font-semibold text-slate-950">
                        <CreditCard className="h-5 w-5 text-slate-500" />
                        บัตรเครดิต / เดบิต
                      </label>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">หมายเลขบัตร</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">วันหมดอายุ</label>
                          <input type="text" placeholder="MM/YY" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">CVC</label>
                          <input type="text" placeholder="123" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                    <Lock className="h-4 w-4 shrink-0" />
                    ข้อมูลการชำระเงินถูกออกแบบให้แสดงภาพรวมแบบปลอดภัยและพร้อมต่อยอด
                  </div>
                  <Button type="submit" size="lg" className="h-14 rounded-xl px-10 text-base">
                    ยืนยันคำสั่งซื้อ
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:pt-2">
              <div className="sticky top-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950">สรุปรายการ</h2>
                <div className="mt-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 font-medium text-slate-950">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-slate-950">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>ยอดรวมสินค้า</span>
                    <span className="font-medium text-slate-950">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ค่าจัดส่ง</span>
                    <span className="font-medium text-slate-950">{shipping === 0 ? "ฟรี" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-4">
                    <span className="text-base font-bold text-slate-950">ยอดชำระทั้งหมด</span>
                    <span className="text-2xl font-black tracking-tight text-slate-950">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
