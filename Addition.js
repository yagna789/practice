import React, { useState } from "react";

function Addition() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const generateQuestion = (level) => {
    let num1, num2;
    if (level === "1-digit") {
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
    } else if (level === "2-digit") {
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;
    } else if (level === "3-digit") {
      num1 = Math.floor(Math.random() * 900) + 100;
      num2 = Math.floor(Math.random() * 90) + 10; // 3-digit with 2-digit
    }
    setQuestion(`${num1} + ${num2}`);
    setAnswer(num1 + num2);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Addition</h2>
      <p>Select difficulty level:</p>
      <button onClick={() => { setDifficulty("1-digit"); generateQuestion("1-digit"); }}>1-Digit</button>
      <button onClick={() => { setDifficulty("2-digit"); generateQuestion("2-digit"); }}>2-Digit</button>
      <button onClick={() => { setDifficulty("3-digit"); generateQuestion("3-digit"); }}>3-Digit</button>
      
      {question && (
        <div style={{ marginTop: "20px" }}>
          <h3>Question: {question}</h3>
          <p>Answer: {answer}</p>
        </div>
      )}
    </div>
  );
}

export default Addition;
