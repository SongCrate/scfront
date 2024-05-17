"use client"
import { get_albums } from '/utils';
import {AlbumCard} from "@/components";
export default function Home() {
  const album_data = get_albums()

  return (
      <div>
        {album_data.map((album, i) => <AlbumCard
            key={i}
            name={album.album_name}
            artist_name={album.artist_name}
            size={10}
            album_id={album.album_id}
          />)}
      </div>
  );
}