import { type LucideIcon, HardDrive, Headphones, Keyboard, Monitor, Mouse } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export type Product = {
  id: string;
  categoryId: string;
  category: string;
  name: string;
  price: number;
  description: string;
  image: string;
  features: string[];
  highlights: string[];
  specs: Record<string, string>;
  isNew?: boolean;
  isFeatured?: boolean;
  whoIsItFor: string;
  bestFor: string;
  buyingGuideText: string;
  advice: string;
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  relatedProducts: string[];
};

export const categories: Category[] = [
  {
    id: "keyboards",
    name: "คีย์บอร์ดเกมมิ่ง",
    description: "คีย์บอร์ดที่ตอบสนองไว พิมพ์สบาย และเข้ากับโต๊ะคอมสไตล์เรียบสะอาด",
    image: "https://images.unsplash.com/photo-1659635936578-1887c7060621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: Keyboard,
  },
  {
    id: "mice",
    name: "เมาส์เกมมิ่ง",
    description: "เมาส์ที่จับถนัด น้ำหนักสมดุล และใช้งานได้ดีทั้งเล่นเกมและทำงาน",
    image: "https://images.unsplash.com/photo-1775410633801-5d7997f795c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: Mouse,
  },
  {
    id: "monitors",
    name: "จอมอนิเตอร์",
    description: "จอคมชัด สีสวย และมุมมองสบายตาสำหรับเกม งานเอกสาร และคอนเทนต์",
    image: "https://images.unsplash.com/photo-1668979324549-b395425429f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: Monitor,
  },
  {
    id: "headsets",
    name: "หูฟังและเฮดเซต",
    description: "เสียงชัด ใส่สบาย คุยง่าย เหมาะทั้งประชุมออนไลน์ เล่นเกม และฟังเพลง",
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: Headphones,
  },
  {
    id: "storage",
    name: "SSD และอุปกรณ์จัดเก็บข้อมูล",
    description: "ตัวเลือกสำหรับเพิ่มความเร็ว เปิดเครื่องไว และเก็บงานได้มั่นใจมากขึ้น",
    image: "https://images.unsplash.com/photo-1665836723795-692a918209a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: HardDrive,
  },
];

type VariantProfile = {
  key: string;
  label: string;
  priceOffset: number;
  extraFeature: string;
};

type ProductSeed = {
  id: string;
  categoryId: string;
  series: string;
  image: string;
  basePrice: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  whoIsItFor: string;
  bestFor: string;
  buyingGuideText: string;
  advice: string;
  featuredKeys: string[];
  newKeys: string[];
};

const variantProfiles: VariantProfile[] = [
  { key: "start", label: "รุ่นเริ่มต้น", priceOffset: 0, extraFeature: "เหมาะสำหรับเริ่มจัดเซ็ตแบบคุ้มค่า" },
  { key: "balance", label: "รุ่นสมดุล", priceOffset: 350, extraFeature: "บาลานซ์ทั้งความสบายและฟีเจอร์" },
  { key: "plus", label: "รุ่นใช้งานจริงจัง", priceOffset: 790, extraFeature: "ได้วัสดุและการควบคุมที่นิ่งขึ้น" },
  { key: "creator", label: "รุ่นครีเอเตอร์", priceOffset: 1290, extraFeature: "เหมาะกับคนทำงานและใช้งานหลายชั่วโมง" },
  { key: "pro", label: "รุ่นโปร", priceOffset: 1890, extraFeature: "เน้นประสบการณ์ครบและฟีลพรีเมียม" },
];

