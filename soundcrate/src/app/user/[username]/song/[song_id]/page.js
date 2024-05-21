'use client';

import {
  get_review,
  get_lists_by_song_id,
  get_list_length,
  get_username,
  get_review_likes
} from '/utils';
import { get_song } from '@/lib/spotify';
import {
  ListCard,
  Rating,
  LikeButton
} from '@/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SongReviewPage({ params }) {
  const { username, song_id } = params;

  const review_data = get_review(username, song_id);
  const like_count = get_review_likes(review_data.id);

  const [ songData, setSongData ] = useState(null);

  useEffect(() => {
    // get song data from spotify api
    const get_song_data = async () => {
      const response = await get_song(song_id);
      setSongData(response);
    };

    get_song_data();
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
            <h1>{song_data.name}</h1>
            <p className="text-med opacity-70 mb-1.5">
              <span>{song_data.artist}</span>
              <span className="mx-2">∙</span>
              <Link href={`/album/${song_data.album_id}`}>
                <span className="hover:underline underline-offset-4 decoration-accent">{song_data.album} ({song_data.year})</span>
              </Link>
            </p>
            <span>
            <Rating rating={review_data.rating}/>
          </span>
          </div>
        </section>
    )
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
          {/* review text */}
          <section className="flex flex-col gap-3">
            {review_data.review_text}
            <div className="flex flex-row gap-2">
              <LikeButton review_id={review_data.id} show_like_count={false} />
              <p className="opacity-60 text-sm">{like_count} {like_count == 1 ? 'like' : 'likes' }</p>
            </div>
          </section>

          {/* album link */}
          {/* <Link href={`/user/${username}/album/${review_data.album_id}`}>
            <div className="bg-dark-light box-container">
              {song_data.album} 
            </div>
          </Link> */}

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