import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: null, 
    setUser: (newUser) => set({ user: newUser }),
    addPoints: (points) => set((state) => {
        const updatedUser = {...state.user, leaves: state.user.leaves + points };
        return { user: updatedUser };
    }),
}));

export default useUserStore;