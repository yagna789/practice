import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Speed Math</h1>
      <p>Select a category to start practicing:</p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li><Link to="/addition">Addition</Link></li>
        <li><Link to="/subtraction">Subtraction</Link></li>
        <li><Link to="/multiplication">Multiplication</Link></li>
        <li><Link to="/division">Division</Link></li>
        <li><Link to="/squares">Squares</Link></li>
        <li><Link to="/cubes">Cubes</Link></li>
      </ul>
    </div>
  );
}

export default Home;
