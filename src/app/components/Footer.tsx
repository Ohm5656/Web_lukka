import { Link } from "react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { STORE_INFO, categories } from "../data";
import { storeName } from "../lib/site";
import techHavenLogo from "../../assets/techhaven-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container mx-auto px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="block">
              <img
                src={techHavenLogo}
                alt={`${storeName} logo`}
                className="h-auto w-[220px] max-w-full object-contain"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
              TechHaven ร้านขายอุปกรณ์คอม พร้อมบทความและข้อมูลแนะนำ<br/>สำหรับคนที่อยากเลือกให้คุ้มและตรงการใช้งาน
            </p>
            <div className="mt-5 flex gap-3 text-neutral-400">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a key={index} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white transition-colors hover:border-red-200 hover:text-red-700">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-950">หมวดสินค้ายอดนิยม</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600">
              <li><Link to="/products" className="transition-colors hover:text-red-700">สินค้าทั้งหมด</Link></li>
              {categories.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link to={`/products?category=${category.id}`} className="transition-colors hover:text-red-700">{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-950">หน้าสำคัญ</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600">
              <li><Link to="/articles" className="transition-colors hover:text-red-700">บทความความรู้</Link></li>
              <li><Link to="/faq" className="transition-colors hover:text-red-700">คำถามที่พบบ่อย</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-red-700">เกี่ยวกับร้าน</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-red-700">ติดต่อเราและข้อมูลหน้าร้าน</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-950">ติดต่อเรา</h3>
            <ul className="mt-4 space-y-4 text-sm text-neutral-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                <span>{STORE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-red-700" />
                <span>{STORE_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-red-700" />
                <span>{STORE_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {storeName}. All rights reserved.</p>
          <div className="flex gap-4">
            <p>ผู้จัดทำ : - </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
