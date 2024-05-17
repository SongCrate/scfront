"use client"
import React, { useEffect, useState } from 'react';
import { get_random_songs } from '../lib/spotify'; // Adjust the import path based on your directory structure
import './home.css';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Simulate fetching user authentication status
    const userLoggedIn = false; // Change this to true to simulate a logged-in user
    setIsLoggedIn(userLoggedIn);

    // Fetch random songs for the new releases section
    async function fetchSongs() {
      const randomSongs = await get_random_songs();
      setSongs(randomSongs);
    }
    fetchSongs();
  }, []);

  return (
      <main className="main-container">
        <section>
          <div className="intro">
            <p id="welcome-message">{isLoggedIn ? "Hi, janedoe!" : "SoundCrate"}</p>
            {!isLoggedIn && <p id="intro-text">Rate and review music today!</p>}
            {!isLoggedIn && (
              <span>
                <button id="register-link" className="auth-link" href="register.html">Get Started</button>
                <button id="login-link" className="auth-link" href="login.html">Login</button>
              </span>
            )}
          </div>

          <div className="new-releases">
            <h3>New Releases</h3>
            <span className="new-releases-song">
              {songs.map((song) => (
                <div className="song1" key={song.id}>
                  <img src={song.album.images[0].url} alt={song.name} />
                  <div>★★★★ 4.1</div>
                  <h4>
                    <div>{song.name}</div>
                    <div className="artist-label">{song.artists[0].name}</div>
                  </h4>
                </div>
              ))}
            </span>
          </div>

          <div className="reviews">
            <section id="reviews-section">
              <h3>Popular Reviews</h3>
              <div id="reviews-contents">
                <div className="review-card container-box">
                  <div className="review-body">
                    <img src="../public/images/default-user.png" alt="Petal by Raveena" />
                    <div className="review-details">
                      <h4>
                        <span>Petal  </span>
                        <span className="artist-label">Raveena</span>
                      </h4>
                      ★★★★★
                      <p>best song from the album imo!</p>
                    </div>
                  </div>
                  <div className="review-likes">
                    <div>♥</div>
                    <p>1.2k</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
  );
}
