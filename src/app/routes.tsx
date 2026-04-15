import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { About, ArticleDetail, Articles, Cart, Checkout, Contact, FAQ, Home, ProductDetail, Products } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "articles", Component: Articles },
      { path: "articles/:id", Component: ArticleDetail },
      { path: "contact", Component: Contact },
      { path: "about", Component: About },
      { path: "faq", Component: FAQ },
      { path: "*", Component: () => <div className="p-20 text-center text-3xl font-bold text-slate-400">ไม่พบหน้าที่ต้องการ</div> },
    ],
  },
]);
