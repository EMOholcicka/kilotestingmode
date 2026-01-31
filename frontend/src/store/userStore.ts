import { create } from 'zustand';
import api from '../api/api';

interface User {
  id: number;
  email: string;
  // Add more fields if needed
}

interface UserState {
  user: User | null;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const response = await api.get('/users/me');
      set({ user: response.data });
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  },
}));