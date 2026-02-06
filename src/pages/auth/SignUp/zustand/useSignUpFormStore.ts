import { create } from 'zustand';
import { RegisterUserFormData } from '../interface/registerUser';

const initialState: Partial<RegisterUserFormData> = {};

type SignUpFormStore = {
  signUpData: Partial<RegisterUserFormData>;
  // eslint-disable-next-line no-unused-vars
  setSignUpData: (data: Partial<RegisterUserFormData>) => void;
  clearSignUpData: () => void;
};

export const useSignUpFormStore = create<SignUpFormStore>((set) => ({
  signUpData: initialState,

  setSignUpData: (data: Partial<RegisterUserFormData>) => {
    set((state) => ({
      signUpData: {
        ...state.signUpData,
        ...data,
      },
    }));
  },

  clearSignUpData: () => set({ signUpData: initialState }),
}));
