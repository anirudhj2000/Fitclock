import { create } from 'zustand';

interface UserState {
  user: any;
  updateUser: (user: any) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user: user })),
}));

export default useUserStore;
