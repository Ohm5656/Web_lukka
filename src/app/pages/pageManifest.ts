import { articles, products } from "../data";

export const routePageGroups = {
  site: [
    { name: "Home", path: "/", file: "src/app/pages/site/Home.tsx" },
    { name: "About", path: "/about", file: "src/app/pages/site/About.tsx" },
    { name: "Contact", path: "/contact", file: "src/app/pages/site/Contact.tsx" },
    { name: "FAQ", path: "/faq", file: "src/app/pages/site/FAQ.tsx" },
  ],
  shop: [
    { name: "Products", path: "/products", file: "src/app/pages/shop/Products.tsx" },
    { name: "Product Detail", path: "/products/:id", file: "src/app/pages/shop/ProductDetail.tsx" },
    { name: "Cart", path: "/cart", file: "src/app/pages/shop/Cart.tsx" },
    { name: "Checkout", path: "/checkout", file: "src/app/pages/shop/Checkout.tsx" },
  ],
  content: [
    { name: "Articles", path: "/articles", file: "src/app/pages/content/Articles.tsx" },
    { name: "Article Detail", path: "/articles/:id", file: "src/app/pages/content/ArticleDetail.tsx" },
  ],
} as const;

export const archivedPageFiles = [
  "src/app/archive-pages/Article.tsx",
  "src/app/archive-pages/Category.tsx",
] as const;

export const pageCounts = {
  staticRoutePages: 8,
  dynamicRouteTemplates: 2,
  productDetailPages: products.length,
  articleDetailPages: articles.length,
  totalAddressablePages: 8 + products.length + articles.length,
  archivedPageFiles: archivedPageFiles.length,
} as const;