const productSeeds: ProductSeed[] = [
  {
    id: "kb-nimbus",
    categoryId: "keyboards",
    series: "Nimbus 75",
    image: "https://images.unsplash.com/photo-1659635936578-1887c7060621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 2490,
    description: "คีย์บอร์ดขนาด 75% ที่ช่วยให้โต๊ะดูโปร่งขึ้น แต่ยังมีปุ่มสำคัญครบสำหรับใช้งานทุกวัน",
    features: ["เลย์เอาต์ 75%", "รองรับ Bluetooth / USB-C", "คีย์แคปทนรอยนิ้วมือ"],
    specs: { สวิตช์: "Linear เงียบ", การเชื่อมต่อ: "Bluetooth / USB-C", แบตเตอรี่: "สูงสุด 180 ชั่วโมง", โครงสร้าง: "ABS เสริมเฟรมอลูมิเนียม" },
    whoIsItFor: "มือใหม่ที่อยากได้คีย์บอร์ดสวย ใช้ง่าย และพิมพ์สบายโดยไม่ต้องเริ่มจากรุ่นแพงเกินไป",
    bestFor: "โต๊ะทำงานมินิมอล การพิมพ์เอกสาร เล่นเกมเบา ๆ และใช้งานทุกวัน",
    buyingGuideText: "ถ้าคุณอยากให้โต๊ะดูโปร่งขึ้นแต่ยังไม่พร้อมตัด numpad แบบสุดทาง คีย์บอร์ด 75% คือจุดเริ่มต้นที่ลงตัวที่สุด",
    advice: "เลือกสวิตช์เงียบถ้าใช้งานร่วมกับคนอื่นหรือพิมพ์งานนาน ๆ ระหว่างวัน",
    featuredKeys: ["creator", "pro"],
    newKeys: ["plus", "creator", "pro"],
  },
  {
    id: "kb-atlas",
    categoryId: "keyboards",
    series: "Atlas TKL",
    image: "https://images.unsplash.com/photo-1636858507427-f735b8d3e57c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 2890,
    description: "คีย์บอร์ด TKL ที่ได้พื้นที่เมาส์เพิ่มขึ้น เหมาะกับคนเล่นเกมและต้องการโต๊ะที่เคลื่อนไหวคล่อง",
    features: ["เลย์เอาต์ TKL", "ไฟ backlight ปรับได้", "รองรับฮอตสวอป"],
    specs: { สวิตช์: "Tactile", การเชื่อมต่อ: "2.4GHz / USB-C", น้ำหนัก: "920 กรัม", โครงสร้าง: "Top plate อลูมิเนียม" },
    whoIsItFor: "คนที่อยากได้คีย์บอร์ดให้ฟีลแน่นขึ้น เล่นเกมได้ดี และยังเหมาะกับการพิมพ์งานจริง",
    bestFor: "สายเกมมิ่งที่ต้องการพื้นที่เมาส์มากขึ้นและฟีลกดตอบสนองชัดเจน",
    buyingGuideText: "TKL เป็นเลย์เอาต์ที่สมดุลมากสำหรับคนที่ใช้เมาส์เยอะ เพราะได้พื้นที่เพิ่มโดยยังมีปุ่มลูกศรครบ",
    advice: "ถ้าเน้นเล่นเกม FPS หรือใช้โต๊ะไม่กว้างมาก รุ่น TKL มักคุมพื้นที่ได้ง่ายที่สุด",
    featuredKeys: ["plus", "pro"],
    newKeys: ["balance", "plus"],
  },
  {
    id: "ms-aeroglide",
    categoryId: "mice",
    series: "AeroGlide",
    image: "https://images.unsplash.com/photo-1775410633801-5d7997f795c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 990,
    description: "เมาส์น้ำหนักเบาที่ควบคุมง่าย จับสบาย และเหมาะกับทั้งเรียน ทำงาน และเล่นเกมต่อเนื่อง",
    features: ["น้ำหนักเบา", "เซนเซอร์แม่นยำ", "แบตเตอรี่อึด"],
    specs: { เซนเซอร์: "Optical 16000 DPI", น้ำหนัก: "65 กรัม", การเชื่อมต่อ: "2.4GHz / Bluetooth", แบตเตอรี่: "สูงสุด 80 ชั่วโมง" },
    whoIsItFor: "คนที่อยากได้เมาส์ตัวแรกที่ใช้งานคล่องและไม่ล้าข้อมือง่าย",
    bestFor: "เรียนออนไลน์ ทำงานเอกสาร ตัดต่อเบื้องต้น และเล่นเกมทั่วไป",
    buyingGuideText: "เมาส์ที่ดีไม่จำเป็นต้องฟีเจอร์เยอะที่สุด แต่ต้องจับถนัดและน้ำหนักเหมาะกับมือของคุณก่อนเสมอ",
    advice: "ถ้าคุณใช้เมาส์วันละหลายชั่วโมง รุ่นเบาจะช่วยลดความเมื่อยล้าได้ชัดเจน",
    featuredKeys: ["creator", "pro"],
    newKeys: ["balance", "creator"],
  },
  {
    id: "ms-vector",
    categoryId: "mice",
    series: "Vector Ergo",
    image: "https://images.unsplash.com/photo-1754928661583-d04a5f4d9f7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 1290,
    description: "เมาส์ทรงจับเต็มมือที่ให้การรองรับฝ่ามือดีกว่า เหมาะกับคนทำงานยาวและคนชอบฟีลนิ่ง",
    features: ["ทรง ergonomic", "คลิกนุ่ม", "ปุ่มด้านข้างใช้งานง่าย"],
    specs: { เซนเซอร์: "PixArt 26000 DPI", น้ำหนัก: "74 กรัม", การเชื่อมต่อ: "2.4GHz / USB-C", สวิตช์: "Optical" },
    whoIsItFor: "คนที่รู้สึกว่าเมาส์เล็กหรือแบนเกินไปไม่สบายมือ และต้องการใช้งานต่อเนื่องยาวนาน",
    bestFor: "งานเอกสาร งานกราฟิก และคนที่ชอบเมาส์ทรงเต็มมือแบบมั่นคง",
    buyingGuideText: "ถ้าคุณปวดข้อมือบ่อย เมาส์ทรง ergonomic มักช่วยได้มากกว่าการไล่หา DPI สูงเพียงอย่างเดียว",
    advice: "วัดรูปแบบการจับของตัวเองก่อนซื้อเสมอ เพราะ shape สำคัญกว่าเลขสเปกหลายอย่าง",
    featuredKeys: ["balance", "pro"],
    newKeys: ["start", "plus"],
  },
  {
    id: "mn-clearview",
    categoryId: "monitors",
    series: "ClearView QHD",
    image: "https://images.unsplash.com/photo-1668979324549-b395425429f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 5990,
    description: "จอความละเอียด 2K ที่อ่านข้อความคม สีดูเป็นธรรมชาติ และเหมาะกับโต๊ะทำงานสาย clean setup",
    features: ["ความละเอียด QHD", "ขอบจอบาง", "ถนอมสายตา"],
    specs: { ขนาด: "27 นิ้ว", พาเนล: "IPS", รีเฟรชเรต: "165Hz", พอร์ต: "HDMI / DisplayPort / USB-C" },
    whoIsItFor: "คนที่อยากอัปเกรดจากจอ Full HD ให้คมขึ้นและทำงานสบายตาขึ้นแบบเห็นผล",
    bestFor: "สายทำงาน เรียนออนไลน์ เล่นเกม และจัดโต๊ะแบบมินิมอล",
    buyingGuideText: "จอ 27 นิ้ว QHD เป็น sweet spot สำหรับหลายคน เพราะคมชัดกว่าจอ Full HD แต่ยังไม่กินสเปกหนักเท่า 4K",
    advice: "ถ้าเน้นอ่านเอกสารหรือเขียนโค้ดทั้งวัน ให้ดูความคมชัดและการปรับระดับขาตั้งก่อน",
    featuredKeys: ["creator", "pro"],
    newKeys: ["plus", "creator"],
  },
  {
    id: "mn-framepro",
    categoryId: "monitors",
    series: "FramePro 4K",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 8990,
    description: "จอ 4K สำหรับคนทำคอนเทนต์และงานภาพที่อยากได้พื้นที่ใช้งานมากขึ้นและรายละเอียดที่คมมาก",
    features: ["ความละเอียด 4K", "สีเที่ยงตรง", "รองรับงานครีเอทีฟ"],
    specs: { ขนาด: "28 นิ้ว", พาเนล: "IPS 10-bit", รีเฟรชเรต: "144Hz", สี: "DCI-P3 95%" },
    whoIsItFor: "ครีเอเตอร์และคนทำงานภาพที่อยากได้จอคม สีดี และใช้งานจริงได้หลายหน้าต่างพร้อมกัน",
    bestFor: "ตัดต่อวิดีโอ แต่งภาพ ทำสไลด์ และงานที่ต้องการรายละเอียดภาพสูง",
    buyingGuideText: "ถ้าคุณทำคอนเทนต์หรือใช้หลายหน้าต่างพร้อมกัน จอ 4K จะช่วยให้พื้นที่ใช้งานและความคมชัดต่างจากเดิมมาก",
    advice: "ตรวจเช็กการ์ดจอและพอร์ตของเครื่องก่อนเลือกจอ 4K เพื่อให้ใช้งานได้เต็มประสิทธิภาพ",
    featuredKeys: ["creator", "pro"],
    newKeys: ["start", "balance"],
  },
  {
    id: "hs-pulse",
    categoryId: "headsets",
    series: "Pulse Quiet",
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 1490,
    description: "เฮดเซตเสียงชัด ใส่สบาย และคุยไมค์ชัดเจน เหมาะกับการประชุมและเล่นเกมหลังเลิกงาน",
    features: ["ไมค์ตัดเสียงรบกวน", "ฟองน้ำหนานุ่ม", "เชื่อมต่อได้หลายแบบ"],
    specs: { ไดรเวอร์: "50mm", การเชื่อมต่อ: "2.4GHz / Bluetooth", แบตเตอรี่: "30 ชั่วโมง", น้ำหนัก: "285 กรัม" },
    whoIsItFor: "คนที่ต้องใช้ทั้งประชุมออนไลน์ ฟังเพลง และเล่นเกมในตัวเดียว",
    bestFor: "Work from home, gaming ตอนเย็น และคนที่ใส่หูฟังนาน ๆ",
    buyingGuideText: "ถ้าคุณใส่หูฟังนาน ความสบายและน้ำหนักสำคัญมากพอ ๆ กับคุณภาพเสียง",
    advice: "ลองดูว่าคุณต้องใช้ไมค์บ่อยไหม ถ้าใช่ เลือกรุ่นที่ไมค์คมและตัดเสียงดีจะคุ้มกว่ามาก",
    featuredKeys: ["plus", "creator"],
    newKeys: ["balance", "pro"],
  },
  {
    id: "hs-aura",
    categoryId: "headsets",
    series: "Aura Studio",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 2190,
    description: "หูฟังสไตล์ clean ที่เน้นเสียงสมดุล ดูดีบนโต๊ะ และเหมาะกับคนที่ชอบฟังเพลงจริงจังกว่าเดิม",
    features: ["ANC เบื้องต้น", "โทนเสียงสมดุล", "ดีไซน์เรียบพรีเมียม"],
    specs: { ไดรเวอร์: "40mm", การเชื่อมต่อ: "Bluetooth 5.3 / USB-C", แบตเตอรี่: "35 ชั่วโมง", น้ำหนัก: "260 กรัม" },
    whoIsItFor: "คนที่อยากได้หูฟังที่ใช้ได้ทั้งฟังเพลง ทำงาน และคุยสาย โดยไม่ดูเกมมิ่งจ๋าเกินไป",
    bestFor: "โต๊ะทำงานมินิมอล การฟังเพลงระหว่างวัน และประชุมออนไลน์",
    buyingGuideText: "หูฟังที่ดีสำหรับใช้งานทุกวันควรบาลานซ์ทั้งเสียง ความสบาย และหน้าตาให้เข้ากับพื้นที่ทำงานของคุณ",
    advice: "ถ้าชอบเสียงฟังสบายและไม่ล้า หูฟังโทนสมดุลจะใช้งานยาว ๆ ได้ดีกว่าโทนเบสหนัก",
    featuredKeys: ["creator", "pro"],
    newKeys: ["start", "plus"],
  },
  {
    id: "st-swiftvault",
    categoryId: "storage",
    series: "SwiftVault NVMe",
    image: "https://images.unsplash.com/photo-1665836723795-692a918209a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 1790,
    description: "SSD แบบ NVMe ที่ช่วยให้เปิดเครื่อง โปรแกรม และไฟล์งานได้เร็วขึ้นแบบรู้สึกได้ทันที",
    features: ["อ่านเขียนเร็ว", "เหมาะกับอัปเกรดเครื่อง", "ประหยัดเวลาโหลดงาน"],
    specs: { ความจุ: "1TB", อินเทอร์เฟซ: "PCIe Gen4", ความเร็วอ่าน: "7000MB/s", การรับประกัน: "5 ปี" },
    whoIsItFor: "คนที่รู้สึกว่าเครื่องช้า โหลดงานนาน และอยากอัปเกรดให้เห็นผลแบบชัดเจน",
    bestFor: "อัปเกรดโน้ตบุ๊กหรือพีซี งานเรียน งานออฟฟิศ และเกมที่ต้องโหลดบ่อย",
    buyingGuideText: "ถ้าต้องเลือกอัปเกรดอย่างเดียว SSD มักเป็นชิ้นที่ทำให้รู้สึกว่าเครื่องลื่นขึ้นเร็วที่สุด",
    advice: "เช็กเมนบอร์ดหรือโน้ตบุ๊กก่อนว่าใช้สล็อต NVMe แบบไหน เพื่อเลือกความเร็วให้เหมาะกับเครื่อง",
    featuredKeys: ["balance", "pro"],
    newKeys: ["start", "creator"],
  },
  {
    id: "st-pocketcore",
    categoryId: "storage",
    series: "PocketCore Portable",
    image: "https://images.unsplash.com/photo-1720048170832-7bc1d7c9fb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    basePrice: 1390,
    description: "SSD พกพาขนาดเล็กที่ช่วยให้ย้ายไฟล์ใหญ่เร็วขึ้น เหมาะกับคนทำงานข้ามเครื่องบ่อย",
    features: ["ขนาดกะทัดรัด", "ทนทานต่อการพกพา", "ต่อใช้งานง่าย"],
    specs: { ความจุ: "1TB", พอร์ต: "USB-C", ความเร็วอ่าน: "1050MB/s", ความเร็วเขียน: "1000MB/s" },
    whoIsItFor: "นักเรียน คนทำงาน และครีเอเตอร์ที่ต้องพกไฟล์ไปมาเป็นประจำ",
    bestFor: "เก็บไฟล์เรียน งานเอกสาร วิดีโอ และงานออกแบบที่ต้องย้ายเครื่องบ่อย",
    buyingGuideText: "ถ้าคุณต้องพกข้อมูลไปมาระหว่างบ้าน ที่ทำงาน หรือมหาวิทยาลัย SSD พกพาจะช่วยให้ workflow คล่องและปลอดภัยขึ้น",
    advice: "เลือกรุ่นที่ให้สายครบและใช้ USB-C จะทำให้ต่อกับอุปกรณ์ใหม่ ๆ ได้ง่ายกว่า",
    featuredKeys: ["creator", "pro"],
    newKeys: ["balance", "plus"],
  },
];

