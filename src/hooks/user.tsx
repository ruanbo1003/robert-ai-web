
import { create } from "zustand";

export const useAuthUser = create((set, get) => ({
    token: '',
    name: '',
    role: 'admin',

    setToken: (val) => set((state) => ({ token: val})),
}))
