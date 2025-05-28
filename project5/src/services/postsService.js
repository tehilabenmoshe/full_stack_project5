const BASE_URL = "http://localhost:3000"; 


//------------------------------------------------POSTS---------------------------------------------

//GET POST BY ID
export async function getPosts(userId) {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await response.json();
}

//GET ALL POSTS
export async function getAllPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to load all posts");
  return await res.json();
}

// DELETE POST
export async function deletePost(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
}

//ADD POST 
export async function addPost(post) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return await response.json();
}



// UPDATE POST
export async function updatePost(post) {
  const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return await response.json();
}


//-----------------------------------------------COMMENTS-------------------------------------------------

//GET COMMENT BY ID
export async function getComments(postId) {
  console.log(postId);
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
    method: "PATCH",
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
