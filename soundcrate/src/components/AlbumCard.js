import Image from 'next/image';
import Link from 'next/link';

export default function AlbumCard({ album_data={} }) {
  const username = "janedoe";

  return (
    <Link href="">
      {/* 1 - album card*/}
      <div className="w-full flex flex-col gap-1">

        {/* 1.1 - album art */}
        <Image
          src={album_data.album_img ?? "/images/default-user.png"} 
          alt={`${album_data.album_name} by ${album_data.artist_name}`}
          width={100}
          height={100}
          className="rounded-md w-full"
        />
        
        {/* 1.2 album name */}
        <h4 className="truncate">
          {album_data.album_name}
        </h4>

        {/* 1.2 artist name */}
        <p className="text-sm opacity-60 leading-none truncate">
          {album_data.artist_name}
        </p>
        
      </div>
    </Link>
  );
}
