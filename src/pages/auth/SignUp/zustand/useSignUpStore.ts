import { create } from 'zustand';

export interface SignUpFormData {
  userType: 'DRIVER' | 'CLIENT' | 'ADMIN' | '';
}

interface SignUpStore {
  data: SignUpFormData;
  setData: (data: Partial<SignUpFormData>) => void;
  resetData: () => void;
}

const initialData: SignUpFormData = {
  userType: '',
};

export const useSignUpStore = create<SignUpStore>((set) => ({
  data: initialData,

  setData: (data: Partial<SignUpFormData>) =>
    set((state) => ({
      data: {
        ...state.data,
        ...data,
      },
    })),

  resetData: () =>
    set({
      data: initialData,
    }),
}));
