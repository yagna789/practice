import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Addition from "./components/Addition";
import Subtraction from "./components/Subtraction";
import Multiplication from "./components/Multiplication";
import Division from "./components/Division";
import Squares from "./components/Squares";
import Cubes from "./components/Cubes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addition" element={<Addition />} />
        <Route path="/subtraction" element={<Subtraction />} />
        <Route path="/multiplication" element={<Multiplication />} />
        <Route path="/division" element={<Division />} />
        <Route path="/squares" element={<Squares />} />
        <Route path="/cubes" element={<Cubes />} />
      </Routes>
    </Router>
  );
}

export default App;
