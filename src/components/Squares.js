import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";

function Squares() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [performance, setPerformance] = useState([]);
  const inputRef = useRef(null); // Ref for the input field

  // Automatically focus the input field when a new question is generated or after submission
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question]);

  const generateQuestion = () => {
    const num = Math.floor(Math.random() * 40) + 1; // Generate a number between 1 and 40
    setQuestion(`What is ${num}²?`);
    setAnswer(num * num);
    setUserAnswer(""); // Clear the input field for the next question
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
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
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
      <h2>Squares</h2>
      <button onClick={generateQuestion}>Generate Question</button>

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

export default Squares;
