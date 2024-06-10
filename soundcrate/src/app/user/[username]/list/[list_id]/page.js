'use client';
import Link from 'next/link';
import { get_songs } from '@/lib/spotify';
import { useState, useEffect } from 'react';
import { SongCard, EmptyContentMessage, EditListModal } from '@/components';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function ListPage({ params }) {
  const { username, list_id } = params;

  const [songData, setSongData] = useState({});
  const [listData, setListData] = useState({});
  const [songIds, setSongIds] = useState([]);

  const { data: session } = useSession();

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

  const handleSave = (updatedList) => {
    setListData(updatedList);
  };

  // const render_song_cards = () => {
  //   if (!songIds.length) {
  //     return <EmptyContentMessage message="No songs yet" />;
  //   }
  //   if (songData?.tracks) {
  //     return songIds
  //       .map((song_id, i) =>
  //         <SongCard 
  //           key={`song-card-${song_id}`}
  //           song_id={song_id}
  //           song_name={songData?.tracks[i]?.name}
  //           song_artist={songData?.tracks[i]?.artists[0]?.name}
  //           album_art={songData?.tracks[i]?.album?.images[1]?.url}
  //           track_number={i + 1} />
  //       )
  //   }
  // };

  const handleDeleteSong = async (song_id) => {
    try {
      const response = await fetch(`/api/lists/updateSongList`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'user_id': session.user._id // Include user_id in headers
        },
        body: JSON.stringify({ listId: list_id, songId: song_id, action: 'remove' })
      });

      const responseData = await response.json();
      if (response.ok) {
        setSongIds((prevIds) => prevIds.filter((id) => id !== song_id));
      } else {
        console.error(responseData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const render_song_cards = () => {
  //   if (!songIds.length) {
  //     return <EmptyContentMessage message="No songs yet" />;
  //   }
  //   if (songData?.tracks) {
  //     return songIds.map((song_id, i) => (
  //       <div key={`song-card-${song_id}`} className="flex items-center justify-between">
  //         <SongCard
  //           song_id={song_id}
  //           song_name={songData?.tracks[i]?.name}
  //           song_artist={songData?.tracks[i]?.artists[0]?.name}
  //           album_art={songData?.tracks[i]?.album?.images[1]?.url}
  //           track_number={i + 1}
  //         />
  //         {session?.status === 'authenticated' && session?.user?.username === username && (
  //           <button
  //             className="btn p-2 bg-dark-light text-white rounded-md hover:bg-red"
  //             onClick={() => handleDeleteSong(song_id)}
  //           >
  //             Delete
  //           </button>
  //         )}
  //       </div>
  //     ));
  //   }
  // };

  const render_song_cards = () => {
  if (!songIds.length) {
    return <EmptyContentMessage message="No songs yet" />;
  }
  if (songData?.tracks) {
    return songIds.map((song_id, i) => (
      <div key={`song-card-${song_id}`} className="flex items-center justify-between bg-dark-light p-4 rounded-md mb-4">

        <div className="flex-grow">
          <SongCard
            song_id={song_id}
            song_name={songData?.tracks[i]?.name}
            song_artist={songData?.tracks[i]?.artists[0]?.name}
            album_art={songData?.tracks[i]?.album?.images[1]?.url}
            track_number={i + 1}
          />
        </div>

        {session?.status === 'authenticated' && session?.user?.username === username && (
          <button
            className="btn p-2 bg-dark-light text-white rounded-md hover:bg-red"
            onClick={() => handleDeleteSong(song_id)}
          >
            Delete
          </button>
        )}

      </div>
    ));
  }
};


  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-1">
        <h1>{listData.title}</h1>
        <p className="opacity-80 text-sm">{listData.description}</p>

        <div className="flex flex-row gap-1 text-sm uppercase tracking-wider">
          <div className="opacity-40">{songIds.length} {songIds.length !== 1 ? 'songs' : 'song'}</div>
          ∙
          <Link href={`/user/${username}/profile`} className="opacity-40 hover:opacity-60">By {username}</Link>
        </div>
        {session?.status === 'authenticated' && session?.user?.username === username && (
          <EditListModal
            username={username}
            list_id={list_id}
            initialTitle={listData.title}
            initialDescription={listData.description}
            onSave={handleSave}
          />
        )}
      </section>

      <section className="flex flex-col gap-2">
        {render_song_cards()}
      </section>
    </main>
  );
}