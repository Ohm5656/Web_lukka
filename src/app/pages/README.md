# Pages Structure

โฟลเดอร์นี้เก็บเฉพาะ "หน้าที่ใช้งานจริง" เพื่อให้เปิดมาดูแล้วนับหน้าได้ง่าย

- `site/` หน้าเนื้อหาหลักของร้าน
- `shop/` หน้าเกี่ยวกับสินค้าและการสั่งซื้อ
- `content/` หน้าบทความความรู้
- `index.ts` จุดรวม export ของหน้าที่ route ใช้งานจริง
- `pageManifest.ts` ไฟล์สรุปรายชื่อหน้าและจำนวนหน้า

หมายเหตุ:

- ไฟล์หน้าเก่าที่ไม่ใช้กับ route ปัจจุบัน ถูกย้ายออกไปไว้ที่ `src/app/archive-pages/`

จำนวนหน้าปัจจุบันโดยสรุป:

- Static route pages: `9`
- Dynamic route templates: `2`
- Product detail pages จากข้อมูลสินค้า: `50`
- Article detail pages จากข้อมูลบทความ: `6`
- Total addressable pages: `65`
