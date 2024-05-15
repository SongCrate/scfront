import Link from 'next/link';

export default function AlbumCard({
  username,
  album_id,
  name="Album",
  artist_name="Artist",
  album_art=null,
  size=100
 }) {

  return (
    <Link href="">
      {/* 1 - album card*/}
      <div className="w-full flex flex-col gap-1">

        {/* 1.1 - album art */}
        <img
          src={album_art ?? "/images/default-user.png"} 
          alt={`${name} by ${artist_name}`}
          width={size}
          height={size}
          className="rounded-md w-full"
        />
        
        {/* 1.2 album name */}
        <h4 className="truncate">
          {name}
        </h4>

        {/* 1.2 artist name */}
        <p className="text-sm opacity-60 leading-none truncate">
          {artist_name}
        </p>
        
      </div>
    </Link>
  );
}
