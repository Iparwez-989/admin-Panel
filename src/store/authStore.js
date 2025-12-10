import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,

  login: async (username, password) => {
    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;

      // Use token OR accessToken (both possibilities)
      const token = data.token || data.accessToken;

      if (token) {
        set({ token, user: data });

        // Optional: persist token in localStorage
        localStorage.setItem("token", token);

        return { success: true };
      } else {
        return { success: false, message: data.message || "Login Failed" };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  },

  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem("token");
  },
}));
