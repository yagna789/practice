import React, { useState } from "react";

function Cubes() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const generateCube = () => {
    const num = Math.floor(Math.random() * 20) + 1; // Between 1 and 20
    setQuestion(`${num}³`);
    setAnswer(num * num * num);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Cubes</h2>
      <button onClick={generateCube}>Generate Cube</button>
      {question && (
        <div style={{ marginTop: "20px" }}>
          <h3>Question: {question}</h3>
          <p>Answer: {answer}</p>
        </div>
      )}
    </div>
  );
}

export default Cubes;
