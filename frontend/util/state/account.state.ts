import { create } from "zustand";
import { User } from "../types/shared";
import { user } from "./DEFAULT";
import { Address } from "../types/shared";

type Action = {
  updateAccount: (account: User) => void;
  updateBalance: (amount: number) => void;
  updateValidators: (validators: Address[])=> void;
};

const useAccountStore = create<User & Action>((set) => ({
  ...user,
  updateAccount: (account) => set({ ...account, isSeller: false }),
  updateBalance: (balance) => set({ balance: balance }),
  updateValidators: (validators) => set({ validators }),
}));

export default useAccountStore;
