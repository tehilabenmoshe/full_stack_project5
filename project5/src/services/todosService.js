const BASE_URL = "http://localhost:3000"; // בלי סלאש בסוף

export async function getTodos(userId) {
  const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);
  return await response.json();
}
