import { Chart, CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

Chart.register(LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend);

function Addition() {
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [performance, setPerformance] = useState([]);

  // Function to generate a set of questions based on the difficulty level and count
  const generateQuestionSet = (count) => {
    const generatedQuestions = [];
    for (let i = 0; i < count; i++) {
      let num1, num2;

      if (difficulty === "1-digit") {
        num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
        num2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
      } else if (difficulty === "2-digit") {
        num1 = Math.floor(Math.random() * 90) + 10; // 10 to 99
        num2 = Math.floor(Math.random() * 90) + 10; // 10 to 99
      } else if (difficulty === "3-digit") {
        num1 = Math.floor(Math.random() * 900) + 100; // 100 to 999
        num2 = Math.floor(Math.random() * 90) + 10; // 10 to 99
      }

      generatedQuestions.push({ num1, num2 });
    }
    setQuestions(generatedQuestions);
    setQuestionCount(count);
    setCurrentQuestion(0);
    setPerformance([]);
  };

  const handleAnswerSubmission = () => {
    const { num1, num2 } = questions[currentQuestion];
    const correctAnswer = num1 + num2;
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    const timestamp = new Date().toLocaleTimeString();

    setPerformance((prevPerformance) => [
      ...prevPerformance,
      {
        question: `${num1} + ${num2}`,
        userAnswer,
        correct: isCorrect,
        timestamp,
      },
    ]);

    setUserAnswer("");
    setCurrentQuestion((prev) => prev + 1);
  };

  const startNewSet = (count) => {
    if (difficulty) {
      generateQuestionSet(count);
    } else {
      alert("Please select a difficulty level first.");
    }
  };

  // Generate the performance chart data
  const chartData = {
    labels: performance.map((entry) => entry.timestamp),
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
      <button onClick={() => setDifficulty("1-digit")}>1-Digit</button>
      <button onClick={() => setDifficulty("2-digit")}>2-Digit</button>
      <button onClick={() => setDifficulty("3-digit")}>3-Digit</button>

      <p>Select the number of questions:</p>
      <button onClick={() => startNewSet(20)}>20 Questions</button>
      <button onClick={() => startNewSet(40)}>40 Questions</button>
      <button onClick={() => startNewSet(60)}>60 Questions</button>

      {questions.length > 0 && currentQuestion < questionCount && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Question: {questions[currentQuestion].num1} + {questions[currentQuestion].num2}
          </h3>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button onClick={handleAnswerSubmission}>Submit</button>
        </div>
      )}

      {currentQuestion === questionCount && performance.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3>Performance Chart for {questionCount} Questions</h3>
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
