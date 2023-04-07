import React from "react";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Testing from "./pages/Testing";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      
      <Route path="/Testing" element={<Testing />} />
    
    </Routes>

  );
}

export default App;
