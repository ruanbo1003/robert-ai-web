
import { create } from "zustand";


interface User {
    name: string,
    token: string

    setName: (name: string) => void
}


const useUserStore = create<User>((set) => ({
    name: "",
    token: "",
    setName: (name: string) => set((state) => ({name: name}))
}))

export default useUserStore;
