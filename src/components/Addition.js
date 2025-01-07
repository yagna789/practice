import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";

Chart.register(LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend);

function Addition() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [performance, setPerformance] = useState([]);

  const generateQuestion = (level) => {
    let num1, num2;

    if (level === "1-digit") {
      num1 = Math.floor(Math.random() * 8) + 2; // Generates numbers from 2 to 9
      num2 = Math.floor(Math.random() * 8) + 2; // Generates numbers from 2 to 9
    } else if (level === "2-digit") {
      num1 = Math.floor(Math.random() * 90) + 10; // Generates numbers from 10 to 99
      num2 = Math.floor(Math.random() * 90) + 10; // Generates numbers from 10 to 99
    } else if (level === "3-digit") {
      num1 = Math.floor(Math.random() * 900) + 100; // Generates numbers from 100 to 999
      num2 = Math.floor(Math.random() * 90) + 10; // Generates numbers from 10 to 99
    }

    setQuestion(`${num1} + ${num2}`);
    setAnswer(num1 + num2);
  };

  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === answer;
    const timestamp = new Date().toLocaleTimeString(); // Current time in HH:MM:SS format
    setPerformance([
      ...performance,
      {
        question,
        userAnswer,
        correct: isCorrect,
        timestamp,
      },
    ]);
    setUserAnswer("");
  };

  const chartData = {
    labels: performance.map((entry) => entry.timestamp), // Timestamps as labels
    datasets: [
      {
        label: "Correct (1) vs Incorrect (0)",
        data: performance.map((entry) => (entry.correct ? 1 : 0)),
        backgroundColor: performance.map((entry) =>
          entry.correct ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
        ),
        borderColor: performance.map((entry) =>
          entry.correct ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
        ),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        title: { display: true, text: "Correct (1) vs Incorrect (0)" },
      },
      x: {
        title: { display: true, text: "Time" },
      },
    },
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Addition</h2>
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

export default Addition;
