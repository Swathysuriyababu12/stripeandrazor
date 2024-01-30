import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sucess from "./components/sucess";

import Cart from "./components/Cart";
import Failure from "./components/Failure";
import Razorcart from "./components/Razorcat"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/success" element={<Sucess />}></Route>
        <Route path="/failure" element={<Failure />}></Route>

        <Route path="/" element={<Cart />}></Route>
        <Route path="/razorcart" element={<Razorcart/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
