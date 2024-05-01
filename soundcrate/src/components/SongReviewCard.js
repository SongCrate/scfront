'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '@/components';
import { Heart } from '@phosphor-icons/react';

export default function SongReviewCard({ track_number=null, show_album_art=true, review_data={} }) {
  const username = "janedoe";

  return (
    <Link href={`/user/${review_data.username}/song/${review_data.song_id}`}>
      <div className="max-h-fit flex flex-row justify-between items-start box-container p-3">
        
        {/* 1 - track number, album art and review details */}
        <div className="flex items-start gap-3">

          {/* 1.1 - track number */}
          {track_number &&
            <div className="w-fit text-right opacity-60">{track_number}</div>
          }

          {/* 1.2 - album art */}
          {show_album_art &&
            <Image
              src={review_data.album_img ?? "/images/default-user.png"} 
              alt={username}
              width={45}
              height={45}
              className="rounded-md"
            />
          }

          {/* 1.3 review details: song, artist, rating, review text */}
          <div className="flex flex-col gap-1">
            {/* 1.3.1 song, artist */}
            <h4>
              {review_data.song_name}
              <span className="opacity-60 ml-1.5">{review_data.artist_name}</span>
            </h4>

            {/* 1.3.2 rating */}
            <Rating rating={review_data.rating} />

            {/* 1.3.3 review text */}
            <p className="text-sm opacity-70">{review_data.review_text}</p>
          </div>
        </div>

        {/* 2 - like count */}
        <div className="flex flex-col items-center gap-1">
          <Heart weight="fill" />
          <p>{review_data.like_count}</p>
        </div>
        
      </div>
    </Link>
  );
}
