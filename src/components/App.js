import { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import NewQuestionForm from "./NewQuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ✅ GET questions
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  // ✅ ADD (POST)
  function handleAddQuestion(newQuestion) {
    setQuestions((prev) => [...prev, newQuestion]);
    setShowForm(false); // 🔥 important for test
  }

  // ✅ DELETE (wait for server)
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    });
  }

  // ✅ UPDATE (PATCH)
 function handleUpdate(id, newIndex) {
  // update UI immediately
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === id ? { ...q, correctIndex: newIndex } : q
    )
  );

  // then send PATCH request
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex: newIndex }),
  });
}

  return (
    <div>
      {/* ✅ MUST be EXACT text */}
      <button onClick={() => setShowForm(false)}>View Questions</button>
      <button onClick={() => setShowForm(true)}>New Question</button>

      {showForm ? (
        <NewQuestionForm onAdd={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default App;