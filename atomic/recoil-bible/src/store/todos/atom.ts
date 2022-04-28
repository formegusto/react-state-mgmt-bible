import { atom } from "recoil";
import { Todo } from "./types";

const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: [],
});

export default todoListState;
