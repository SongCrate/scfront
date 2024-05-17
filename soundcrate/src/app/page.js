"use client"
import React, { useEffect, useState } from 'react';
import { get_random_songs } from '../lib/spotify';
import './home.css';
import {AlbumCard} from "@/components";
import { get_albums } from '/utils';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [songs, setSongs] = useState([]);
  const album_data = get_albums();

  useEffect(() => {
    const userLoggedIn = false;
    setIsLoggedIn(userLoggedIn);

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
                <a id="register-link" className="register-link" href="/register">Get Started</a>
                <a id="login-link" className="login-link" href="/login">Login</a>
              </span>
            )}
          </div>

          <div className="new-releases">
            <h3>New Releases</h3>
            <span className="new-releases-song">
              {album_data.map((album, i) => <AlbumCard
                  key={i}
                  name={album.album_name}
                  artist_name={album.artist_name}
                  size={200}
                  album_id={album.album_id}
                  album_art={album.album_art}
              />)}

              {/*{songs.map((song) => (*/}
              {/*    <AlbumCard*/}
              {/*        album_id={song.album.id}*/}
              {/*        name={song.name}*/}
              {/*        artist_name={song.artists[0].name}*/}
              {/*        album_art={song.album.images[0].url}*/}
              {/*        size={20}*/}
              {/*    />*/}
              {/*))}*/}
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
