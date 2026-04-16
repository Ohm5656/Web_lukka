import { Link } from "react-router";
import { Article } from "../data";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "./ui/Badge";
import { motion } from "motion/react";

export function ArticleCard({ article }: { article: Article; index?: number }) {
  return (
    <motion.article 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/5"
    >
      <Link to={`/articles/${article.id}`} className="relative aspect-video overflow-hidden bg-slate-100 block">
        <img 
          src={article.image} 
          alt={article.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-red-700 shadow-sm backdrop-blur">
            {article.category}
          </Badge>
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>
        
        <Link to={`/articles/${article.id}`} className="block mb-2 flex-1">
          <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-red-700">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </Link>
        
        <Link to={`/articles/${article.id}`} className="group/link mt-4 inline-flex w-fit items-center text-sm font-semibold text-red-700 hover:text-red-800">
          อ่านบทความ
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
