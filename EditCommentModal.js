import React, { useState } from 'react';
import './EditCommentModal.css';

function EditCommentModal({ comment, onSave, onCancel }) {
  const [editedContent, setEditedContent] = useState(comment.body);

  const handleSave = () => {
    onSave(editedContent);
  };

  return (
    <div className="edit-comment-modal">
      <div className="modal-content">
        <h2>Edit Comment</h2>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default EditCommentModal;
