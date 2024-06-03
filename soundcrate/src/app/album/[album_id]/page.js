'use client';

import { get_album } from '@/lib/spotify';
import { SongCard, SongReviewCard } from '@/components';
import { useState, useEffect } from 'react';

export default function AlbumPage({ params }) {
  const { album_id } = params;

  const [ albumData, setAlbumData ] = useState(null);
  const [ reviews, setReviews ] = useState([]);

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
    async function fetchReviewsByAlbumId(album_id) {
      try {
        const response = await fetch(`/api/review/getReviews?albumId=${album_id}&sortBy=likes&limit=10`, {
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
    
    fetchReviewsByAlbumId(album_id);
  }, []);

  // package albumData for easy use in header
  const album_data = albumData && {
    album_id: albumData.id,
    name: albumData.name,
    artist: albumData.artists[0]?.name,
    album_art: albumData.images[0]?.url,
    year: albumData.release_date?.slice(0, 4),
  }

  // package albumData for easy use in tracklist
  const album_songs = albumData?.tracks?.items.map((song) => {
    return {
      song_id: song.id,
      name: song.name,
      artist: song.artists.map(artist_obj => {return artist_obj.name}).join(", "),
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
        {/* song details */}
        <div className="flex flex-col pb-1">
          <p className="uppercase opacity-50 text-xs mb-0.5">Album</p>
          <h1>{album_data.name}</h1>
          <p className="text-med opacity-70 mb-1.5">
            <span>{album_data.artist}</span>
            <span className="mx-2">∙</span>
            <span>{album_data.year}</span>
          </p>
          <span>
        </span>
        </div>
      </section>
    )
  }

  const render_tracklist = () => {
    return (album_songs &&
      <section className="flex flex-col gap-3">
        <h3>Tracklist ({album_songs.length})</h3>
        {album_songs.map((song, i) =>
          <SongCard
            key={`song-card-${song.id}`}
            song_id={song.song_id}
            song_name={song.name}
            song_artist={song.artist}
            track_number={i+1}
          />
        )}
      </section>
    )
  }

  const render_review_cards = () => {
    return (reviews && album_songs &&
      <section className="flex flex-col gap-3">
        <h3>Top Reviews</h3>
        <div className="flex flex-col gap-2">
          {reviews.map((review) =>
            <SongReviewCard
              key={`review-card-${review._id}`}
              username={review.user.username}
              review_id={review._id}
              song_id={review.songId}
              rating={review.rating}
              review_text={review.text}
              song_name={album_songs?.find((song) => song.song_id === review.songId)?.name}
              song_artist={album_songs?.find((song) => song.song_id === review.songId)?.artist}
              image={review.user.imageUrl}
              detail_type={'album'}
            />
          )}
        </div>
      </section>
    )
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap w-full gap-6">
      <div className="flex flex-col grow shrink gap-6 w-2/3">
        {render_header()}
        {render_tracklist()}
      </div>
      <div className="flex flex-col grow shrink min-w-52 w-1/3 gap-6">
        {render_review_cards()}
      </div>
    </div>
  );
}