import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-5xl font-extrabold text-center my-8 tracking-wide">
          <span className="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            My E-Store
          </span>
        </h1>
      </div>
    </>
  );
}

export default App;
