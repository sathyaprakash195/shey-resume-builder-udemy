import { IUser } from "@/interfaces";
import { create } from "zustand";

const usersGlobalStore = create((set) => ({
  currentUserData: null,
  setCurrentUserData: (data: IUser) => set({ currentUserData: data }),
}));

export interface IUsersStore {
  currentUserData: IUser | null;
  setCurrentUserData: (data: IUser) => void;
}
export default usersGlobalStore as any