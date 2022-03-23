import { useState } from "react";
import { ResponsiveAppBar } from "./components/AppBar";
import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
}

export default App;
