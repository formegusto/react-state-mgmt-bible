import { useRecoilValue } from "recoil";
import { filteredTodoListState } from "../store/todos/selectors";
import TodoItem from "./TodoItem";
import TodoItemCreator from "./TodoItemCreator";
import TodoListFilters from "./TodoListFilters";
import TodoListStats from "./TodoListStats";

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListFilters />
      <TodoListStats />
      <TodoItemCreator />
      {todoList.map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </>
  );
}

export default TodoList;
