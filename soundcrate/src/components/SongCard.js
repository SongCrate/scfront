'use client';

import Link from 'next/link';

export default function SongCard({ 
  song_id,
  song_name='Song',
  song_artist='Artist',
  album_art=null,
  track_number=null,
  }) {


  return (
    <Link href={`/song/${song_id}`}>
      <div className="max-h-fit flex flex-row justify-between items-start box-container p-4">
        
        {/* 1 - track number, album art and review details */}
        <div className="flex items-center gap-3">

          {/* 1.1 - track number */}
          {track_number &&
            <div className="w-fit text-right opacity-60">{track_number}</div>
          }

          {/* 1.2 - album art */}
          {album_art &&
            <img
              src={album_art}
              alt={`${song_name} by ${song_artist}`}
              width={50}
              height={50}
              className="rounded-md"
              onError={e => {
                e.currentTarget.src = "/images/default-user.png"
              }}
            />
          }

          {/* 1.3 review details: song, artist, rating, review text */}
          <div className="flex flex-col">
            {/* 1.3.1 song, artist or user*/}
            <h4> {song_name}</h4>
            <span className="font-medium opacity-60">{song_artist}</span>

          </div>
        </div>
      </div>
    </Link>
  );
}
