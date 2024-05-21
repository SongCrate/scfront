'use client';

import { get_album } from '/utils';
import { SongCard, SongReviewCard } from '@/components';

export default function AlbumPage({ params }) {
  const { album_id } = params;
  var album_data = get_album(album_id);

  const render_header = () => {
    return (
        <section className="flex flex-row gap-6 items-end">
          {/* album art */}
          <img
              src={album_data?.album_art ?? "/images/default-user.png"}
              alt={`${album_data?.album_name} by ${album_data?.artist_name}`}
              className="rounded-md w-[120px] h-[120px]"
              onError={e => {
                e.currentTarget.src = "/images/default-user.png"
              }}
          />
          {/* song details */}
          <div className="flex flex-col pb-1">
            <p className="uppercase opacity-50 text-xs mb-0.5">Album</p>
            <h1>{album_data?.album_name}</h1>
            <p className="text-med opacity-70 mb-1.5">
              <span>{album_data?.artist_name}</span>
              <span className="mx-2">∙</span>
              <span>{album_data?.year}</span>
            </p>
            <span>
          </span>
          </div>
        </section>
    )
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap w-full gap-6">
      <div className="flex flex-col grow shrink gap-6 w-2/3">
        {render_header()}
        <section className="flex flex-col gap-3">
          <h3>Tracklist (5)</h3>
            {album_data?.songs?.map((song, i)=>
              <SongCard 
                song_name={song.title} 
                key={song.song_id} 
                song_id={song.song_id}
                track_number={i + 1}
                review_count={'4.1k'} />
            )}
        </section>
      </div>
      <div className="flex flex-col grow shrink min-w-52 w-1/3 gap-6">
        <section className="flex flex-col gap-3">
          <h3>Top Reviews</h3>
          <div>
            <SongReviewCard 
              review_text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed."}
              like_count={90}
              song_name={album_data?.songs[0]?.title}
              song_artist={album_data?.artist_name}
              rating={5} />
            <SongReviewCard
              review_text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed."}
              like_count={90}
              song_name={album_data?.songs[3]?.title}
              song_artist={album_data?.artist_name}
              rating={2} />
            <SongReviewCard
              review_text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed."}
              like_count={90}
              song_name={album_data?.songs[4]?.title}
              song_artist={album_data?.artist_name}
              rating={4} />
          </div>
        </section>
      </div>
    </div>
  );
}