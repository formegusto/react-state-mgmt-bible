import React from "react";

function ErrorCounter() {
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    if (count === 2) throw new Error("I crashed!");
  }, [count]);

  return <h1 onClick={() => setCount((prev) => ++prev)}>{count}</h1>;
}

export default ErrorCounter;
