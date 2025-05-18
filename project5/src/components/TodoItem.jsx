import React, { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa"; // אייקונים
import { updateTodo, deleteTodo } from "../services/todosService";
import "../style/TodoItem.css";

export default function TodoItem({ todo, onSave, onDelete}) {
    const [isEditing, setIsEditing] = useState(todo.isNew || false);
    const [editedTitle, setEditedTitle] = useState(todo.title);


    
    const handleSave = () => {
        const updated = {
            ...todo,
            title: editedTitle,
            isNew: false,
        };
        console.log("saving...", updated);
        onSave(updated); // ← חייב להיות מוגדר כ־prop מההורה
        setIsEditing(false);
    };


    const handleDelete = () => {
        onDelete(todo.id);
    };
        
    return (
      <li className="todo-note">
        <input
            type="checkbox"
            checked={todo.completed}
            readOnly
            className="todo-checkbox"
        />

        {isEditing ? (
            <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="todo-input"
                onBlur={() => setIsEditing(false)} // סיום עריכה כשיוצאים מהשדה
                autoFocus
            />
        ) : (
            <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
                onClick={() => setIsEditing(true)}
            >
                <span className="todo-id">TODO #{todo.id}</span>
                <span className="todo-title">{editedTitle}</span>

            </span>
        )}
        <div className="todo-actions">
            <button onClick={handleSave} className="todo-icon" title="Save">
                <FaSave />
            </button>
            <button onClick={handleDelete} className="todo-icon" title="Delete">
                <FaTrash />
            </button>
        </div>

    </li>    
  );
}
