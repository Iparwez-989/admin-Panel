import { create } from "zustand";

export const useProductsStore = create((set, get) => ({
  products: [],
  categories: [],
  total: 0,

  // ---------- PRODUCT LIST WITH CACHING ----------
  fetchProducts: async (limit = 10, skip = 0) => {
    const cacheKey = `products_${limit}_${skip}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const data = JSON.parse(cached);
      set({ products: data.products, total: data.total });
      return;
    }

    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();

    localStorage.setItem(cacheKey, JSON.stringify(data));
    set({ products: data.products, total: data.total });
  },

  // ---------- SEARCH WITH CACHING ----------
  searchProducts: async (query) => {
    const cacheKey = `search_${query}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const data = JSON.parse(cached);
      set({ products: data.products, total: data.total });
      return;
    }

    const res = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    const data = await res.json();

    localStorage.setItem(cacheKey, JSON.stringify(data));
    set({ products: data.products, total: data.total });
  },

  // ---------- CATEGORIES WITH CACHING ----------
  fetchCategories: async () => {
  const res = await fetch("https://dummyjson.com/products/categories");
  let data = await res.json();

  // Normalize categories => Always return string category name
  const clean = data.map((cat) =>
    typeof cat === "string" ? cat : cat.slug || cat.name
  );

  // Remove duplicates
  const unique = [...new Set(clean)];

  set({ categories: unique });
},

  // ---------- CATEGORY FILTER WITH CACHING ----------
  filterByCategory: async (category, limit = 10, skip = 0) => {
    const cacheKey = `category_${category}_${limit}_${skip}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const data = JSON.parse(cached);
      set({ products: data.products, total: data.total });
      return;
    }

    const res = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();

    localStorage.setItem(cacheKey, JSON.stringify(data));
    set({ products: data.products, total: data.total });
  },
}));
