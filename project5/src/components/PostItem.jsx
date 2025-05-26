import { getComments, addComment, deleteComment, updateComment } from "../services/postsService"; 
import React, { useState } from "react";
import { FaSave, FaTrash, FaEdit  } from "react-icons/fa"; // אייקונים
import { MdEdit } from "react-icons/md"; // סגנון חומר (Material Design)



export default function PostItem({post, user, onSave, onDelete }){
    const [expanded, setExpanded] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [commentTitle, setCommentTitle] = useState("");
    const [commentBody, setCommentBody] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const [editBodyPost, setEditBodyPost] = useState("");
    const [editTitlePost, setEditTitlePost] = useState("");
    const [isEditing, setIsEditing] = useState(false);



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

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments(comments.filter((c) => c.id !== commentId));
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
        };

        const handleStartEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditTitle(comment.name);
        setEditBody(comment.body);
    };

    const handleSaveEdit = async () => {
        const updated = {
            postId: post.id,
            name: editTitle.trim(),
            email: user.email,
            body: editBody.trim(),
        };

        try {
            const saved = await updateComment(editingCommentId, updated);
            setComments(comments.map((c) => (c.id === editingCommentId ? saved : c)));
            setEditingCommentId(null);
            setEditTitle("");
            setEditBody("");
        } catch (error) {
            console.error("Failed to update comment:", error);
        }
    };


    const handleSave = () => {
        const updated = {
            ...post,
            title: editTitlePost,
            body: editBodyPost
        };
        console.log("saving...", updated);
        onSave(updated); 
        setIsEditing(false);
    };


    const handleDelete = () => {
        onDelete(post.id);
    };

    return (
        <li className="post-item">
        <div className="post-container">
            <div className="post-actions">
                <button className="action-button" onClick={handleSave} title="Save"><FaSave /></button>
                <button className="action-button" onClick={handleDelete} title="Delete"><FaTrash /></button>
                <button
                    className="action-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                        setEditTitlePost(post.title);
                        setEditBodyPost(post.body);
                    }}
                    title="Edit"
                    >
                    <MdEdit />

                </button>

            </div>

            <div className="post-title-box">
            {isEditing ? (
                <input
                value={editTitlePost}
                onChange={(e) => setEditTitlePost(e.target.value)}
                style={{ width: "100%", fontSize: "1rem" }}
                />
            ) : (
                <h3>{post.title}</h3>
            )}
            </div>

            <button className="show-more-button" onClick={() => setExpanded((prev) => !prev)}>
                {expanded ? "Hide" : "Show More"}
            </button>

            {expanded && (
            <div className="post-body">
                {isEditing ? (
                <textarea
                    value={editBodyPost}
                    onChange={(e) => setEditBodyPost(e.target.value)}
                    rows={3}
                    style={{ width: "100%", marginBottom: "5px" }}
                />
                ) : (
                <p>{post.body}</p>
                )}

                <button onClick={handleShowComments} className="comments-button">
                {showComments ? "Hide Comments" : "Show Comments"}
                </button>

                {showComments && (
                <>
                    <ul className="comment-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment">
                        {editingCommentId === comment.id ? (
                            <div>
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                style={{ width: "100%", marginBottom: "5px" }}
                            />
                            <textarea
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                                rows={2}
                                style={{ width: "100%", marginBottom: "5px" }}
                            />
                            <button onClick={handleSaveEdit}>שמור</button>
                            <button onClick={() => setEditingCommentId(null)}>ביטול</button>
                            </div>
                        ) : (
                            <>
                            <strong>{comment.name}</strong> ({comment.email})<br />
                            <p>{comment.body}</p>
                            </>
                        )}

                        {comment.email === user.email && editingCommentId !== comment.id && (
                            <div className="comment-actions">
                            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            <button onClick={() => handleStartEdit(comment)}>Edit</button>
                            </div>
                        )}
                        </li>
                    ))}
                    </ul>

                    <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="add-comment-button"
                    >
                    {showAddForm ? "Cancel" : "+ Add Comment"}
                    </button>

                    {showAddForm && (
                    <form onSubmit={handleAddComment} className="add-comment-form">
                        <input
                        type="text"
                        placeholder="כותרת תגובה"
                        value={commentTitle}
                        onChange={(e) => setCommentTitle(e.target.value)}
                        required
                        style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
                        />
                        <textarea
                        placeholder="תוכן תגובה"
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        rows={2}
                        required
                        style={{ width: "100%", padding: "10px", fontSize: "1rem", marginTop: "8px" }}
                        />
                        <button type="submit" style={{ marginTop: "10px" }}>שלח</button>
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