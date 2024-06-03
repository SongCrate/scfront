'use client';

import { get_songs } from '@/lib/spotify';
import { SongReviewCard } from '@/components';
import { useState, useEffect } from 'react';

export default function ListsPage({ params }) {
  const { username } = params;

  const [ songData, setSongData ] = useState([]);
  const [ reviews, setReviews ] = useState([]);

  useEffect(() => {
    // get song data from spotify api for review cards
    const get_song_data = async () => {
      if (reviews) {
        const song_ids = reviews.map((review) => {
          return review.songId;
        })

        const response = await get_songs(song_ids);
        setSongData(response?.tracks);
      }
    };
    
    get_song_data();
  }, [reviews]);

  // fetch all reviews for this songId
  useEffect(() => {
    async function fetchReviewsByUsername(username) {
      try {
        const response = await fetch(
          `/api/review/getReviews?username=${username}&sortBy=date`, 
          { method: 'GET' }
        );
    
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
    
    fetchReviewsByUsername(username);
  }, []);

  const render_review_cards = (review_array) => {
    return (review_array && review_array.map((review) => {
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
        />
      )}
    ))
  }
    
  return (
    <main className="flex flex-col gap-4">
      <h2>Reviews</h2>
      <div className="flex flex-col gap-3">
        {render_review_cards(reviews)}
      </div>
    </main>
  );
}