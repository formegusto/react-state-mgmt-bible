import { atom } from "recoil";

export const currentPostIDState = atom<number | null>({
  key: "CurrentPostID",
  default: null,
});
