# Recoil Quick Start

## RecoilRoot

```tsx
<RecoilRoot>
  <App />
</RecoilRoot>
```

## Atoms

> Atom Definition

Atom은 **상태(state)의 일부**를 나타낸다. **어떤 컴포넌트에서나 읽고 사용**할 수 있다. **atom의 값을 읽는** 컴포넌트들은 **암묵적으로 atom을 구독**하며, **atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 재 렌더링** 된다.

```tsx
const textState = atom<string>({
  key: "textState",
  default: "",
});
```

> Atom Usage

```tsx
function TextInput() {
  const [text, setText] = useRecoilState(store.atoms.textState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

컴포넌트가 **atom을 읽고 쓰게 하기 위해서는 useRecoilState Hooks를 사용**하면 된다. 이 때 매개변수로 정의해놓은 **atom state를 전달**한다. 현재 **div태그와 input 태그는 atom인 textState를 구독하는 상태**이다. input 태그에서 **change event가 발생**하면, **textState를 구독중인 div태그와 input 태그는 재 렌더링이 발생**한다.

## Selectors

> Selector Definition

Selector는 **파생된 상태(derived state)의 일부**를 나타낸다. 파생된 상태란 **상태의 변화**를 가리킨다. **mobx의 computed**를 떠올리면 된다. **atom의 값이 변경되었을 때, 상태값을 이용한 새로운 상태를 만들어내고 싶을 때 사용**한다. 그렇기 때문에 **정의과정에서 atom값이 이용**된다.

```tsx
const charCountState = selector<number>({
  key: "charCountState",
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});
```

> Selector Usage

```tsx
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
```

selector는 get접근자를 이용한다. **현재 charCountState는 값을 조회만 할 수 있는 상태로 정의**되어 있다. **useRecoilState가 아닌, 값만 조회하는 useRecoilValue 함수를 이용**한다. 이 때 **textState와 charCountState는 종속관계가 형성**되기 때문에 **textState가 변화하면 charCountState도 함께 변화**한다.
