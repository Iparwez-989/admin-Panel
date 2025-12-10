import { create } from "zustand";
import axios from "axios";

export const useUsersStore = create((set, get) => ({
  users: [],
  total: 0,
  cache: {},         // page-wise cache
  searchCache: {},   // search caching
  loading: false,

  // Fetch users with pagination + caching
  fetchUsers: async (limit = 10, skip = 0) => {
    const pageKey = `${limit}-${skip}`;

    // If cached → return instantly
    if (get().cache[pageKey]) {
      set({
        users: get().cache[pageKey].users,
        total: get().cache[pageKey].total,
      });
      return;
    }

    set({ loading: true });

    try {
      const res = await axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );

      const data = res.data;

      // Save to cache
      set((state) => ({
        users: data.users,
        total: data.total,
        cache: {
          ...state.cache,
          [pageKey]: { users: data.users, total: data.total },
        },
        loading: false,
      }));
    } catch (error) {
      console.error("Fetch users error:", error);
      set({ loading: false });
    }
  },

  // Search with caching
  searchUsers: async (query) => {
    if (!query.trim()) return;

    // Return cached search if exists
    if (get().searchCache[query]) {
      set({ users: get().searchCache[query] });
      return;
    }

    set({ loading: true });

    try {
      const res = await axios.get(
        `https://dummyjson.com/users/search?q=${query}`
      );

      const data = res.data;

      // Cache search results
      set((state) => ({
        users: data.users,
        searchCache: {
          ...state.searchCache,
          [query]: data.users,
        },
        loading: false,
      }));
    } catch (error) {
      console.error("Search error:", error);
      set({ loading: false });
    }
  },
}));
