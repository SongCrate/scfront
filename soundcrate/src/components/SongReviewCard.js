'use client';

import Link from 'next/link';
import { Rating } from '@/components';
import { Heart } from '@phosphor-icons/react';

export default function SongReviewCard({ 
  username,
  song_id,
  rating=0,
  review_text='',
  like_count=0,
  song_name='Song',
  song_artist='Artist',
  album_art='',
  track_number=null,
  show_album_art=true,
  }) {

  return (
    <Link href={`/user/${username}/song/${song_id}`}>
      <div className="max-h-fit flex flex-row justify-between items-start box-container p-3">
        
        {/* 1 - track number, album art and review details */}
        <div className="flex items-start gap-3">

          {/* 1.1 - track number */}
          {track_number &&
            <div className="w-fit text-right opacity-60">{track_number}</div>
          }

          {/* 1.2 - album art */}
          {show_album_art &&
            <img
              src={album_art ?? "/images/default-user.png"}
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
          <div className="flex flex-col gap-1">
            {/* 1.3.1 song, artist */}
            <h4>
              {song_name}
              <span className="opacity-60 ml-1.5">{song_artist}</span>
            </h4>

            {/* 1.3.2 rating */}
            <Rating rating={rating} />

            {/* 1.3.3 review text */}
            <p className="text-sm opacity-70">{review_text}</p>
          </div>
        </div>

        {/* 2 - like count */}
        <div className="flex flex-col items-center gap-1">
          <Heart weight="fill" />
          <p>{like_count}</p>
        </div>
        
      </div>
    </Link>
  );
}
