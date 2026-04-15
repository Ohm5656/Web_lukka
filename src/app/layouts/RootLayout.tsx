import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 font-sans text-slate-900 selection:bg-red-200 selection:text-red-950">
      <ScrollRestoration />
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-1 flex-col bg-white shadow-2xl">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
