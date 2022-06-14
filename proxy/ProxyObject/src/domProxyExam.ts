const view = new Proxy<any>(
  {
    selected: null,
    observer: document.getElementById("selected-observer"),
  },
  {
    set: function (obj, prop, newval) {
      const oldval = obj[prop];

      if (prop == "selected") {
        if (oldval) {
          oldval.setAttribute("aria-selected", "false");
        }
        if (newval) {
          newval.setAttribute("aria-selected", "true");
          obj.observer.textContent = `현재 선택된 아이템은 ${newval.id} 입니다.`;
        }
      }

      obj[prop] = newval;

      return true;
    },
  }
);

// const i1: any = (view.selected = document.getElementById("item-1"));
// console.log(i1.getAttribute("aria-selected"));

// const i2: any = (view.selected = document.getElementById("item-2"));
// console.log(i1.getAttribute("aria-selected"));
// console.log(i2.getAttribute("aria-selected"));

function onClick(id: string) {
  const item = document.getElementById(id);

  if (item) {
    view.selected = item;
  }
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  const target = button.dataset["target"];
  if (target) {
    button.addEventListener("click", () => onClick(target));
  }
});
