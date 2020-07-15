import React from "react";

// Todos Props
export interface TodoProps {
    id: number;
    text: string;
    done: boolean;
}

// TodoItem Props
export interface TodoItemProps {
    todo: TodoProps;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}