import { Rating } from '@/components';
import Link from 'next/link';

export default function AlbumCard({
  href,
  album_id,
  name="Album",
  artist_name="Artist",
  album_art=null,
  rating=null
 }) {

  return (
    <Link href={href ?? `album/${album_id}`}>
      {/* 1 - album card*/}
      <div className="w-full flex flex-col gap-1">

        {/* 1.1 - album art */}
        <img
          src={album_art ?? "/images/default-user.png"}
          alt={`${name} by ${artist_name}`}
          className={"w-full aspect-square rounded-md"}
        />
        
        {/* 1.2 - rating, if provided */}
        {rating &&
          <span className="mt-2 mb-1 flex flex-row gap-1 items-center">
            <Rating id='rating' rating={rating}/> 
            <label htmlFor='rating' className="text-sm opacity-60">{rating}</label>
          </span>
        }

        {/* 1.3 album name */}
        <h4 className="truncate">
          {name}
        </h4>

        {/* 1.4 artist name */}
        <p className="text-sm opacity-60 leading-none truncate">
          {artist_name}
        </p>
      </div>
    </Link>
  );
}
