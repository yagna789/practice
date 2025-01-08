import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

function Division() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [performance, setPerformance] = useState([]);
  const [difficulty, setDifficulty] = useState(null); // Track selected difficulty
  const inputRef = useRef(null); // Ref for the input field

  // Automatically focus the input field when a new question is generated or after submission
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question]);

  // Function to generate a random question based on level and division scenario
  const generateQuestion = (level1, level2) => {
    let num1, num2;

    // 1-digit level vs 1-digit level
    if (level1 === "1-digit" && level2 === "1-digit") {
      num2 = Math.floor(Math.random() * 8) + 2; // num2 between 2 and 9
      num1 = num2 * (Math.floor(Math.random() * 8) + 2); // num1 is a multiple of num2, num1 is also between 4 and 72
    } 

    // 2-digit level vs 1-digit level
    else if (level1 === "2-digit" && level2 === "1-digit") {
      num2 = Math.floor(Math.random() * 8) + 2; // num2 between 2 and 9
      num1 = num2 * (Math.floor(Math.random() * 89) + 11); // num1 is a multiple of num2, num1 is between 22 and 891
    }

    // 2-digit level vs 2-digit level
    else if (level1 === "2-digit" && level2 === "2-digit") {
      num2 = Math.floor(Math.random() * 89) + 11; // num2 between 11 and 99
      num1 = num2 * (Math.floor(Math.random() * 9) + 2); // num1 is a multiple of num2, num1 is between 22 and 891
    }

    // 3-digit level vs 1-digit level
    else if (level1 === "3-digit" && level2 === "1-digit") {
      num2 = Math.floor(Math.random() * 8) + 2; // num2 between 2 and 9
      num1 = num2 * (Math.floor(Math.random() * 899) + 101); // num1 is a multiple of num2, num1 is between 202 and 8991
    }

    // 3-digit level vs 2-digit level
    else if (level1 === "3-digit" && level2 === "2-digit") {
      num2 = Math.floor(Math.random() * 89) + 11; // num2 between 11 and 99
      num1 = num2 * (Math.floor(Math.random() * 9) + 2); // num1 is a multiple of num2, num1 is between 22 and 891
    }

    // 3-digit level vs 3-digit level
    else if (level1 === "3-digit" && level2 === "3-digit") {
      num2 = Math.floor(Math.random() * 899) + 101; // num2 between 101 and 999
      num1 = num2 * (Math.floor(Math.random() * 9) + 2); // num1 is a multiple of num2, num1 is between 202 and 8991
    }

    setQuestion(`${num1} ÷ ${num2}`);
    setAnswer(num1 / num2); // The result will always be an integer
  };

  const handleSubmit = () => {
    if (userAnswer.trim() === "") return; // Prevent submission if the input is empty
    const isCorrect = parseFloat(userAnswer) === answer;
    const timestamp = new Date().toLocaleTimeString();
    setPerformance((prevPerformance) => [
      ...prevPerformance,
      { question, userAnswer, correct: isCorrect, timestamp },
    ]);
    setUserAnswer(""); // Clear the input field after submission
    generateQuestion(difficulty.level1, difficulty.level2); // Generate a new question based on selected difficulty
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

      {/* Display difficulty options */}
      <button onClick={() => setDifficulty({ level1: "1-digit", level2: "1-digit" })}>1-Digit vs 1-Digit</button>
      
      <button onClick={() => setDifficulty({ level1: "2-digit", level2: "1-digit" })}>2-Digit vs 1-Digit</button>
      <button onClick={() => setDifficulty({ level1: "2-digit", level2: "2-digit" })}>2-Digit vs 2-Digit</button>

      <button onClick={() => setDifficulty({ level1: "3-digit", level2: "1-digit" })}>3-Digit vs 1-Digit</button>
      <button onClick={() => setDifficulty({ level1: "3-digit", level2: "2-digit" })}>3-Digit vs 2-Digit</button>
      <button onClick={() => setDifficulty({ level1: "3-digit", level2: "3-digit" })}>3-Digit vs 3-Digit</button>

      {/* If a difficulty is selected, generate a question */}
      {difficulty && (
        <div style={{ marginTop: "20px" }}>
          <h3>Select your difficulty and start practicing!</h3>
          <button onClick={() => generateQuestion(difficulty.level1, difficulty.level2)}>
            Generate Question
          </button>
        </div>
      )}

      {/* Display question and input field */}
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

      {/* Display performance chart and table */}
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
