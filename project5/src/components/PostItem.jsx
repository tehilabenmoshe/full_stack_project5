import { getComments, addComment } from "../services/postsService"; 
import React, { useState } from "react";

export default function PostItem({post, user}){
    const [expanded, setExpanded] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [commentTitle, setCommentTitle] = useState("");
    const [commentBody, setCommentBody] = useState("");



    const toggleExpanded = () => setExpanded(!expanded);

    const handleShowComments = async () => {
        if (!showComments) {
        try {
            const fetchedComments = await getComments(post.id);
            setComments(fetchedComments);
        } catch (error) {
            console.error("Failed to load comments:", error);
        }
        }
        setShowComments(!showComments);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!commentTitle.trim() || !commentBody.trim() || !user) return;

        const newComment = {
            postId: post.id,
            userId: user.id,
            name: commentTitle.trim(), 
            email: user.email,
            body: commentBody.trim(), 
        };

        try {
            const saved = await addComment(newComment);
            setComments([...comments, saved]);
            setCommentTitle("");
            setCommentBody("");
            setShowAddForm(false);
        } catch (err) {
            console.error("Failed to add comment:", err);
        }
    };

    return (
        <li className="post-item" onClick={toggleExpanded}>
            <div className="post-card">
                <strong>ID:</strong> {post.id} <br />
                <strong>Title:</strong> {post.title}

                {expanded && (
                <div className="post-body" onClick={(e) => e.stopPropagation()}>
                    <strong>Body:</strong>
                    <p>{post.body}</p>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShowComments();
                        }}
                        className="comments-button"
                        >
                        {showComments ? "Hide Comments" : "Show Comments"}
                    </button>

                    {showComments && (
                    <>
                        <ul className="comment-list">
                            {comments.map((comment) => (
                                <li key={comment.id} className="comment">
                                    <strong>{comment.name}</strong> ({comment.email})<br />
                                    <p>{comment.body}</p>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAddForm(!showAddForm);
                            }}
                            >
                            {showAddForm ? "ביטול" : "➕ הוסף תגובה"}
                        </button>

                        {showAddForm && (
                            <form onSubmit={handleAddComment}>
                                <input
                                    type="text"
                                    placeholder="כותרת תגובה"
                                    value={commentTitle}
                                    onChange={(e) => setCommentTitle(e.target.value)}
                                    required
                                    style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
                                />
                                <br />
                                <textarea
                                    placeholder="תוכן תגובה"
                                    value={commentBody}
                                    onChange={(e) => setCommentBody(e.target.value)}
                                    rows={2}
                                    required
                                    style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
                                />
                                <br />
                                <button type="submit">שלח</button>
                            </form>
                        )}

                    </>
                    )}
                </div>
                )}
            </div>
        </li>
    );



}