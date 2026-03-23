export default function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  return (
    <li>
      <h3>{prompt}</h3>

      <ul>
        {answers.map((ans, i) => (
          <li key={i}>
            {ans} {i === correctIndex ? "✅" : ""}
          </li>
        ))}
      </ul>

      <label>
        Correct Answer
        <select
          value={correctIndex}
          onChange={(e) => onUpdate(id, Number(e.target.value))}
        >
          {answers.map((_, i) => (
            <option key={i} value={i}>{i + 1}</option>
          ))}
        </select>
      </label>

      {/* ✅ Text must match test exactly */}
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}