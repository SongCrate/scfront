'use client';

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getUser?username=janedoe');
      const data = await response.json();
      setUserData(data);
      setUsername(data.username);
      setPhotoUrl(data.image_url);
    };

    fetchData();
  }, []);

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
  };

  return (
    <div>
      {userData && (
        <>
          <div className="profile-header">
            <img src={userData.image_url} alt="Profile" />
            <h1>{userData.username}</h1>
            <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
          </div>

          <div className="profile-content">
            <div>
              <h2>Songs</h2>
              <p>{userData.songs.length}</p>
            </div>
            <div>
              <h2>Albums</h2>
              <p>{userData.albums.length}</p>
            </div>
          </div>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <button className="close" onClick={() => setIsModalOpen(false)}>×</button>
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
          )}
        </>
      )}
    </div>
  );
}

