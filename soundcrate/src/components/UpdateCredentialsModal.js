'use client';
import { useState } from 'react';

export default function UpdateCredentialsModal({ userData, onSave, onClose }) {
  const [password, setPassword] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();

    onClose(); // Close the modal after saving
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>×</button>
        <h2>Update Profile</h2>
        <form onSubmit={handleSave}>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}