import {
  HardDrive,
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
  type LucideIcon,
} from "lucide-react";
import { apiUrl } from "./api";
import type { Article, Category, Product } from "../data";

type ApiCategory = Omit<Category, "icon"> & {
  icon: string;
};

const categoryIconMap: Record<string, LucideIcon> = {
  HardDrive,
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(apiUrl(path));

  if (!response.ok) {
    throw new Error(`Request failed for ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function hydrateCategory(category: ApiCategory): Category {
  return {
    ...category,
    icon: categoryIconMap[category.icon] ?? Monitor,
  };
}

export async function fetchCategories() {
  const categories = await fetchJson<ApiCategory[]>("/categories");
  return categories.map(hydrateCategory);
}

export async function fetchProducts() {
  return fetchJson<Product[]>("/products");
}

export async function fetchProduct(id: string) {
  return fetchJson<Product>(`/products/${id}`);
}

export async function fetchArticles() {
  return fetchJson<Article[]>("/articles");
}

export async function fetchArticle(id: string) {
  return fetchJson<Article>(`/articles/${id}`);
}
