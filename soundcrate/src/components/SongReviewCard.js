'use client';

import Link from 'next/link';
import { Rating, LikeButton } from '@/components';

export default function SongReviewCard({ 
  username,
  song_id,
  review_id,
  rating=0,
  review_text='',
  song_name='Song',
  song_artist='Artist',
  image='',
  track_number=null,
  show_image=true,
  detail_type='album',
  likes=[]
  }) {

  // display either album art + song details OR profile image + username
  // depending on detail_type
  var src = '';
  var header = null;
  if (detail_type == 'album') {
    src = image ?? "/images/default-user.png";
    header = 
      <>
        {song_name}
        <span className="opacity-60 ml-1.5">{song_artist}</span>
      </>
  } else if (detail_type == 'user') {
    src =  image ?? "/images/default-user.png";
    header = username;
  }

  return (
    <Link href={`/user/${username}/song/${song_id}`}>
      <div className="max-h-fit flex flex-row justify-between items-start box-container p-3">
        
        {/* 1 - track number, album art and review details */}
        <div className="flex items-start gap-3">

          {/* 1.1 - track number */}
          {track_number &&
            <div className="w-fit text-right opacity-60">{track_number}</div>
          }

          {/* 1.2 - album art / user profile picture*/}
          {show_image &&
            <img
              src={src}
              alt={detail_type == 'album' 
                ? `${song_name} by ${song_artist}` 
                : username}
              width={50}
              height={50}
              className="rounded-md object-cover aspect-square"
              onError={e => {
                e.currentTarget.src = "/images/default-user.png"
              }}
            />
          }

          {/* 1.3 review details: song, artist, rating, review text */}
          <div className="flex flex-col gap-1">
            {/* 1.3.1 song, artist or user*/}
            <h4>
              {header}
            </h4>

            {/* 1.3.2 rating */}
            <Rating rating={rating} />

            {/* 1.3.3 review text */}
            <p className="text-sm opacity-70">{review_text}</p>
          </div>
        </div>

        {/* 2 - like count */}
        <LikeButton 
          review_id={review_id}
          likes={likes}
          compact={true}
        />
      </div>
    </Link>
  );
}
