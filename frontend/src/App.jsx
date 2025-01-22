import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fn = async () => {
      const { data } = await axios.get("http://localhost:3000");
      console.log(data);
    };
    fn();
  });

  return (
    <>
      <h1 className="font-bold text-xl">Hello, World</h1>
    </>
  );
}

export default App;
