import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Multiplication() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [performance, setPerformance] = useState([]);
  const [level, setLevel] = useState("1-digit"); // Default to 1-digit
  const [subLevel, setSubLevel] = useState("1-digit-vs-1-digit"); // Default to 1-digit vs 1-digit
  const inputRef = useRef(null); // Ref for the input field

  // Automatically focus the input field when a new question is generated or after submission
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question]);

  const generateQuestion = () => {
    let num1, num2;

    // Generate numbers based on selected difficulty and sub-level
    if (level === "1-digit") {
      num1 = Math.floor(Math.random() * 9) + 2; // Ensure num1 is between 2 and 9
      num2 = num1; // 1-digit vs 1-digit
    } else if (level === "2-digit") {
      if (subLevel === "2-digit-vs-1-digit") {
        num1 = Math.floor(Math.random() * 89) + 11; // 2-digit number
        num2 = Math.floor(Math.random() * 9) + 2; // 1-digit number
      } else if (subLevel === "2-digit-vs-2-digit") {
        num1 = Math.floor(Math.random() * 89) + 11; // 2-digit number
        num2 = Math.floor(Math.random() * 89) + 11; // 2-digit number
      }
    } else if (level === "3-digit") {
      if (subLevel === "3-digit-vs-1-digit") {
        num1 = Math.floor(Math.random() * 899) + 101; // 3-digit number
        num2 = Math.floor(Math.random() * 9) + 2; // 1-digit number
      } else if (subLevel === "3-digit-vs-2-digit") {
        num1 = Math.floor(Math.random() * 899) + 101; // 3-digit number
        num2 = Math.floor(Math.random() * 89) + 11; // 2-digit number
      } else if (subLevel === "3-digit-vs-3-digit") {
        num1 = Math.floor(Math.random() * 899) + 101; // 3-digit number
        num2 = Math.floor(Math.random() * 899) + 101; // 3-digit number
      }
    }

    setQuestion(`${num1} × ${num2}`);
    setAnswer(num1 * num2);
  };

  const handleSubmit = () => {
    if (userAnswer.trim() === "") return; // Prevent submission if the input is empty
    const isCorrect = parseInt(userAnswer) === answer;
    const timestamp = new Date().toLocaleTimeString();
    setPerformance((prevPerformance) => [
      ...prevPerformance,
      { question, userAnswer, correct: isCorrect, timestamp },
    ]);
    setUserAnswer(""); // Clear the input field after submission
    generateQuestion(); // Generate a new question after submission
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(); // Call the submit handler when the Enter key is pressed
    }
  };

  const chartData = {
    labels: performance.map((entry) => entry.timestamp),
    datasets: [
      {
        label: "Correct (1) vs Incorrect (0)",
        data: performance.map((entry) => (entry.correct ? 1 : 0)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
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
      <h2>Multiplication</h2>
      
      {/* Difficulty Level Selection */}
      <p>Select difficulty level:</p>
      <button onClick={() => { setLevel("1-digit"); setSubLevel("1-digit-vs-1-digit"); generateQuestion(); }}>1-Digit</button>
      <button onClick={() => setLevel("2-digit")}>2-Digit</button>
      <button onClick={() => setLevel("3-digit")}>3-Digit</button>

      {/* Sub-level Selection (only visible when 2-digit or 3-digit is selected) */}
      {level === "2-digit" && (
        <div>
          <p>Select sub-level:</p>
          <button onClick={() => { setSubLevel("2-digit-vs-1-digit"); generateQuestion(); }}>2-Digit vs 1-Digit</button>
          <button onClick={() => { setSubLevel("2-digit-vs-2-digit"); generateQuestion(); }}>2-Digit vs 2-Digit</button>
        </div>
      )}

      {level === "3-digit" && (
        <div>
          <p>Select sub-level:</p>
          <button onClick={() => { setSubLevel("3-digit-vs-1-digit"); generateQuestion(); }}>3-Digit vs 1-Digit</button>
          <button onClick={() => { setSubLevel("3-digit-vs-2-digit"); generateQuestion(); }}>3-Digit vs 2-Digit</button>
          <button onClick={() => { setSubLevel("3-digit-vs-3-digit"); generateQuestion(); }}>3-Digit vs 3-Digit</button>
        </div>
      )}

      {/* Show the question and answer input */}
      {question && (
        <div style={{ marginTop: "20px" }}>
          <h3>Question: {question}</h3>
          <input
            ref={inputRef} // Attach the ref to the input field
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
            placeholder="Enter your answer"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {/* Performance Chart */}
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

export default Multiplication;
