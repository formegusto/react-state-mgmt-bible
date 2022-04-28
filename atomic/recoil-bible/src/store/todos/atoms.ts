import { atom } from "recoil";
import { Todo } from "./types";

export const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom<string>({
  key: "todoListFilterState",
  default: "Show All",
});
