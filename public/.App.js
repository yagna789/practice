import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "Home";
import Addition from "Addition";
import Subtraction from "Subtraction";
import Multiplication from "Multiplication";
import Division from "Division";
import Squares from "Squares";
import Cubes from "Cubes";

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
