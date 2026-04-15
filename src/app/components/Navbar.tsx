import * as React from "react";
import { Link, useLocation } from "react-router";
import { ChevronDown, ChevronRight, Menu, ShoppingCart, X } from "lucide-react";
import { categories } from "../data";
import { quickCategoryLinks, mainNavLinks, storeName, storeTagline } from "../lib/site";
import techHavenLogo from "../../assets/techhaven-logo.png";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { cn } from "./ui/Button";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = React.useState(false);
  const location = useLocation();
  const isProductsActive = location.pathname.startsWith("/products");

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/92 backdrop-blur-xl">
      <div className="border-b border-red-900/10 bg-neutral-950 text-neutral-200">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-[11px] md:px-6">
          <p>{storeTagline}</p>
          <p className="hidden md:block text-neutral-400">โทนร้านสะอาด อ่านง่าย และเชื่อมสินค้ากับบทความความรู้</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          <Link to="/" className="flex items-center">
            <img
              src={techHavenLogo}
              alt={`${storeName} logo`}
              className="h-auto w-[180px] object-contain sm:w-[220px] lg:w-[260px]"
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setIsCatalogOpen(true)}
              onMouseLeave={() => setIsCatalogOpen(false)}
            >
              <button
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isProductsActive ? "bg-red-100 text-red-800" : "text-slate-700 hover:bg-neutral-100"
                )}
              >
                สินค้า
                <ChevronDown className={cn("h-4 w-4 transition-transform", isCatalogOpen && "rotate-180")} />
              </button>

              {isCatalogOpen && (
                <div className="absolute left-0 top-full mt-3 w-[360px] rounded-[1.8rem] border border-neutral-200 bg-white p-3 shadow-2xl shadow-neutral-900/10">
                  <div className="rounded-[1.4rem] bg-neutral-950 px-4 py-4 text-white">
                    <p className="text-sm font-semibold">หมวดสินค้า</p>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-300">เลือกดูตามหมวด หรือเข้าไปหน้ารวมสินค้าเพื่อเทียบหลายรุ่นในหน้าเดียว</p>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link to="/products" className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-red-50">
                      <span>สินค้าทั้งหมด</span>
                      <ChevronRight className="h-4 w-4 text-neutral-400" />
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/products?category=${category.id}`}
                        className="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-red-50"
                      >
                        <div>
                          <p className="text-sm font-medium text-neutral-950">{category.name}</p>
                          <p className="mt-1 text-xs leading-relaxed text-neutral-500">{category.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.path ? "bg-neutral-100 text-neutral-950" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline" className="rounded-full border-neutral-200 px-4">
              <Link to="/store">หน้าร้าน / แผนที่</Link>
            </Button>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full bg-neutral-100 text-neutral-900">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full bg-red-700 p-0 text-[10px] shadow-sm">2</Badge>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full bg-neutral-100 text-neutral-900">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full bg-red-700 p-0 text-[10px] shadow-sm">2</Badge>
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full bg-neutral-100 text-neutral-900" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-neutral-200 py-5 lg:hidden">
            <div className="space-y-2">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    location.pathname === link.path ? "bg-neutral-100 text-neutral-950" : "text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 rounded-[1.6rem] border border-neutral-200 bg-red-50/50 p-4">
              <p className="text-sm font-semibold text-neutral-950">หมวดสินค้า</p>
              <div className="mt-3 space-y-2">
                <Link to="/products" onClick={() => setIsOpen(false)} className="block rounded-2xl bg-white px-4 py-3 text-sm font-medium text-neutral-900">
                  สินค้าทั้งหมด
                </Link>
                {quickCategoryLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-medium text-neutral-700"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="h-4 w-4 text-neutral-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
