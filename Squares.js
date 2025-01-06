import React, { useState } from "react";

function Squares() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const generateSquare = () => {
    const num = Math.floor(Math.random() * 40) + 1; // Between 1 and 40
    setQuestion(`${num}²`);
    setAnswer(num * num);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Squares</h2>
      <button onClick={generateSquare}>Generate Square</button>
      {question && (
        <div style={{ marginTop: "20px" }}>
          <h3>Question: {question}</h3>
          <p>Answer: {answer}</p>
        </div>
      )}
    </div>
  );
}

export default Squares;
