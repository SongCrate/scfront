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
import { useRouter } from "next/navigation";

export default function UserProfilePage({ params }) {
  const { username } = params;

  const [ songData, setSongData ] = useState(null);
  const [ albumData, setAlbumData ] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter()

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

  // ============ GETTING DATA FOR REVIEW CARDS ============
  // get data for first 2 reviews
  var reviews = get_reviews(username).slice(0, 2);
  var review_data = reviews.map((_, i) => ( // add in like count
    {...reviews[i], 
      "like_count": get_review_likes(reviews[i].id)
    }
  ))

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

  const review_cards = review_data.map((review, i) =>
    <SongReviewCard 
      key={`review-card-${review.song_id}`}
      username={username}
      song_id={review.song_id}
      rating={review.rating}
      review_text={review.review_text}
      song_name={songData?.tracks[i]?.name}
      song_artist={songData?.tracks[i]?.artists[0]?.name}
      album_art={songData?.tracks[i]?.album?.images[1]?.url}
      like_count={review.like_count} />
  )

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
          {review_cards}
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