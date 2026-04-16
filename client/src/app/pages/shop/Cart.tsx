import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/site";

export function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const shipping = cartTotal >= 3000 ? 0 : 120;
  const total = cartTotal + shipping;

  return (
    <div className="w-full bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-sky-700" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">ตะกร้าสินค้า</h1>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              <div className="lg:w-2/3">
                <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                  <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-500 md:grid">
                    <div className="col-span-6">สินค้า</div>
                    <div className="col-span-3 text-center">จำนวน</div>
                    <div className="col-span-2 text-right">ราคา</div>
                    <div className="col-span-1" />
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {items.map((item) => (
                      <li key={item.id} className="grid grid-cols-1 items-center gap-4 p-4 sm:p-6 md:grid-cols-12">
                        <div className="col-span-1 flex items-center gap-4 md:col-span-6">
                          <Link to={`/products/${item.id}`} className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover mix-blend-multiply" />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <Link to={`/products/${item.id}`} className="line-clamp-2 text-base font-semibold text-slate-950 transition-colors hover:text-sky-700">
                              {item.name}
                            </Link>
                          </div>
                        </div>

                        <div className="col-span-1 flex items-center md:col-span-3 md:justify-center">
                          <div className="flex h-10 w-28 items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-full w-1/3 items-center justify-center text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
                            >
                              -
                            </button>
                            <input type="text" value={item.quantity} readOnly className="h-full w-1/3 border-none bg-transparent p-0 text-center text-sm font-semibold text-slate-950 focus:ring-0" />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-full w-1/3 items-center justify-center text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="col-span-1 flex items-center justify-between md:col-span-2 md:block md:text-right">
                          <span className="text-sm text-slate-500 md:hidden">ราคา</span>
                          <span className="font-bold text-slate-950">{formatPrice(item.price * item.quantity)}</span>
                        </div>

                        <div className="col-span-1 flex justify-end">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="sticky top-24 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-950">สรุปรายการสั่งซื้อ</h2>
                  <div className="mt-6 space-y-4 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>ยอดรวมสินค้า</span>
                      <span className="font-medium text-slate-950">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ค่าจัดส่ง</span>
                      <span className={shipping === 0 ? "font-medium text-emerald-600" : "font-medium text-slate-950"}>
                        {shipping === 0 ? "ฟรี" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-base font-bold text-slate-950">ยอดชำระทั้งหมด</span>
                      <span className="text-2xl font-black tracking-tight text-slate-950">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button asChild size="lg" className="mt-6 h-14 w-full rounded-xl text-base">
                    <Link to="/checkout">
                      ไปยังหน้าชำระเงิน
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-white py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                <ShoppingCart className="h-10 w-10 text-slate-300" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-slate-950">ยังไม่มีสินค้าในตะกร้า</h2>
              <p className="mx-auto mt-3 max-w-md text-slate-500">ลองกลับไปดูหมวดสินค้า แล้วกดเพิ่มสินค้าที่สนใจลงตะกร้าก่อนชำระเงิน</p>
              <Button asChild size="lg" className="mt-8 rounded-xl px-8">
                <Link to="/products">เริ่มดูสินค้า</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
