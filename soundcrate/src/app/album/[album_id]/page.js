"use client"
import {get_album} from '/utils';
import {get_songs} from "@/lib/spotify";
import {useEffect, useState} from "react";
export default function AlbumPage({ params }) {
  const { album_id } = params;
  const [albumData, setAlbumData] = useState({})

  useEffect(() => {
    // get song data from spotify api for review cards
    const album_data = get_album(album_id);
    setAlbumData(album_data);

  }, [album_id]);

  return (
      <div>
        <div className={"w-40 h-auto"}>
            {/*<img src={albumData.album_art}/>*/}
        </div>
      </div>
  );
}