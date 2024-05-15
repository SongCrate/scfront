'use client';

import { 
  get_reviews_by_song_id, 
  get_following,
  get_lists_by_song_id,
  get_list_length,
  get_username, 
  get_review_likes 
} from '/utils';
import { get_songs } from '@/lib/spotify';
import { SongReviewCard, ListCard } from '@/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SongPage({ params }) {
  const { song_id } = params;
  const username = 'janedoe'; // mock data, would be grabbing this from header

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
  const reviews = get_reviews_by_song_id(song_id);
  var review_data = reviews.map((_, i) => ( // add in like count
    {...reviews[i], 
      "like_count": get_review_likes(reviews[i].id)
    }
  ))
  review_data.sort((a, b) => a.like_count - b.like_count) // sort by like count

  // ============ GETTING DATA FOR FOLLWOING REVIEW CARDS ============
  const following_ids = get_following(username);
  var following_review_data = review_data.filter((review, i) => {
    return following_ids.includes(review.user_id);
  })

  // ============ GETTING DATA FOR LISTS ============
  var lists = get_lists_by_song_id(song_id);
  var list_data = lists.map((_, i) => ( // add in list length
    {...lists[i],
      "song_count": get_list_length(lists[i].id)
    } 
  ))

  const review_cards = review_data.map((review, i) =>
    <SongReviewCard 
      key={`review-card-${review.song_id}-${review.user_id}`}
      username={get_username(review.user_id)}
      song_id={review.song_id}
      rating={review.rating}
      review_text={review.review_text}
      song_name={songData?.tracks[i]?.name}
      song_artist={songData?.tracks[i]?.artists[0]?.name}
      album_art={songData?.tracks[i]?.album?.images[1]?.url}
      like_count={review.like_count} />
  )

  const following_review_cards = following_review_data.map((review, i) =>
    <SongReviewCard 
      key={`following-review-card-${review.song_id}-${review.user_id}`}
      username={get_username(review.user_id)}
      song_id={review.song_id}
      rating={review.rating}
      review_text={review.review_text}
      song_name={songData?.tracks[i]?.name}
      song_artist={songData?.tracks[i]?.artists[0]?.name}
      album_art={songData?.tracks[i]?.album?.images[1]?.url}
      like_count={review.like_count} />
  )

  const list_cards = list_data.map((list) => 
    <div key={`list-card-${list.id}`}>
      <ListCard 
        username={get_username(list.user_id)}
        name={list.name}
        song_count={list.song_count} 
        show_username={true} />
      <hr className="opacity-30"></hr>
    </div >
  )

  return (
    <div className="flex flex-wrap md:flex-nowrap w-full gap-6">
      <div className="flex flex-col grow shrink gap-6 w-2/3">
        <section className="flex flex-col gap-3">
          <h3>From Your Following</h3>
          {following_review_cards}
        </section>
        <section className="flex flex-col gap-3">
          <h3>Popular Reviews</h3>
          {review_cards}
        </section>
      </div>
      <section className="flex flex-col grow shrink min-w-52 w-1/3">
        <div className="flex justify-between items-baseline">
          <Link href="profile/lists"><h3>Lists</h3></Link>
        </div>
        <hr className="opacity-30"></hr>
        {list_cards}
      </section>
    </div>
  );
}