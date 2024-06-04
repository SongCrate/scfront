import { useState } from 'react';

export default function UpdateUserCredentialsPage({ userData, onSave, onClose }) {
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...userData, email, image_url: photoUrl });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>×</button>
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
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