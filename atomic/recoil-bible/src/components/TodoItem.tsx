import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../store/todos/atoms";
import { Todo } from "../store/todos/types";

type Props = {
  item: Todo;
};

function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex<T>(arr: T[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function TodoItem({ item }: Props) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newList = replaceItemAtIndex<Todo>(todoList, index, {
        ...item,
        text: e.target.value,
      });

      setTodoList(newList);
    },
    [index, todoList, item, setTodoList]
  );

  const toggleItemCompletion = React.useCallback(() => {
    const newList = replaceItemAtIndex<Todo>(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  }, [index, todoList, item, setTodoList]);

  const deleteItem = React.useCallback(() => {
    const newList = removeItemAtIndex<Todo>(todoList, index);

    setTodoList(newList);
  }, [todoList, index, setTodoList]);

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button type="button" onClick={deleteItem}>
        X
      </button>
    </div>
  );
}

export default TodoItem;
