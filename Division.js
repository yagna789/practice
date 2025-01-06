import React, { useState } from "react";
import { Line } from "react-chartjs-2";

function Division() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [performance, setPerformance] = useState([]);

  const generateQuestion = (level) => {
    let num1, num2;
    if (level === "1-digit") {
      num2 = Math.floor(Math.random() * 9) + 1; // Avoid division by zero
      num1 = num2 * Math.floor(Math.random() * 10);
    } else if (level === "2-digit") {
      num2 = Math.floor(Math.random() * 90) + 10;
      num1 = num2 * Math.floor(Math.random() * 10);
    } else if (level === "3-digit") {
      num2 = Math.floor(Math.random() * 900) + 100;
      num1 = num2 * Math.floor(Math.random() * 10);
    }
    setQuestion(`${num1} ÷ ${num2}`);
    setAnswer(num1 / num2);
  };

  const handleSubmit = () => {
    const isCorrect = parseFloat(userAnswer) === answer;
    const timestamp = new Date().toLocaleTimeString();
    setPerformance([
      ...performance,
      { question, userAnswer, correct: isCorrect, timestamp },
    ]);
    setUserAnswer("");
  };

  const chartData = {
    labels: performance.map((entry) => entry.timestamp),
    datasets: [
      {
        label: "Correct (1) vs Incorrect (0)",
        data: performance.map((entry) => (entry.correct ? 1 : 0)),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { beginAtZero: true, max: 1 },
      x: { title: { display: true, text: "Time" } },
    },
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Division</h2>
      <p>Select difficulty level:</p>
      <button onClick={() => generateQuestion("1-digit")}>1-Digit</button>
      <button onClick={() => generateQuestion("2-digit")}>2-Digit</button>
      <button onClick={() => generateQuestion("3-digit")}>3-Digit</button>

      {question && (
        <div style={{ marginTop: "20px" }}>
          <h3>Question: {question}</h3>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {performance.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3>Performance Chart</h3>
          <Line data={chartData} options={chartOptions} />
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3>Performance Table</h3>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct?</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {performance.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.question}</td>
                    <td>{entry.userAnswer}</td>
                    <td>{entry.correct ? "Yes" : "No"}</td>
                    <td>{entry.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Division;
