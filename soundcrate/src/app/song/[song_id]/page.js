'use client';

import { get_song } from '@/lib/spotify';
import {
    get_lists_by_song_id,
    get_list_length,
    get_username,
} from '/utils';
import { 
  SongReviewCard, 
  ListCard, 
  Rating,
  WriteReviewModal,
  AddToListModal
} from '@/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SongPage({ params }) {
  const { song_id } = params;

  const [ songData, setSongData ] = useState(null);
  const [ reviews, setReviews ] = useState([]);

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
    async function fetchReviewsBySongId(song_id) {
      try {
        const response = await fetch(`/api/review/getReviews?songId=${song_id}`, {
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
    
    fetchReviewsBySongId(song_id);
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
    average_rating: reviews?.reduce((total, next) => total + next.rating, 0) / reviews?.length
  }

  const render_header = () => {
    return (
      <section className="flex flex-row gap-6 items-end">
        {/* album art */}
        <img
            src={song_data.album_art ?? "/images/default-user.png"}
            alt={`${song_data.name} by ${song_data.artist}`}
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

  const render_review_cards = (review_array) => {
    return (review_array && review_array.map((review) =>
      <SongReviewCard
        key={`review-card-${review._id}`}
        username={'janedoe'}
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
        list_id={list.id}
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
          {/* {following_review_cards} */}
        </section>
        <section className="flex flex-col gap-3">
          <h3>Popular Reviews</h3>
          {JSON.stringify(reviews)}
          {render_review_cards(reviews)}
        </section>
      </div>
      <div className="flex flex-col grow shrink min-w-52 w-1/3 gap-6">
        {/* button section */}
        <section className="flex flex-col gap-3">
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
          <AddToListModal 
            key={`add-to-list-modal-${song_data.song_id}`}
            song_id={song_id}
            album_id={song_data.album_id}
            song_name={song_data.name}
            artist={song_data.artist}
            album_name={song_data.album}
            album_art={song_data.album_art}
            year={song_data.year}
          />
        </section>
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