'use client';

import { get_songs } from '@/lib/spotify';
import { get_db, get_review_likes, get_user_id, get_list_length, get_reviews, get_lists } from '/utils';
import { useState, useEffect } from 'react';
import {
  AlbumCard,
  CreateListModal,
  ListCard,
  SongReviewCard,
} from "@/components";
import Link from 'next/link';

export default function UserProfilePage({ params }) {
  const { username } = params;
  const user_id = get_user_id(username);
  const db = get_db();

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

  // ============ GETTING DATA FOR REVIEW CARDS ============
  // get data for first 2 reviews
  var reviews = get_reviews(username);
  var review_data = reviews.map((_, i) => ( // add in like count
    {...reviews[i], 
      "like_count": get_review_likes(reviews[i].id)
    }
  ))

  // ============ GETTING DATA FOR LISTS ============
  var lists = get_lists(username);
  var list_data = lists.map((_, i) => ( // add in list length
    {...lists[i],
      "song_count": get_list_length(lists[i].id)
    } 
  ))

  const album_data = [
    {
      album_id: 1,
      album_img: null,
      album_name: "The Rise and Fall of a Midwest Princess",
      year: 2022,
      artist_name: "Chappell Roan",
    },
    {
      album_id: 2,
      album_img: null,
      album_name: "Lucid",
      year: 2020,
      artist_name: "Raveena",
    },
    {
      album_id: 3,
      album_img: null,
      album_name: "Call For Help",
      year: 2020,
      artist_name: "Pearly Drops",
    },
  ]

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

  const album_cards = album_data.map((album, i) =>
    <AlbumCard 
      key={`album-card-${i}`} 
      album_data={album} />
  )

  const list_cards = list_data.map((list, i) => 
    <div key={`list-card-${i}`}>
      <ListCard 
        username={username}
        name={list.name}
        song_count={list.song_count} />
      <hr className="opacity-30"></hr>
    </div >
  )

  return (
    <div className="flex flex-wrap md:flex-nowrap w-full gap-6">
      <div className="flex flex-col grow shrink gap-6 w-2/3">
        <section className="flex flex-col gap-3">
          <Link href="profile/reviews"><h3>Reviews</h3></Link>
          {review_cards}
        </section>
        <section>
          <h3 className="mb-3">Albums</h3>
          <div className="gap-3 grid grid-cols-4">
            {album_cards}
          </div>
        </section>
      </div>
      <section className="flex flex-col grow shrink min-w-52 w-1/3">
        <div className="flex justify-between items-baseline">
          <Link href="profile/lists"><h3>Lists</h3></Link>
          <CreateListModal />
        </div>
        <hr className="opacity-30"></hr>
        {list_cards}
      </section>
    </div>
  );
}