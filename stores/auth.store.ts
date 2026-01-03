import { secureStorage } from "@/lib/secureStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
