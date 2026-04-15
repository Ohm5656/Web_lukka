# Project Submission Guide

ไฟล์นี้ทำไว้เพื่อให้อาจารย์หรือผู้ตรวจเปิดมาแล้วเข้าใจโครงสร้างโปรเจคได้เร็ว

## ดูหน้าที่ใช้งานจริงตรงไหน

ให้ดูที่:

- `src/app/pages/`
- `src/app/routes.tsx`
- `src/app/pages/pageManifest.ts`

## โครงสร้างหน้า

- `src/app/pages/site/`
  หน้าเนื้อหาหลักของเว็บไซต์ เช่น Home, About, Contact, FAQ, Store Location
- `src/app/pages/shop/`
  หน้าเกี่ยวกับสินค้า เช่น Products, Product Detail, Cart, Checkout
- `src/app/pages/content/`
  หน้าเนื้อหาความรู้ เช่น Articles, Article Detail

## ไฟล์เก่าที่ไม่ใช้

ไฟล์ทดลองหรือหน้าเก่าที่ไม่ได้ใช้กับ route ปัจจุบัน ถูกย้ายไปไว้ที่:

- `src/app/archive-pages/`

ดังนั้นถ้าจะตรวจเฉพาะ "หน้าที่ใช้จริง" ไม่ต้องดูโฟลเดอร์นี้

## จำนวนหน้า

- Static route pages: `9`
- Dynamic route templates: `2`
- Product detail pages: `50`
- Article detail pages: `6`
- Total addressable pages ที่ผู้ใช้เข้าถึงได้จริง: `65`

## สรุปเรื่องเกิน 30 หน้าไหม

เกินแล้วครับ ถ้านับตามหน้าที่ผู้ใช้เข้าถึงได้จริง:

- `9` หน้าแบบคงที่
- `50` หน้ารายละเอียดสินค้า
- `6` หน้ารายละเอียดบทความ

รวมเป็น `65` หน้า

ถ้านับเฉพาะหน้าแม่หรือ route template จะยังไม่ถึง 30 แต่ถ้านับหน้าใช้งานจริงทั้งระบบ เกิน 30 แล้วชัดเจน
