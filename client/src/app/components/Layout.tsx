import { Outlet, Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Search, MonitorSpeaker, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CATEGORIES, STORE_INFO } from '../data';
import { Button, cn } from './ui';

export function Layout() {
  const { cartCount } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Products', path: '/categories/all' },
    { name: 'Guides', path: '/articles' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar Announcement */}
      <div className="bg-slate-900 text-slate-300 py-1.5 text-xs font-medium text-center tracking-wide">
        <p className="flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Free shipping on orders over ฿3,000. Easy 30-day returns.
        </p>
      </div>

      {/* Navbar */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          isScrolled 
            ? "bg-white/80 backdrop-blur-md border-slate-200 shadow-sm py-3" 
            : "bg-white border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <MonitorSpeaker className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">CleanTech</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest block mt-0.5">Workspace</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  location.pathname === link.path ? "text-blue-600" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link 
              to="/cart" 
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden z-40 relative"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium",
                    location.pathname === link.path 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100 px-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <Link key={cat.id} to={`/categories/${cat.id}`} className="text-sm text-slate-600 py-2 hover:text-blue-600 flex items-center">
                      <ChevronRight className="w-3 h-3 mr-1 opacity-50" />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <MonitorSpeaker className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">CleanTech</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                We provide thoughtfully curated technology and accessories to help you build a clean, productive, and inspiring workspace.
              </p>
              <div className="flex gap-4">
                {/* Social mocks */}
                {['Twitter', 'Instagram', 'YouTube'].map(social => (
                  <a key={social} href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded-[3px]" /> {/* Icon placeholder */}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Shop by Category</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/categories/all" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">All Products</Link>
                </li>
                {CATEGORIES.slice(0, 4).map(cat => (
                  <li key={cat.id}>
                    <Link to={`/categories/${cat.id}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Support & Guides</h3>
              <ul className="space-y-3">
                {['FAQ', 'Shipping & Returns', 'Track Order', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/articles" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Buying Guides</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-500 leading-relaxed">{STORE_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-500">{STORE_INFO.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-500">{STORE_INFO.email}</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} CleanTech Workspace. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link to="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-slate-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
