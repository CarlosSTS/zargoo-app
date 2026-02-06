import { create } from 'zustand';
import { RegisterDriverFormData } from '../interface/registerDriver';

const initialState: Partial<RegisterDriverFormData> = {};

type SignUpFormStore = {
  signUpData: Partial<RegisterDriverFormData>;
  // eslint-disable-next-line no-unused-vars
  setSignUpData: (data: Partial<RegisterDriverFormData>) => void;
  clearSignUpData: () => void;
};

export const useSignUpFormStore = create<SignUpFormStore>((set) => ({
  signUpData: initialState,

  setSignUpData: (data: Partial<RegisterDriverFormData>) => {
    set((state) => ({
      signUpData: {
        ...state.signUpData,
        ...data,
      },
    }));
  },

  clearSignUpData: () => set({ signUpData: initialState }),
}));
