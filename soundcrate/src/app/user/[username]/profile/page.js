'use client';

import { 
  get_albums, 
  get_songs 
} from '@/lib/spotify';
import {
  AlbumCard,
  CreateListModal,
  ListCard,
  SongReviewCard,
  EmptyContentMessage,
} from "@/components";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UserProfilePage({ params }) {
  const { username } = params;

  const [ songData, setSongData ] = useState(null);
  const [ albums, setAlbums ] = useState([]);
  const [ reviews, setReviews ] = useState([]);
  const [ lists, setLists ] = useState([]);

  // get song data from spotify api for review cards
  useEffect(() => {
    const get_song_data = async () => {
      if (reviews) {
        const song_ids = reviews.map((review) => {
          return review.songId;
        })
        
        if (song_ids.length) {
          const response = await get_songs(song_ids);
          setSongData(response?.tracks);
        }
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
  
  // get album data from spotify api for album cards
  useEffect(() => {
    const get_album_data = async () => {
      const album_ids = reviews.map((review) => {
        return review.albumId;
      })
      const unique_album_ids = [...new Set(album_ids)];

      if (unique_album_ids.length) {
        const response = await get_albums(unique_album_ids);
        setAlbums(response?.albums);
      }
    };
    
    get_album_data();
  }, [reviews]);

  // fetch all songlists for this username
  useEffect(() => {
    async function fetchSongLists(username) {
      try {
        const response = await fetch(
          `/api/lists/getSongLists?username=${username}`, 
          { method: 'GET' }
        );
        const responseData = await response.json();
        if (responseData?.body) {
          setLists(responseData.body);
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSongLists(username);
  }, [username]);

  const handleNewList = (newList) => {
    setLists([newList, ...lists]);
  };

  const render_review_cards = (review_array) => {
    if (!review_array || review_array.length === 0) {
      return <EmptyContentMessage message="No Reviews" />;
    }
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
          likes={review.likes}
        />
      )}
    ))
  }

  const render_album_cards = (album_array) => {
    if (!album_array || album_array.length === 0) {
      return <EmptyContentMessage message="No Albums" />;
    }
    return (album_array && album_array.map((album) =>
      <AlbumCard 
        key={`album-card-${album.id}`} 
        username={username}
        album_id={album.id}
        name={album.name}
        artist_name={album?.artists[0]?.name}
        album_art={album?.images[1]?.url} />
      )
    )
  }

  const list_cards = (list_array) => {
    if (!list_array || list_array.length === 0) {
      return <EmptyContentMessage message="No Lists" />;
    }
  return (list_array && list_array.map((list) =>
      <ListCard 
        key={list._id}
        username={list.user.username}
        list_id={list._id}
        name={list.title}
        song_count={list.songIds.length} />
      )
    )
  }


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
            {render_album_cards(albums?.slice(0, 8))}
          </div>
        </section>
      </div>
      <section className="flex flex-col gap-2 grow shrink min-w-52 w-1/3">
        <div className="flex justify-between items-baseline">
          <Link href="profile/lists"><h3>Lists</h3></Link>
          <CreateListModal username={username} onCreate={handleNewList} />
        </div>
        <div className="border-t border-dark-light">
          {list_cards(lists.slice(0, 8))}
          {lists.length > 8 && (
            <Link href="profile/lists">
              <button className="btn p-2 bg-dark-light text-white rounded-md hover:bg-blue">
                View All Lists
              </button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}