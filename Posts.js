import React, { useState, useEffect } from 'react';
import './Posts.css';
import ConfirmationModal from './ConfirmationModal';
import EditCommentModal from './EditCommentModal'; // Import the new modal component

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState({ title: '', body: '' });
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState({});
  const [editComment, setEditComment] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (showModal || editingPost || editComment) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal, editingPost, editComment]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const data = await response.json();
      setComments(prevComments => ({ ...prevComments, [postId]: data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      alert('Title and Content cannot be empty.');
      return;
    }
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data, ...posts]);
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setEditContent({ title: post.title, body: post.body });
  };

  const handleSaveEdit = async () => {
    if (!editContent.title.trim() || !editContent.body.trim()) {
      alert('Title and Content cannot be empty.');
      return;
    }
    try {
      await fetch(`${apiEndpoint}/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editContent),
      });
      setPosts(posts.map(post =>
        post.id === editingPost.id ? { ...post, ...editContent } : post
      ));
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const confirmDeletePost = (post) => {
    setPostToDelete(post);
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    if (postToDelete) {
      try {
        await fetch(`${apiEndpoint}/${postToDelete.id}`, {
          method: 'DELETE',
        });
        setPosts(posts.filter(post => post.id !== postToDelete.id));
        setPostToDelete(null);
        setShowModal(false);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('Comment cannot be empty.');
      return;
    }
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: newComment, email: 'osafimran@gmail.com', name: 'Osaf' }), // Sample user info
      });
      const newCommentData = await response.json();
      setNewComment('');
      setComments(prevComments => ({
        ...prevComments,
        [selectedPostId]: [...(prevComments[selectedPostId] || []), newCommentData]
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
    fetchComments(postId);
    toggleCommentsVisibility(postId); // Use the toggleCommentsVisibility function
  };

  const toggleCommentsVisibility = (postId) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleEditComment = (postId, comment) => {
    setEditComment({ postId, comment });
  };

  const handleSaveCommentEdit = async (newContent) => {
    if (!newContent.trim()) {
      alert('Comment cannot be empty.');
      return;
    }
    try {
      // Here we would send the updated comment content to the server
      setComments(prevComments => ({
        ...prevComments,
        [editComment.postId]: prevComments[editComment.postId].map(comment =>
          comment.id === editComment.comment.id ? { ...comment, body: newContent } : comment
        )
      }));
      setEditComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = (postId, commentId) => {
    setComments(prevComments => ({
      ...prevComments,
      [postId]: prevComments[postId].filter(comment => comment.id !== commentId)
    }));
  };

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      <div className="post-form">
        <h2>Create New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button onClick={handleCreatePost}>Create</button>
      </div>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => handleEditPost(post)}>Edit</button>
            <button onClick={() => confirmDeletePost(post)}>Delete</button>
            <button onClick={() => handleSelectPost(post.id)}>
              {showComments[post.id] ? 'Hide Comments' : 'View Comments'}
            </button>
            {selectedPostId === post.id && showComments[post.id] && (
              <div className="comments-section">
                <h3>Comments</h3>
                <textarea
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Add Comment</button>
                <div className="comments-list">
                  {comments[post.id] && comments[post.id].map(comment => (
                    <div key={comment.id} className="comment-item">
                      <p><strong>{comment.name}</strong>: {comment.body}</p>
                      <button onClick={() => handleEditComment(post.id, comment)}>Edit</button>
                      <button onClick={() => handleDeleteComment(post.id, comment.id)}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {editingPost && (
        <div className="edit-form">
          <h2>Edit Post</h2>
          <input
            type="text"
            value={editContent.title}
            onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
          />
          <textarea
            value={editContent.body}
            onChange={(e) => setEditContent({ ...editContent, body: e.target.value })}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingPost(null)}>Cancel</button>
        </div>
      )}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this post?"
          onConfirm={handleDeletePost}
          onCancel={() => setShowModal(false)}
        />
      )}
      {editComment && (
        <EditCommentModal
          comment={editComment.comment}
          onSave={handleSaveCommentEdit}
          onCancel={() => setEditComment(null)}
        />
      )}
    </div>
  );
}
