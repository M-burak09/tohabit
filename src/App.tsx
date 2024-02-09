import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/HomePage.tsx";
import Login from "./pages/LoginPage.tsx";

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={sessionStorage.getItem("current_user") !== null ? (<Home />) : (<Navigate replace to={"/login"} />)} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
