import React from "react";

interface TodoProps {
  id: number;
  text: string;
  done: boolean;
}
interface TodoItemProps {
  todo: TodoProps;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

interface WeekProps {
  week: string;
}

const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => {
  return (
    <div>
      <input
        type="checkbox"
        onClick={() => onToggle(todo.id)}
        checked={todo.done}
        readOnly={true}
      />
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </div>
  );
};
