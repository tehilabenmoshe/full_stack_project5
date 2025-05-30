const BASE_URL = "http://localhost:3000"; // בלי סלאש בסוף

export async function getTodos(userId) {
  const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);
  return await response.json();
}

// עדכון פריט (PUT)
export async function updateTodo(todo) {
  const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return await response.json();
}

// מחיקת פריט (DELETE)
export async function deleteTodo(id) {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return true;
}

//POST - new todo
export async function addTodo(todo) {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return await response.json();
}

//GET ALL
export async function getAllTodos() {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) throw new Error("Failed to load all todos");
  return await res.json();
}
