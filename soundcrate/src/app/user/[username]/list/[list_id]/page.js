'use client';
import Link from 'next/link';
import { get_songs } from '@/lib/spotify';
import { useState, useEffect } from 'react';
import { SongCard } from '@/components';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function ListPage({ params }) {
  const { username, list_id } = params;

  const [songData, setSongData] = useState({});
  const [listData, setListData] = useState({});
  const [songIds, setSongIds] = useState([]);

  useEffect(() => {
    // fetch list data and song IDs
    async function fetchListData() {
      try {
        const response = await fetch(`/api/lists/getOneSongList?id=${list_id}`);
        const data = await response.json();
        if (response.ok) {
          setListData(data.list);
          setSongIds(data.list.songIds);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchListData();
  }, [list_id]);

  useEffect(() => {
    // fetch songs to fill song cards
    async function fetchSongs() {
      if (songIds.length > 0) {
        try {
          const response = await get_songs(songIds);
          setSongData(response);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchSongs();
  }, [songIds]);

  const render_song_cards = () => {
    if (songData?.tracks) {
      return songIds
        // .slice(0, 4) // only return the top 4
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
        <h1>{listData.title}</h1>
        <p className="opacity-80 text-sm">{listData.description}</p>

        <div className="flex flex-row gap-1 text-sm uppercase tracking-wider">
          <div className="opacity-40">{songIds.length} {songIds.length !== 1 ? 'songs' : 'song'}</div>
          ∙
          <Link href={`/user/${username}/profile`}className="opacity-40 hover:opacity-60">By {username}</Link>
        </div>
      </section>

      {/* song cards */}
      <section className="flex flex-col gap-2">
        {render_song_cards()}
      </section>

    </main>
  );
}