export const products: Product[] = productSeeds.flatMap((seed) =>
  variantProfiles.map((variant, index) => ({
    id: `${seed.id}-${variant.key}`,
    categoryId: seed.categoryId,
    category: seed.categoryId,
    name: `${seed.series} ${variant.label}`,
    price: seed.basePrice + variant.priceOffset,
    description: `${seed.description} ${variant.extraFeature}`,
    image: seed.image,
    features: [...seed.features, variant.extraFeature],
    highlights: [...seed.features.slice(0, 2), variant.extraFeature],
    specs: seed.specs,
    isNew: seed.newKeys.includes(variant.key),
    isFeatured: seed.featuredKeys.includes(variant.key) || index === 4,
    whoIsItFor: seed.whoIsItFor,
    bestFor: seed.bestFor,
    buyingGuideText: seed.buyingGuideText,
    advice: seed.advice,
  }))
);

export const articles: Article[] = [
  {
    id: "guide-keyboard",
    title: "เลือกคีย์บอร์ดเกมมิ่งยังไงให้พิมพ์สบายและเล่นเกมสนุก",
    excerpt: "ทำความเข้าใจเรื่องเลย์เอาต์ สวิตช์ และการเชื่อมต่อ เพื่อเลือกคีย์บอร์ดให้เหมาะกับโต๊ะและการใช้งานจริง",
    image: "https://images.unsplash.com/photo-1625461291092-13d0c45608b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "12 ต.ค. 2025",
    category: "คู่มือเลือกซื้อ",
    readTime: "6 นาที",
    content: "การเลือกคีย์บอร์ดที่ดีไม่ใช่แค่ดูว่าปุ่มสวยหรือไฟเยอะ แต่ต้องดูว่าคุณพิมพ์งานบ่อยไหม โต๊ะมีพื้นที่แค่ไหน และชอบสัมผัสปุ่มแบบไหน\n\n### เริ่มจากเลย์เอาต์\nถ้าอยากได้โต๊ะที่ดูโปร่งขึ้น คีย์บอร์ด 75% หรือ TKL จะช่วยได้มาก แต่ถ้ายังต้องใช้ numpad ทุกวัน รุ่น full-size ก็ยังเหมาะกว่า\n\n### สวิตช์สำคัญกว่าที่คิด\nLinear จะเงียบและลื่น Tactile จะมีจังหวะตอบสนองชัดขึ้น เหมาะกับคนพิมพ์เยอะ ส่วน Clicky สนุกแต่เสียงดังมากกว่าปกติ\n\n### ดูการเชื่อมต่อให้ตรงชีวิตจริง\nถ้าคุณสลับใช้งานระหว่างโน้ตบุ๊กกับพีซีบ่อย รุ่นที่รองรับ Bluetooth และ 2.4GHz จะคล่องตัวมากกว่า",
    relatedProducts: ["kb-nimbus-balance", "kb-nimbus-creator", "kb-atlas-pro"],
  },
  {
    id: "guide-mouse",
    title: "เมาส์เกมมิ่งสำหรับมือใหม่ ควรเริ่มดูจากอะไรบ้าง",
    excerpt: "เมาส์ที่ดีไม่จำเป็นต้องแพงที่สุด แต่ต้องจับถนัดและเข้ากับวิธีใช้งานของคุณก่อน",
    image: "https://images.unsplash.com/photo-1775410633801-5d7997f795c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "19 ต.ค. 2025",
    category: "คู่มือเลือกซื้อ",
    readTime: "5 นาที",
    content: "เมาส์เกมมิ่งสำหรับมือใหม่ควรเริ่มจาก shape และน้ำหนักก่อนเรื่อง DPI เพราะสองอย่างนี้มีผลกับความสบายมือมากที่สุด\n\n### Shape มาก่อนสเปก\nถ้าคุณจับแบบเต็มฝ่ามือ เมาส์ทรง ergonomic จะช่วยให้ใช้งานได้นานขึ้น แต่ถ้าจับแบบปลายนิ้ว รุ่นน้ำหนักเบามักตอบสนองไวกว่า\n\n### น้ำหนักและผิวสัมผัส\nเมาส์เบาจะเคลื่อนง่ายและลดความล้า ส่วนผิวสัมผัสและยางข้างตัวเมาส์จะช่วยให้ควบคุมได้มั่นคงขึ้น\n\n### อย่าลืมวิธีเชื่อมต่อ\nถ้าคุณใช้กับหลายอุปกรณ์ เลือกรุ่นที่รองรับ Bluetooth จะสะดวกกว่า แต่ถ้าเน้นเล่นเกมจริงจัง 2.4GHz ยังตอบสนองดีที่สุด",
    relatedProducts: ["ms-aeroglide-start", "ms-aeroglide-creator", "ms-vector-pro"],
  },
  {
    id: "guide-monitor",
    title: "เลือกจอมอนิเตอร์ยังไงให้คม สบายตา และคุ้มกับการใช้งาน",
    excerpt: "ดูความละเอียด ขนาด พาเนล และรีเฟรชเรตแบบเข้าใจง่าย เพื่อให้เลือกจอได้เหมาะกับการเรียน งาน และเกม",
    image: "https://images.unsplash.com/photo-1668979324549-b395425429f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "26 ต.ค. 2025",
    category: "เทคนิคเลือกอุปกรณ์",
    readTime: "7 นาที",
    content: "จอที่เหมาะกับคุณไม่จำเป็นต้องเป็นตัวท็อปที่สุด แต่ต้องเข้ากับงานที่ทำจริงทุกวัน\n\n### QHD กับ 4K ต่างกันยังไง\nQHD ให้ความคมชัดที่ดีมากกับขนาด 27 นิ้ว ส่วน 4K จะเด่นเรื่องพื้นที่ทำงานและความละเอียดสำหรับงานภาพมากขึ้น\n\n### พาเนลและรีเฟรชเรต\nIPS ให้สีสวยและมุมมองดี เหมาะกับงานทั่วไป ส่วนรีเฟรชเรตสูงช่วยให้การเลื่อนหน้าจอและเกมลื่นขึ้นชัดเจน\n\n### อย่ามองข้ามการปรับขาตั้ง\nจอที่ปรับสูงต่ำหรือหมุนได้ช่วยให้คุณจัดท่านั่งสบายขึ้นกว่าจอที่สเปกแรงแต่ตั้งไม่พอดีกับโต๊ะ",
    relatedProducts: ["mn-clearview-plus", "mn-clearview-pro", "mn-framepro-creator"],
  },
  {
    id: "guide-storage",
    title: "SSD แบบไหนเหมาะกับคุณ ระหว่างอัปเกรดเครื่องกับพกพาไปทำงาน",
    excerpt: "เข้าใจความต่างของ SSD ภายในและ SSD พกพา เพื่อให้เลือกซื้อได้ตรงกับปัญหาที่ต้องการแก้จริง",
    image: "https://images.unsplash.com/photo-1665836723795-692a918209a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2 พ.ย. 2025",
    category: "คู่มือเลือกซื้อ",
    readTime: "6 นาที",
    content: "SSD ภายในกับ SSD พกพาไม่ได้แทนกันทุกกรณี แต่แต่ละแบบมีจุดเด่นชัดเจน\n\n### ถ้าเครื่องช้า ให้เริ่มที่ SSD ภายใน\nการอัปเกรดไดรฟ์ระบบมักให้ผลลัพธ์ชัดเจนที่สุด ทั้งเวลาเปิดเครื่อง โหลดโปรแกรม และย้ายไฟล์งาน\n\n### ถ้าทำงานหลายที่ SSD พกพาช่วยมาก\nสำหรับคนที่ต้องพกงานไปกลับบ้าน มหาวิทยาลัย หรือสตูดิโอ SSD พกพาช่วยให้ workflow คล่องและปลอดภัยขึ้น\n\n### ดูพอร์ตและสายให้ครบ\nถ้าอุปกรณ์ของคุณใช้ USB-C เป็นหลัก เลือกรุ่นที่มีสายครบในกล่องจะใช้งานได้สะดวกกว่าในระยะยาว",
    relatedProducts: ["st-swiftvault-start", "st-swiftvault-pro", "st-pocketcore-creator"],
  },
  {
    id: "guide-beginner-setup",
    title: "จัดเซ็ตอุปกรณ์คอมสำหรับมือใหม่ให้ใช้งานง่ายและดูดี",
    excerpt: "แนวทางเริ่มต้นสำหรับคนที่อยากมีโต๊ะคอมสะอาด ใช้งานคล่อง และไม่ซื้อเกินความจำเป็น",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "10 พ.ย. 2025",
    category: "เริ่มต้นสำหรับมือใหม่",
    readTime: "8 นาที",
    content: "มือใหม่ไม่จำเป็นต้องซื้อทุกอย่างพร้อมกันตั้งแต่วันแรก การจัดลำดับความสำคัญจะช่วยให้เซ็ตดูดีและคุ้มค่ากว่า\n\n### เริ่มจากของที่สัมผัสทุกวัน\nคีย์บอร์ด เมาส์ และจอ เป็นสามชิ้นที่ส่งผลกับความรู้สึกใช้งานมากที่สุด จึงควรเริ่มจากตรงนี้ก่อน\n\n### เน้นโทนสีและขนาดให้ไปด้วยกัน\nถ้าอยากได้ฟีล clean setup เลือกอุปกรณ์ที่โทนใกล้กันและไม่ใหญ่มากเกินพื้นที่โต๊ะ\n\n### อ่านรีวิวและบทความก่อนซื้อ\nการเข้าใจจุดเด่นของแต่ละหมวดจะช่วยให้คุณซื้อของชิ้นแรกได้ใกล้เคียงกับสิ่งที่ต้องการจริงที่สุด",
    relatedProducts: ["kb-nimbus-start", "ms-aeroglide-balance", "mn-clearview-start"],
  },
  {
    id: "guide-headset",
    title: "เลือกหูฟังและเฮดเซตให้เหมาะกับประชุม เล่นเกม และฟังเพลง",
    excerpt: "ดูทั้งความสบาย ไมโครโฟน และโทนเสียง เพื่อให้หูฟังหนึ่งตัวตอบโจทย์ได้มากกว่าแค่การเล่นเกม",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "17 พ.ย. 2025",
    category: "เทคนิคเลือกอุปกรณ์",
    readTime: "5 นาที",
    content: "หูฟังที่ดีสำหรับใช้งานทุกวันควรบาลานซ์ทั้งเสียง ความสบาย และคุณภาพไมค์ ไม่ใช่เลือกจากหน้าตาอย่างเดียว\n\n### ความสบายคือเรื่องหลัก\nถ้าคุณใส่วันละหลายชั่วโมง น้ำหนักและฟองน้ำครอบหูจะมีผลกับประสบการณ์มากกว่าสเปกบางอย่าง\n\n### โทนเสียงต้องเข้ากับสิ่งที่ฟัง\nบางคนชอบเบสหนัก บางคนชอบเสียงกลางชัด ลองมองหาหูฟังที่โทนเสียงเข้ากับการใช้งานจริงของคุณ\n\n### ไมโครโฟนสำคัญถ้าต้องประชุม\nถ้าใช้ทั้งประชุมและเล่นเกม เลือกเฮดเซตที่ไมค์ชัด จะช่วยให้จบได้ในตัวเดียว",
    relatedProducts: ["hs-pulse-plus", "hs-pulse-creator", "hs-aura-pro"],
  },
];
