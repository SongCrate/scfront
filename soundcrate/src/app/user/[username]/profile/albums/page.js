'use client';

import { get_albums } from '@/lib/spotify';
import { get_album_ids } from '/utils';
import { AlbumCard } from "@/components";
import { useState, useEffect } from 'react';

export default function ListsPage({ params }) {
  const { username } = params;

  const [ albumData, setAlbumData ] = useState(null);

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

  // get data for albums
  var album_ids = get_album_ids(username);

  const album_cards = album_ids.map((album_id, i) =>
    <AlbumCard 
      key={`album-card-${album_id}`} 
      username={username}
      album_id={album_id}
      name={albumData?.albums[i]?.name}
      artist_name={albumData?.albums[i]?.artists[0]?.name}
      album_art={albumData?.albums[i]?.images[1]?.url} 
      size={20} />
  )
    
  return (
    <main className="flex flex-col gap-4">
      <h2>Albums</h2>
      <div className="flex flex-row flex-wrap gap-3">
        {album_cards}
      </div>
    </main>
  );
}