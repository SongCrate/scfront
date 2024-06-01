'use client';

import { 
  get_albums, 
  get_songs 
} from '@/lib/spotify';
import {
  get_album_ids,
  get_lists, 
  get_list_length, 
  get_reviews,
  get_review_likes,
} from '/utils';
import {
  AlbumCard,
  CreateListModal,
  ListCard,
  SongReviewCard,
} from "@/components";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UserProfilePage({ params }) {
  const { username } = params;

  const [ songData, setSongData ] = useState(null);
  const [ albumData, setAlbumData ] = useState(null);
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

  // fetch all reviews for this username
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
  
  useEffect(() => {
    // get album data from spotify api for album cards
    const get_album_data = async () => {
      if (album_ids) {
        const response = await get_albums(album_ids);
        setAlbumData(response);
      }
    };
    
    get_album_data();
  }, [album_ids]);

  // ============ GETTING DATA FOR ALBUMS ============
  // get data for first 8 albums
  var album_ids = get_album_ids(username).slice(0, 8);

  // ============ GETTING DATA FOR LISTS ============
  var lists = get_lists(username);
  var list_data = lists.map((_, i) => ( // add in list length
    {...lists[i],
      "song_count": get_list_length(lists[i].id)
    } 
  ))

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

  const album_cards = album_ids.map((album_id, i) =>
    <AlbumCard 
      key={`album-card-${album_id}`} 
      username={username}
      album_id={album_id}
      name={albumData?.albums[i]?.name}
      artist_name={albumData?.albums[i]?.artists[0]?.name}
      album_art={albumData?.albums[i]?.images[1]?.url} />
  )

  const list_cards = list_data.map((list) => 
    <div key={`list-card-${list.id}`}>
      <ListCard 
        username={username}
        list_id={list.id}
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
          {render_review_cards(reviews.slice(0, 3))}
        </section>
        <section>
          <Link href="profile/albums"><h3 className="mb-3">Albums</h3></Link>
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