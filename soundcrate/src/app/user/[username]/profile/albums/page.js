'use client';

import { get_albums } from '@/lib/spotify';
import { AlbumCard, EmptyContentMessage } from "@/components";
import { useState, useEffect } from 'react';

export default function ListsPage({ params }) {
  const { username } = params;
  const [ albums, setAlbums ] = useState([]);

  // fetch all albums from reviews for this username
  useEffect(() => {
    async function fetchReviewsByUsername(username) {
      try {
        const response = await fetch(
          `/api/review/getReviews?username=${username}&sortBy=date`, 
          { method: 'GET' }
        );
    
        const responseData = await response.json();
        if (responseData?.body) {
          return responseData.body;
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const get_album_data = async (username) => {
      const fetched_reviews = await fetchReviewsByUsername(username);
      const album_ids = fetched_reviews.map((review) => {
        return review.albumId;
      })
      const unique_album_ids = [...new Set(album_ids)];

      const response = await get_albums(unique_album_ids);
      setAlbums(response?.albums);
    };
    
    get_album_data(username);
  }, []);

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
  // flex flex-row flex-wrap gap-3
    
  return (
    <main className="flex flex-col gap-4">
      <h2>Albums</h2>
      {albums && albums.length
        ? <div className="grid lg:grid-cols-5 grid-cols-4 gap-3">
            {render_album_cards(albums)}
          </div>
        : <p>Loading...</p>
      }
    </main>
  );
}