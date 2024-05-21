'use client';

import {
  get_reviews_by_song_id,
  get_following,
  get_lists_by_song_id,
  get_list_length,
  get_username,
  get_review_likes
} from '/utils';
import { get_song } from '@/lib/spotify';
import { SongReviewCard,
  ListCard,
  Rating,
  WriteReviewModal
} from '@/components';
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
        const response = await get_song(song_id);
        setSongData(response);
      }
    };

    get_song_data();
  }, []);

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

  // package songData for easy use
  const song_data = {
    name: songData?.name,
    artist: songData?.artists[0]?.name,
    album: songData?.album?.name,
    album_art: songData?.album?.images[0]?.url,
    album_id: songData?.album?.id,
    year: songData?.album?.release_date.slice(0, 4),
    average_rating: review_data.reduce((total, next) => total + next.rating, 0) / review_data.length
  }

  const render_header = () => {
    return (
        <section className="flex flex-row gap-6 items-end">
          {/* album art */}
          <img
              src={song_data.album_art ?? "/images/default-user.png"}
              alt={`${songData?.name} by ${song_data.artist}`}
              className="rounded-md w-[120px] h-[120px]"
              onError={e => {
                e.currentTarget.src = "/images/default-user.png"
              }}
          />
          {/* song details */}
          <div className="flex flex-col pb-1">
            <p className="uppercase opacity-50 text-xs mb-0.5">Song</p>
            <h1>{song_data.name}</h1>
            <p className="text-med opacity-70 mb-1.5">
              <span>{song_data.artist}</span>
              <span className="mx-2">∙</span>
              <Link href={`/album/${song_data.album_id}`}>
                <span className="hover:underline underline-offset-4 decoration-accent">{song_data.album} ({song_data.year})</span>
              </Link>
            </p>
            <span>
            <Rating rating={song_data.average_rating}/>
          </span>
          </div>
        </section>
    )
  }

  const review_cards = review_data.map((review, i) =>
      <SongReviewCard
          key={`review-card-${review.song_id}-${review.user_id}-${i}`}
          username={get_username(review.user_id)}
          review_id={review.id}
          song_id={song_id}
          rating={review.rating}
          review_text={review.review_text}
          song_name={song_data.name}
          song_artist={song_data.artist}
          album_art={song_data.album_art}
          like_count={review.like_count}
          detail_type={'user'} />
  )

  const following_review_cards = following_review_data.map((review, i) =>
      <SongReviewCard
          key={`following-review-card-${review.song_id}-${review.user_id}-${i}`}
          username={get_username(review.user_id)}
          review_id={review.id}
          song_id={song_id}
          rating={review.rating}
          review_text={review.review_text}
          song_name={song_data.name}
          song_artist={song_data.artist}
          album_art={song_data.album_art}
          like_count={review.like_count}
          detail_type={'user'} />
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
          {render_header()}
          <section className="flex flex-col gap-3">
            <h3>From Your Following</h3>
            {following_review_cards}
          </section>
          <section className="flex flex-col gap-3">
            <h3>Popular Reviews</h3>
            {review_cards}
          </section>
        </div>
        <div className="flex flex-col grow shrink min-w-52 w-1/3 gap-6">
          <WriteReviewModal
              key={`writereview-modal-${song_data.song_id}`}
              song_id={song_id}
              album_id={song_data.album_id}
              song_name={song_data.name}
              artist={song_data.artist}
              album_name={song_data.album}
              album_art={song_data.album_art}
              year={song_data.year}
          />
          <section className="flex flex-col gap-3">
            <h3>Lists</h3>
            <div>
              <hr className="opacity-30"></hr>
              {list_cards}
            </div>
          </section>
        </div>
      </div>
  );
}