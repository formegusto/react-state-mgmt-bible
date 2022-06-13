# Flux Pattern

> mvc(model-view-controller) 패턴의 복잡성을 해결하기 위해 나온 패턴

mvc 패턴은 view와 model 사이에 양방향으로 data가 흐르기 때문에 view에서 data를 변경하면 다른쪽 view에서도 data가 변경되고,, 변경되고,, 변경되고,, 이런 흐름이 깊어지면 꼬일 수 있다고 한다. 이 때 양방향이 아닌 단방향으로 data를 흐르도록 처리하면 문제가 해결되지 않을까 해서 나온 것이 flux pattern이다.

> **flux-pattern architecture**

**Action → Dispatcher → Store → View → Action → Dispatcher → Store → (,,,)**

- **Action**
  모든 data의 시작점이다. action은 데이터를 직접 가지고 있거나 가지고 있지 않을 수 있는데 특정 행동만 취할 수 있다.
- **Dispatcher**
  action을 받아서 store로 넘겨주는 역할을 한다. 바로 store로 넘기면 된다고 생각할 수 있겠지만, dispatcher의 다른 역할은 callback을 등록할 수 있다는 특징에서 나온다. 이 callback에서 data의 처리가 일어난다.
- **Store**
  dispatcher에 callback에서 처리된 data를 저장하는 곳 이다. store 내부의 data가 변경되면 변경을 감지하고 view에게 재 렌더링을 알린다.

## References

[[ReactJS] Flux패턴과 Redux](https://artdev.tistory.com/71)
