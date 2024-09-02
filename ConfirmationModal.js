import React from 'react';
import './ConfirmationModal.css'; // Import updated CSS file for full-page styling

const ConfirmationModal = ({ message = "Are you sure you want to delete this Post?", onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmation</h2>
        <p>{message}</p>  
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={onConfirm}>Yes</button>
          <button className="btn-cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
