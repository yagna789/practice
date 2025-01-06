import React, { useState } from "react";
import { Line } from "react-chartjs-2";

function Cubes() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [performance, setPerformance] = useState([]);

  const generateQuestion = () => {
    const num = Math.floor(Math.random() * 20) + 1; // Between 1 and 20
    setQuestion(`What is ${num}³?`);
    setAnswer(num * num * num);
  };

  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === answer;
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
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
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
      <h2>Cubes</h2>
      <button onClick={generateQuestion}>Generate Question</button>

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

export default Cubes;
