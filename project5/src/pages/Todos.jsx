import React, { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo } from "../services/todosService";
import TodoItem from "../components/TodoItem"; 
import "../style/Todo.css";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState("id");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;


    useEffect(() => {
        if (userId) {
        getTodos(userId).then(setTodos).catch((err) => {
            console.error("Failed to load todos:", err);
        });
        }
    }, [userId]);


  const handleSave = async (updatedTodo) => {
    console.log("got todo in Todos:", updatedTodo);
    try {
        await updateTodo(updatedTodo);
        setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
        } catch (err) {
            console.error("Failed to update todo", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Failed to delete todo", err);
        }
    };

  

    const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "id") {
        return a.id - b.id;
    } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
    } else if (sortBy === "completed") {
        return a.completed - b.completed; // false לפני true
    }
    return 0;
    });



  

  return (
    <div className="todo-div">
      <h2>My Task List</h2>

      <label htmlFor="sort-select">Sort By </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        >
        <option value="id"> Id</option>
        <option value="title">header</option>
        <option value="completed">status </option>
      </select>

      <ul className="todo-list-grid">
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onSave={handleSave}
            onDelete={handleDelete}
          />

        ))}
      </ul>
    </div>
  );
}
