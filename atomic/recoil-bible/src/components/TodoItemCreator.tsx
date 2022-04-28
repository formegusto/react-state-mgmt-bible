import React from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../store/todos/atoms";

let id = 0;
function getId() {
  return id++;
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = React.useCallback(() => {
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);

    setInputValue("");
  }, [inputValue, setTodoList]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button type="button" onClick={addItem}>
        할 일 추가
      </button>
    </div>
  );
}

export default TodoItemCreator;
