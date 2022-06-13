import { RecoilRoot } from "recoil";
import CharacterCount from "./components/CharacterCount";
import TextInput from "./components/TextInput";

function App() {
  return (
    <>
      <TextInput />
      <CharacterCount />
    </>
  );
}

function QuickStart() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

export default QuickStart;
