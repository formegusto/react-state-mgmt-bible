const $app = document.querySelector("#app");

let state = {
  items: ["item1", "item2", "item3", "item4"],
};

const render = () => {
  const { items } = state;
  $app.innerHTML = `
        <ul>
            ${items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <button id="append">추가</button>
    `;
  document.querySelector("#append").addEventListener("click", () => {
    setState({ items: [...items, `item${items.length + 1}`] });
  });
};

const setState = (newState) => {
  state = { ...state, ...newState };

  render();
};

render();

/*
저자의 말
"Rule 1. state가 변경되면 setState를 실행시킨다."
"Rule 2. state는 setState에 의해서만 변경되어야 한다."
"이러한 규칙을 지켜가면서 코드를 작성한다면, 브라우저 출력되는 내용은 무조건 state에 종속되는 것이다. 즉, DOM을 직접적으로 다룰 필요가 없어진다."

1. render() 초기 실행
2. [추가] 버튼 클릭 이벤트 발생
 "item 배열에 추가된다." - 이 때, setState가 실행되며, items가 교체되고, item list가 새롭게 렌더링 된다.
 Collect Rule 1 - [추가] 인터랙션에 의해 state가 변경되었다. item 리스트에 아이템이 추가됨 -> setState를 실행시킨다.
 Collect Rule 2 - setState로 한정지어져 있다.
*/
