import { useState } from "react";
import { ResponsiveAppBar } from "./components/AppBar";
import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default App;
