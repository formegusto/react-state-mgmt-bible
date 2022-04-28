import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const textState = atom<string>({
  key: "textState",
  default: "",
});

const charCountState = selector<number>({
  key: "charCountState",
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText]
  );

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function HelloRecoil() {
  return (
    <>
      <TextInput />
      <CharacterCount />
    </>
  );
}

export default HelloRecoil;
