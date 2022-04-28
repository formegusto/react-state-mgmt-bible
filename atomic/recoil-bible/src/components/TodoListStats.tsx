import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../store/todos/selectors";

function TodoListStats() {
  const stats = useRecoilValue(todoListStatsState);

  return (
    <ul>
      {Object.keys(stats).map((key) => (
        <li key={key}>
          {key} - {(stats as any)[key]}
        </li>
      ))}
    </ul>
  );
}

export default TodoListStats;
