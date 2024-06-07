'use client';

import { get_album, get_albums } from '@/lib/spotify';
import {
  SongCard,
  SongReviewCard,
  AlbumCard
} from '@/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AlbumReviewPage({ params }) {
  const { username, album_id } = params;

  const [ albumData, setAlbumData ] = useState(null);
  const [ reviews, setReviews ] = useState([]);
  const [ allReviews, setAllReviews ] = useState([]);
  const [ albums, setAlbums ] = useState(null);

  // get album data from spotify api
  useEffect(() => {
    const get_album_data = async () => {
      const response = await get_album(album_id);
      setAlbumData(response);
    };

    get_album_data();
  }, []);

  // fetch all reviews for this albumId
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `/api/review/getReviews?albumId=${album_id}&username=${username}&sortBy=date`, 
          { method: 'GET' }
        );
    
        const responseData = await response.json();
        if (responseData?.body) {
          // get the fetched reviews and only get the most recent review for each songId
          let fetched_reviews = responseData.body;
          fetched_reviews = fetched_reviews.filter((a, i, arr) => 
            arr.findIndex(b => (b.songId === a.songId)) === i
          )
          setReviews(fetched_reviews);
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchReviews();
  }, []);

  // fetch all reviews for this username to populate more albums section
  useEffect(() => {
    async function fetchReviewsByUsername(username) {
      try {
        const response = await fetch(
          `/api/review/getReviews?username=${username}&sortBy=date`, 
          { method: 'GET' }
        );
    
        const responseData = await response.json();
        if (responseData?.body) {
          setAllReviews(responseData.body);
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
      const album_ids = allReviews.map((review) => {
        return review.albumId;
      })
      let unique_album_ids = new Set(album_ids);
      unique_album_ids.delete(album_id);
      unique_album_ids = [...unique_album_ids];

      if (unique_album_ids.length) {
        const response = await get_albums(unique_album_ids);
        setAlbums(response?.albums);
      }
    };
    
    get_album_data();
  }, [reviews]);

  // package albumData for easy use
  const album_data = albumData && {
    album_id: albumData.id,
    name: albumData.name,
    artist: albumData.artists[0]?.name,
    album_art: albumData.images[0]?.url,
    year: albumData.release_date?.slice(0, 4),
  }

  // package albumData for easy use in reviews
  const album_songs = albumData?.tracks?.items.map((song) => {
    return {
      song_id: song.id,
      name: song.name,
      artist: song.artists.map(artist_obj => {return artist_obj.name}).join(", "),
      review: reviews.find(review_obj => review_obj.songId == song.id)
    };
  })

  const render_header = () => {
    return (album_data &&
      <section className="flex flex-row gap-6 items-end">
        {/* album art */}
        <img
          src={album_data.album_art ?? "/images/default-user.png"}
          alt={`${album_data.name} by ${album_data.artist}`}
          className="rounded-md w-[120px] h-[120px]"
          onError={e => {
            e.currentTarget.src = "/images/default-user.png"
          }}
        />
        {/* album details */}
        <div className="flex flex-col pb-1">
          
          {/* type and username */}
          <div className="flex flex-row gap-1 uppercase text-xs mb-0.5 tracking-wide">
            <p className="opacity-60">Album</p>
            <p className="opacity-60">•</p>
            <Link href={`/user/${username}/profile`}className="opacity-60 hover:opacity-90">By {username}</Link>
          </div>  
          
          <Link href={`/album/${album_data.album_id}`}>
            <h1 className="hover:underline underline-offset-4 decoration-accent">{album_data.name}</h1>
          </Link>
          <p className="text-med opacity-70 mb-1.5">
            <span>{album_data.artist}</span>
            <span className="mx-2">∙</span>
            <span>{album_data.year}</span>
          </p>
          <p className="uppercase opacity-60 text-sm mb-0.5">Reviewed {reviews.length} out of {album_songs.length} Songs</p>
          <span>
        </span>
        </div>
      </section>
    )
  }
  const render_song_cards = () => {
    return (album_songs && album_songs.map((song, i) => {
      if (song.review != undefined) { 
        return (
          <SongReviewCard
            key={`review-card-${song.id}`}
            username={username}
            review_id={song.review._id}
            song_id={song.review.songId}
            rating={song.review.rating}
            review_text={song.review.text}
            song_name={song.name}
            song_artist={song.artist}
            image={song.review.user.imageUrl}
            detail_type={'album'}
            likes={song.review.likes}
            track_number={i+1}
          />
        )
      } else {
        return (
          <SongCard
            key={`song-card-${song.song_id}`}
            song_id={song.song_id}
            song_name={song.name}
            song_artist={song.artist}
            track_number={i+1}
          />
        );
      }
    }
    ))
  }

  const render_album_cards = (album_array) => {
    return (album_array && album_array.map((album) =>
      <AlbumCard 
        key={`album-card-${album.id}`} 
        href={`/user/${username}/album/${album.id}`}
        username={username}
        album_id={album.id}
        name={''}
        artist_name={''}
        album_art={album?.images[1]?.url} />
      )
    )
  }

  return (
      <div className="flex flex-wrap md:flex-nowrap w-full gap-6">
        <div className="flex flex-col grow shrink gap-6 w-2/3">
          {render_header()}
          
          <section className="flex flex-col gap-3">
            <h3>Tracklist ({album_songs?.length})</h3>
            {render_song_cards()}
          </section>

        </div>
        <div className="flex flex-col grow shrink min-w-52 w-1/3 gap-6">
          <section className="flex flex-col gap-3">
            <h3>More Albums</h3>
              <div className="flex flex-row no-wrap gap-3">
                {render_album_cards(albums?.slice(0, 3))}
            </div>
          </section>
        </div>
      </div>
  );
}