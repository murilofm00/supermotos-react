import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ResponsiveAppBar } from "./components/AppBar";

function App() {
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
