import React from "react";
import { useRecoilState } from "recoil";
import store from "../store";

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

export default TextInput;
