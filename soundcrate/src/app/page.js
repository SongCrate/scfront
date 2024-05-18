'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { get_random_songs, get_songs } from '../lib/spotify';
import { get_username, get_all_reviews, get_review_likes } from '/utils';
import { AlbumCard, SongReviewCard } from '@/components';
import './home.css';

export default function Home() {
  const [ songData, setSongData ] = useState({});
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ songs, setSongs ] = useState([]);

  const [ username, setUsername ] = useState('')

  useEffect(() => {

    // get username to set logged-in status
    const storedUsername = sessionStorage.getItem('username');
    const storedHomeData = sessionStorage.getItem('home-data');
    if (storedUsername && storedUsername != '') {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      }

    // fetch songs to fill new releases section
    async function fetchSongs() {
      if (!storedHomeData) {
        const randomSongs = await get_random_songs();
        setSongs(randomSongs);
        sessionStorage.setItem('home-data', randomSongs)
      }
    }
    fetchSongs();
  }, []);

  useEffect(() => {
    // get song data from spotify api for review cards
    const get_song_data = async () => {
      if (review_data) {
        const song_ids = review_data.map((obj) => {
          return obj.song_id;
        })

        const response = await get_songs(song_ids);
        setSongData(response);
      }
    };
    
    get_song_data();
  }, [review_data]);

  // ============ GETTING DATA FOR REVIEW CARDS ============
  // get data for all reviews
  var reviews = get_all_reviews();
  var review_data = reviews.map((_, i) => ( // add in like count
    {...reviews[i], 
      "like_count": get_review_likes(reviews[i].id)
    }
  ))

  const render_song_cards = () => {
    return songs?.map((song) =>
      <AlbumCard 
        key={`song-card-${song.id}`}
        album_id={song.id}
        name={song.name}
        artist_name={song.album.artists[0]?.name}
        size={20}
        album_art={song.album.images[1]?.url}
        href={'/song/'+song.id} 
        rating={4} /> // TODO: hardcoded
    );
  }

  const render_review_cards = () => {
    if (songData?.tracks) {
      return review_data
        .sort((a, b) => (a.like_count - b.like_count)) // sort by like count
        .slice(0, 4) // only return the top 5
        .map((review, i) =>
          <SongReviewCard 
            key={`review-card-${review.song_id}-${get_username(review.user_id)}-${i}`}
            username={get_username(review.user_id)}
            song_id={review.song_id}
            rating={review.rating}
            review_text={review.review_text}
            song_name={songData?.tracks[i]?.name}
            song_artist={songData?.tracks[i]?.artists[0]?.name}
            album_art={songData?.tracks[i]?.album?.images[1]?.url}
            like_count={review.like_count} />
        )
    }
  };


  return (
    <main className="main-container">

      {/* hero */}
      <section className="intro">
        <p id="welcome-message">{isLoggedIn ? `Hi, ${username}!` : "SoundCrate"}</p>
        {!isLoggedIn && <p id="intro-text">Rate and review music today!</p>}
        {!isLoggedIn && (
          <span>
            <Link href="/register">
              <button className="btn">Get Started</button>
            </Link>
            <Link href="/login">
              <button className="btn">Login</button>
            </Link>
          </span>
        )}
      </section>
      
      {/* new releases */}
      <section className="flex flex-col gap-3 mb-6 w-full">
        <h2>New Releases</h2>
        <div className="columns-5">
          {render_song_cards()}
        </div>
      </section>

      {/* popular reviews */}
      <section className="flex flex-col gap-3 mb-6 w-full">
        <h2>Popular Reviews</h2>
        <div className="flex flex-col gap-2">
          {render_review_cards()}
        </div>
      </section>

    </main>
  );
}
