'use client';

import {
  get_lists_by_song_id,
  get_list_length,
  get_username,
} from '/utils';
import { get_song } from '@/lib/spotify';
import {
  ListCard,
  Rating,
  LikeButton,
  SongReviewCard
} from '@/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SongReviewPage({ params }) {
  const { username, song_id } = params;

  const [ songData, setSongData ] = useState(null);
  const [ reviews, setReviews ] = useState([]);

  const latest_review = reviews[0];
  const older_reviews = reviews.slice(1);

  // get song data from spotify api
  useEffect(() => {
    const get_song_data = async () => {
      const response = await get_song(song_id);
      setSongData(response);
    };

    get_song_data();
  }, []);

  // fetch all reviews for this songId
  useEffect(() => {
    async function fetchReviews(song_id, username) {
      try {
        const response = await fetch(
          `/api/review/getReviews?songId=${song_id}&username=${username}&sortBy=date`, 
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
    
    fetchReviews(song_id, username);
  }, []);

  // ============ GETTING DATA FOR LISTS ============
  var lists = get_lists_by_song_id(song_id);
  var list_data = lists.map((_, i) => ( // add in list length
      {...lists[i],
        "song_count": get_list_length(lists[i].id)
      }
  ))

  // package songData for easy use
  const song_data = {
    song_id: songData?.id,
    name: songData?.name,
    artist: songData?.artists[0]?.name,
    album: songData?.album?.name,
    album_art: songData?.album?.images[0]?.url,
    album_id: songData?.album?.id,
    year: songData?.album?.release_date.slice(0, 4),
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
          <p className="uppercase opacity-50 text-xs mb-0.5">By {username}</p>
          <Link href={`/song/${song_data.song_id}`}>
            <h1 className="hover:underline underline-offset-4 decoration-accent">{song_data.name}</h1>
          </Link>
          <p className="text-med opacity-70 mb-1.5">
            <span>{song_data.artist}</span>
            <span className="mx-2">∙</span>
            <Link href={`/album/${song_data.album_id}`}>
              <span className="hover:underline underline-offset-4 decoration-accent">{song_data.album} ({song_data.year})</span>
            </Link>
          </p>
          <span>
          <Rating rating={latest_review?.rating}/>
        </span>
        </div>
      </section>
    )
  }

  const render_review_cards = (review_array) => {
    return (review_array && review_array.map((review) =>
      <SongReviewCard
        key={`review-card-${review._id}`}
        username={review.user.username}
        review_id={review._id}
        song_id={review.songId}
        rating={review.rating}
        review_text={review.text}
        song_name={song_data.name}
        song_artist={song_data.artist}
        image={review.user.imageUrl}
        detail_type={'user'}
      />
    ))
  }

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
          
          {/* details for most recent review */}
          <section className="flex flex-col gap-3">
            {latest_review?.text}
            <div className="flex flex-row gap-2">
              <LikeButton review_id={latest_review?._id} show_like_count={false} />
              <p className="opacity-60 text-sm">{latest_review?.likes.length} {latest_review?.likes.length == 1 ? 'like' : 'likes' }</p>
            </div>
          </section>

          {/* album link */}
          {/* <Link href={`/user/${username}/album/${latest_review?.albumId}`}>
            All reviews for {song_data.album} by {username} 
          </Link> */}

          {/* past reviews */}
          {older_reviews &&
            <section className="flex flex-col gap-3">
              <h3>Past Reviews</h3>
              {render_review_cards(older_reviews)}
            </section>
          }

        </div>
        <div className="flex flex-col grow shrink min-w-52 w-1/3 gap-6">
          <section className="flex flex-col gap-3">
            <h3>Saved In</h3>
            <div>
              <hr className="opacity-30"></hr>
              {list_cards}
            </div>
          </section>
        </div>
      </div>
  );
}