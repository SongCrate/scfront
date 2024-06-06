'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { get_new_releases, get_songs } from '../lib/spotify';
import { AlbumCard, SongReviewCard } from '@/components';
import './home.css';
import {useSession} from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [ newReleases, setNewReleases ] = useState(null);
  const [ reviews, setReviews ] = useState([]);
  const [ songData, setSongData ] = useState(null);


  // fetch song data from spotify api for explore section
  useEffect(() => {
    async function fetchNewReleases() {
      const new_releases = await get_new_releases();
      setNewReleases(new_releases?.items);
    }
    
    fetchNewReleases();
  }, []);

  // fetch top 5 reviews for popular releases section
  useEffect(() => {
    async function fetchPopularReviews() {
      try {
        const response = await fetch(`/api/review/getReviews?sortBy=likes&limit=5`, {
          method: 'GET',
        });
    
        const responseData = await response.json();
        if (responseData?.body) {
          setReviews(responseData.body);
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchPopularReviews();
  }, []);

  // get song data from spotify api for review cards
  useEffect(() => {
    const get_song_data = async () => {
      if (reviews) {
        const song_ids = reviews.map((review) => {
          return review.songId;
        })

        if (song_ids.length) {
          const response = await get_songs(song_ids);
          setSongData(response?.tracks);
        }
      }
    };
    
    get_song_data();
  }, [reviews]);

  const render_new_release_cards = () => {
    return newReleases && newReleases.map((album) =>
      <AlbumCard 
        key={`album-card-${album.id}`}
        album_id={album.id}
        name={album.name}
        artist_name={album.artists[0]?.name}
        size={20}
        album_art={album.images[0]?.url}
        href={'/album/'+album.id} />
    );
  }

  const render_review_cards = () => {
    return (reviews && reviews.map((review) => {
      const song_obj = songData?.find((song) => song.id === review.songId);
      return (
        <SongReviewCard
          key={`review-card-${review._id}`}
          username={review.user.username}
          review_id={review._id}
          song_id={review.songId}
          rating={review.rating}
          review_text={review.text}
          song_name={song_obj?.name}
          song_artist={song_obj?.artists[0]?.name}
          image={song_obj?.album?.images[1]?.url}
          detail_type={'album'}
          likes={review.likes}
        />
      )}
    ))
  }


  return (
    <main className="main-container">

      {/* hero */}
      <section className="intro">
        <p id="welcome-message">{session?.status==="authenticated" ? `Hi, ${session?.user?.username}!` : "SoundCrate"}</p>
        {session?.status==="unauthenticated" && <p id="intro-text">Rate and review music today!</p>}
        {session?.status==="unauthenticated" && (
          <span>
            <Link href="/register">
              <button className="register-btn">Get Started</button>
            </Link>
            <Link href="/login">
              <button className="login-btn">Login</button>
            </Link>
          </span>
        )}
      </section>
      
      {/* new releases */}
      <section className="flex flex-col gap-3 mb-6 w-full">
        <h2>New Releases</h2>
        <div className="columns-5">
          {render_new_release_cards()}
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
