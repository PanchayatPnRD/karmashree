import { create } from "zustand";
import zustymiddleware from "zustymiddleware";

const useTokenStore = create(zustymiddleware((set) => ({
  token: '',
  setToken: (data) => set(() => ({ token: data })),
})))

window.store = useTokenStore;

export default useTokenStore