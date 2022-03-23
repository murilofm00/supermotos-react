import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
