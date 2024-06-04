// UpdateUserDataModal.js

import { useState } from 'react';

export default function UpdateUserDataModal({ userData, onClose }) {
  const [username, setUsername] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, image_url: photoUrl }),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUserData({ ...userData, username, image_url: photoUrl });
        setIsModalOpen(false);
      } else {
        console.error('Failed to update user');
      }

    onClose(); // Close the modal after saving
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>×</button>
        <h2>Update Profile</h2>
        <form onSubmit={handleSave}>
          <div>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Photo URL (Optional)</label>
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
