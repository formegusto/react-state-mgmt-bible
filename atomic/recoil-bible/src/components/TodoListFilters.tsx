import React from "react";
import { useRecoilState } from "recoil";
import { todoListFilterState } from "../store/todos/atoms";

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">모두 보기</option>
        <option value="Show Completed">다 했다!</option>
        <option value="Show Uncompleted">해야행,,</option>
      </select>
    </>
  );
}

export default TodoListFilters;
