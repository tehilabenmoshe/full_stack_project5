import React, { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo, addTodo } from "../services/todosService";
import TodoItem from "../components/TodoItem"; 
import "../style/Todo.css";

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [sortBy, setSortBy] = useState("id");
    const [searchValue, setSearchValue] = useState("");

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
        try {
            let savedTodo;

            if (updatedTodo.isNew) {
                const { isNew, id, ...NewTodo } = updatedTodo;
                savedTodo = await addTodo(NewTodo);
                } else {
                  savedTodo = await updateTodo(updatedTodo);
            }

            // עדכון ברשימה עם הפתק החדש
            setTodos((prevTodos) =>
            prevTodos.map((t) => (t.id === updatedTodo.id ? savedTodo : t))
            );
        } catch (err) {
            console.error("Failed to save todo", err);
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


    const filteredTodos = todos.filter((todo) => {
        if (!searchValue) return true;

        const value = searchValue.toLowerCase();
        const idMatch = todo.id.toString().includes(value);
        const titleMatch = todo.title.toLowerCase().includes(value);

        return idMatch || titleMatch;
    });


    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sortBy === "id") return a.id - b.id;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "completed") return a.completed - b.completed;
        return 0;
    });

    const handleAddNew = () => {
        const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;

        const newTodo = {
            id: maxId + 2,
            title: "",
            completed: false,
            isNew: true
        };

        setTodos((prev) => [newTodo, ...prev]);
    };






  return (
    <div className="todo-div">
        <h2>My Task List</h2>

        <button onClick={handleAddNew} className="add-button">
           ➕ Add Task
        </button>

                
        <div className="controls-row">
            <label htmlFor="sort-select">Sort By </label>
            <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="id">Id</option>
                <option value="title">Title</option>
                <option value="completed">Status</option>
            </select>

            <input className="search-bar"
                type="text"
                placeholder="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>

                
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
