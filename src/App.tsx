import { useState } from "react";
import { ResponsiveAppBar } from "./components/AppBar";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ResponsiveAppBar />
    </div>
  );
}

export default App;
