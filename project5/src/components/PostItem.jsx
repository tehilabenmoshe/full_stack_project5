import { getComments } from "../services/postsService"; 

import React, { useState } from "react";

export default function PostItem({post}){
    const [expanded, setExpanded] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

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

    return (
        <li className="post-item" onClick={toggleExpanded}>
        <div className="post-card">
            <strong>ID:</strong> {post.id} <br />
            <strong>Title:</strong> {post.title}

            {expanded && (
            <div className="post-body">
                <strong>Body:</strong>
                <p>{post.body}</p>

                <button onClick={(e) => {
                e.stopPropagation(); // כדי שלא יפעיל גם את toggleExpanded
                handleShowComments();
                }} className="comments-button">
                {showComments ? "הסתר תגובות" : "הצג תגובות"}
                </button>

                {showComments && (
                <ul className="comment-list">
                    {comments.map((comment) => (
                    <li key={comment.id} className="comment">
                        <strong>{comment.name}</strong> ({comment.email})<br />
                        <p>{comment.body}</p>
                    </li>
                    ))}
                </ul>
                )}
            </div>
            )}
        </div>
        </li>
    );



}