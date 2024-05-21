"use client"
import {get_album} from '/utils';
import {get_songs} from "@/lib/spotify";
import {useEffect, useState} from "react";
import {SongCard, SongReviewCard} from "@/components";
export default function AlbumPage({ params }) {
  const { album_id } = params;
  const [albumData, setAlbumData] = useState({})

  useEffect(() => {
    // get song data from spotify api for review cards
    const album_data = get_album(album_id);
    setAlbumData(album_data);


  }, [album_id]);
  console.log(albumData.songs)

  return (
      <div>
        <div className={"flex flex-wrap"}>
            <img src={albumData.album_art} className={"w-40 h-auto rounded-md mb-5 mr-8"}/>
            <div>
                <p className={"text-sm"}>ALBUM</p>
                <h2 className={"font-semibold text-2xl"}>{albumData.album_name}</h2>
                <p className={"text-lg"}>{albumData.artist_name}</p>
                <p className={"text-xs"}>4.1K TOTAL REVIEWS</p>
            </div>

        </div>
        <p className={"mb-2"}>TRACKLIST (5)</p>
        <div className={"lg:flex"}>
            <div className={""}>
                {albumData.songs.map((song, index)=>
                    <SongCard song_name={song.title} i={index} song_id={song.song_id}/>
                )
                }
            </div>
            <div className={"lg:ml-36 mt-8 lg:mt-0"}>
                <p className={"mb-3"}>TOP REVIEWS</p>
                <div className={"w-96"}>
                    <SongReviewCard review_text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed."}
                                    like_count={90}
                                    song_name={albumData.songs[0].title}
                                    song_artist={albumData.artist_name}
                    />
                    <SongReviewCard review_text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed."}
                                    like_count={90}
                                    song_name={albumData.songs[3].title}
                                    song_artist={albumData.artist_name}/>
                    <SongReviewCard review_text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed."}
                                    like_count={90}
                                    song_name={albumData.songs[4].title}
                                    song_artist={albumData.artist_name}/>
                </div>

            </div>
        </div>


      </div>
  );
}