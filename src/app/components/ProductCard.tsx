import { Link } from "react-router";
import { Product } from "../data";
import { ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { motion } from "motion/react";
import { formatPrice } from "../lib/site";

export function ProductCard({ product }: { product: Product; index?: number }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/5"
    >
      {/* Image container */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-neutral-50 p-6">
        {product.isNew && (
          <Badge className="absolute left-4 top-4 z-10">มาใหม่</Badge>
        )}
        <Button variant="outline" size="icon" className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full border-neutral-200 bg-white/90 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <Heart className="h-4 w-4 text-slate-500 hover:text-red-500 transition-colors" />
        </Button>
        <Link to={`/products/${product.id}`} className="absolute inset-0 z-0 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Content container */}
      <div className="flex flex-1 flex-col p-5">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="line-clamp-1 text-lg font-semibold leading-tight text-neutral-950 transition-colors group-hover:text-red-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            {formatPrice(product.price)}
          </span>
          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-xl transition-colors group-hover:bg-red-700 group-hover:text-white">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Knowledge Base Link Footer */}
      <div className="border-t border-neutral-100 bg-neutral-50/70 px-5 py-3">
        <Link to={`/products/${product.id}#guide`} className="group/link flex items-center text-xs font-medium text-red-700 hover:text-red-800">
          <span>ดูคำแนะนำก่อนซื้อ</span>
          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
