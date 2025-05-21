import React, { useEffect, useState } from "react";
import { getPosts, deletePost, updatePost} from "../services/postsService";
import PostItem from "../components/PostItem"
import "../style/PostItem.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

   useEffect(() => {
        console.log("USER ID:", userId);
        if (userId) {
            getPosts(userId).then(setPosts).catch((err) => {
            console.error("Failed to load Posts:", err);
            });
        }
    }, [userId]);

    
    const filteredPosts = posts.filter((post) => {
        if (!searchValue) return true;

        const value = searchValue.toLowerCase();
        const idMatch = post.id.toString().includes(value);
        const titleMatch = post.title.toLowerCase().includes(value);

        return idMatch || titleMatch;
    });

    const handleDelete = async (id) => {
        const post = posts.find(t => t.id === id);

        try {
            await deletePost(id);
            setPosts((prevPrev) => prevPrev.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Failed to delete todo", err);
        }
    };

    const handleSave = async (post) => {
        try {
            const saved = await updatePost(post);  // ← שליחה לשרת
            setPosts(prev =>
            prev.map(t => (t.id === post.id ? saved : t))  // עדכון ברשימה
            );
        } catch (err) {
            console.error("Failed to save post", err);
        }
    };



  return (
    <div>
      <h2>Your Posts </h2>

      <input className="search-bar"
            type="text"
            placeholder="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
       />

      <ul>
        {filteredPosts.map((post) => (
          <PostItem 
                key={post.id}
                post={post} 
                user={user}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        ))}
      </ul>
    </div>
  );
}