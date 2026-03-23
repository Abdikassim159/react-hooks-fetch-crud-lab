import QuestionItem from "./QuestionItem";

export default function QuestionList({ questions, onDelete, onUpdate }) {
  return (
    <ul>
      {questions.map((q) => (
        <QuestionItem
          key={q.id}
          question={q}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}