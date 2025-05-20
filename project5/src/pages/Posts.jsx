import React, { useEffect, useState } from "react";
import { getPosts} from "../services/postsService";
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
          <PostItem key={post.id} post={post} user={user}/>
        ))}
      </ul>
    </div>
  );
}