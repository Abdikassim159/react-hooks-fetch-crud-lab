import { useState } from "react";

export default function NewQuestionForm({ onAdd }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = { prompt, answers, correctIndex };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        onAdd(data); // 🔥 ONLY THIS
      });
  }

  function handleAnswerChange(value, index) {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>

      {answers.map((ans, i) => (
        <label key={i}>
          Answer {i + 1}
          <input
            value={ans}
            onChange={(e) => handleAnswerChange(e.target.value, i)}
          />
        </label>
      ))}

      <label>
        Correct Answer
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(Number(e.target.value))}
        >
          {answers.map((_, i) => (
            <option key={i} value={i}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add Question</button>
    </form>
  );
}