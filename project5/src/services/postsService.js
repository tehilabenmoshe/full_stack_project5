const BASE_URL = "http://localhost:3000"; 

//GET BY ID
export async function getPosts(userId) {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await response.json();
}


//GET COMMENT BY ID
export async function getComments(postId) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return await response.json();
}


//ADD NEW COMMENT
export async function addComment(newComment) {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return await response.json();
}


//DELETE COMMENT
export async function deleteComment(commentId) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
}

//UPDATE COMMENT
export async function updateComment(commentId, updatedComment) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedComment),
  });

  if (!response.ok) {
    throw new Error("Failed to update comment");
  }

  return await response.json();
}
