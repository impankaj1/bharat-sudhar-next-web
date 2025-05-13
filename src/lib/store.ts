import { create } from 'zustand';

interface UserState {
  user: {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    state?: string;
    district?: string;
    userStatus?: 'regular' | 'activist' | 'propagandist';
    reputation?: {
      score: number;
      totalReports: number;
      resolvedReports: number;
      spamReports: number;
    };
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));