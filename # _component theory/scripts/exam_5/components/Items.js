import Component from "../core/Component";

export default class Items extends Component {
  setup() {
    this.$state = { items: ["item1", "item2"] };
  }

  template() {
    const { items } = this.$state;
    return `
        <ul>
            ${items
              .map(
                (item, key) => `
            <li>
              ${item}
              <button class="deleteBtn" data-index=${key}>삭제</button>
            </li>`
              )
              .join("")}
        </ul>
        <button class="appendBtn">추가</button>
    `;
  }

  setEvent() {
    // Original Event
    // this.$target.querySelector(".appendBtn").addEventListener("click", () => {
    //   const { items } = this.$state;
    //   this.setState({ items: [...items, `item${items.length + 1}`] });
    // });

    // this.$target.querySelectorAll(".deleteBtn").forEach((deleteBtn) =>
    //   deleteBtn.addEventListener("click", ({ target }) => {
    //     const items = [...this.$state.items];
    //     items.splice(target.dataset.index, 1);
    //     this.setState({ items });
    //   })
    // );

    // Event Bubbling
    // this.$target.addEventListener("click", ({ target }) => {
    //   const items = [...this.$state.items];

    //   if (target.classList.contains("appendBtn"))
    //     this.setState({ items: [...items, `item${items.length + 1}`] });

    //   if (target.classList.contains("deleteBtn")) {
    //     items.splice(target.dataset.index, 1);
    //     this.setState({ items });
    //   }
    // });

    // Event Bubbling Modulization
    this.addEvent("click", ".appendBtn", ({ target }) => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item ${items.length + 1}`] });
    });

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      const { items } = this.$state;
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
  }
}
