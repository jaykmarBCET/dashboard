import { create } from 'zustand';
import { IUsers } from '@/models/user.model';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export interface IUserStore {
  users: IUsers[];
  createUser: (user: Partial<IUsers>) => Promise<void>;
  getUser: () => Promise<void>;
}

export const UserStore = create<IUserStore>((set, get) => ({
  users: [],

  createUser: async (user) => {
    try {
      const response = await axios.post('/api/user', user);

      if (response.status >= 400) {
        toast.error(response.data?.message  || 'Error creating user');
        return;
      }

     
       await get().getUser()
      toast.success('User added successfully');
    } catch (error) {
      const axiosError = error as AxiosError<{message:string;success:boolean}>
      toast.error(axiosError.response?.data.message as string)
    }
  },

  getUser: async () => {
    try {
      const response = await axios.get('/api/user');

      if (response.status >= 400) {
        toast.error(response.data?.message || 'Failed to get users');
        return;
      }

      set({ users: response.data });
    } catch (error) {
      const err = error as AxiosError<{message:string;success:boolean}>
      toast.error(err.response?.data.message as string);
    }
  },
}));
