import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

function Addition() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [performance, setPerformance] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]); // Options for levels
  const inputRef = useRef(null);

  // Automatically focus the input field when a new question is generated or after submission
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question]);

  const generateQuestion = (level1, level2) => {
    const getRandomNumber = (digits) => {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const num1 = getRandomNumber(level1);
    const num2 = getRandomNumber(level2);
    setQuestion(`${num1} + ${num2}`);
    setAnswer(num1 + num2);
    setUserAnswer(""); // Clear the input field for the next question
  };

  const handleLevelSelect = (level) => {
    if (level === "1-digit") {
      setLevelOptions([]); // No extra options for 1-digit
      generateQuestion(1, 1);
    } else if (level === "2-digit") {
      setLevelOptions([
        { label: "2-digit vs 1-digit", levels: [2, 1] },
        { label: "2-digit vs 2-digit", levels: [2, 2] },
      ]);
    } else if (level === "3-digit") {
      setLevelOptions([
        { label: "3-digit vs 1-digit", levels: [3, 1] },
        { label: "3-digit vs 2-digit", levels: [3, 2] },
        { label: "3-digit vs 3-digit", levels: [3, 3] },
      ]);
    }
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
    setQuestion(""); // Clear the question
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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
      <button onClick={() => handleLevelSelect("1-digit")}>1-Digit</button>
      <button onClick={() => handleLevelSelect("2-digit")}>2-Digit</button>
      <button onClick={() => handleLevelSelect("3-digit")}>3-Digit</button>

      {levelOptions.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p>Select combination:</p>
          {levelOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => generateQuestion(...option.levels)}
              style={{ margin: "5px" }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

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

export default Addition;
