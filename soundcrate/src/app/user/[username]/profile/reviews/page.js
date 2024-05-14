'use client';

import { get_songs } from '@/lib/spotify';
import { 
  get_reviews, 
  get_review_likes 
  } from '/utils';
import {
    SongReviewCard
  } from "@/components";

import { useState, useEffect } from 'react';

export default function ListsPage({ params }) {
  const { username } = params;

  const [ songData, setSongData ] = useState(null);

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

  var reviews = get_reviews(username);
  var review_data = reviews.map((_, i) => ( // add in like count
    {...reviews[i], 
      "like_count": get_review_likes(reviews[i].id)
    }
  ))

  const review_cards = review_data.map((review, i) =>
    <SongReviewCard 
      key={`review-card-${i}`}
      username={username}
      song_id={review.song_id}
      rating={review.rating}
      review_text={review.review_text}
      song_name={songData?.tracks[i]?.name}
      song_artist={songData?.tracks[i]?.artists[0]?.name}
      album_art={songData?.tracks[i]?.album?.images[1]?.url}
      like_count={review.like_count} />
  )
    
  return (
    <main className="flex flex-col gap-4">
      <h2>Reviews</h2>
      <div className="flex flex-col gap-3">
        {review_cards}
      </div>
    </main>
  );
}