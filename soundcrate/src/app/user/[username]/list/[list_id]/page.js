'use client';
import { get_list_by_id, get_list_song_ids } from '/utils';
import { get_songs } from '@/lib/spotify';
import { useState, useEffect } from 'react';
import { SongCard } from '@/components';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function ListPage({ params }) {
  const { username, list_id } = params;

  const [ songData, setSongData ] = useState({});

  const list_data = get_list_by_id(list_id);
  const song_ids = get_list_song_ids(list_id);

  const router = useRouter();
  const session = useSession();


  useEffect(() => {
    // fetch songs to fill song cards
    async function fetchSongs() {
      const response = await get_songs(song_ids);
      setSongData(response);
    }
    fetchSongs();
  }, []);

  const render_song_cards = () => {
    if (songData?.tracks) {
      return song_ids
        .slice(0, 4) // only return the top 5
        .map((song_id, i) =>
          <SongCard 
            key={`song-card-${song_id}`}
            song_id={song_id}
            song_name={songData?.tracks[i]?.name}
            song_artist={songData?.tracks[i]?.artists[0]?.name}
            album_art={songData?.tracks[i]?.album?.images[1]?.url}
            track_number={i + 1} />
        )
    }
  };

  return (
    <main className="flex flex-col gap-4">
      {/* header */}
      <section className="flex flex-col gap-1">
        <h1>{list_data['name']}</h1>
        <p className="opacity-80 text-sm">{list_data['description']} sdjflds</p>

        <div className="flex flex-row gap-1 text-sm uppercase opacity-40">
          <div>{song_ids.length} {song_ids.length != 1 ? 'songs' : 'song'}</div>
          ∙
          <div>By {username}</div>
        </div>
      </section>

      {/* song cards */}
      <section className="flex flex-col gap-2">
        {render_song_cards()}
      </section>

    </main>
  );
}