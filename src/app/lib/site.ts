import { categories } from "../data";

export const storeName = "TechHaven";
export const storeTagline = "อุปกรณ์คอมที่เลือกง่าย ดูน่าเชื่อถือ และพร้อมแนะนำก่อนซื้อ";

export const mainNavLinks = [
  { name: "หน้าแรก", path: "/" },
  { name: "บทความความรู้", path: "/articles" },
  { name: "เกี่ยวกับร้าน", path: "/about" },
  { name: "ติดต่อเรา", path: "/contact" },
];

export const quickCategoryLinks = categories.map((category) => ({
  name: category.name,
  path: `/products?category=${category.id}`,
}));

export function formatPrice(price: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(price);
}
