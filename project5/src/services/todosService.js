const BASE_URL = "http://localhost:3000"; // בלי סלאש בסוף

export async function getTodos(userId) {
  const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);
  return await response.json();
}
// עדכון פריט (PUT)
export async function updateTodo(todo) {
  const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: "PUT",
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