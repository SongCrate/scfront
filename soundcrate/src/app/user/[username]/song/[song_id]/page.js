import Image from 'next/image';

import {
  AlbumCard,
  CreateListModal,
  ListCard,
  SongReviewCard,
  Rating,
} from "@/components";;

export default function SongPage({ params }) {
  const { song_id } = params

  // mock data 
  const album_data = [
    {
      album_id: 1,
      album_name: "Lucid",
      year: 2019,
      artist_name: "Raveena",
    }
  ]

  const list_data = [
    {
      username: "janedoe",
      list_name: "my favorites <3",
      song_count: 2,
    },
    {
      username: "janedoe",
      list_name: "2010",
      song_count: 18,
    },
    {
      username: "janedoe",
      list_name: "greatest hits",
      song_count: 20,
    },
  ]

  const review_data = [
    {
      username: "janedoe",
      song_id: 2,
      album_img: null,
      song_name: "Sugar Water",
      artist_name: "Raveena",
      rating: 3,
      review_text: "best song from the album imo!",
      like_count: 12,
    },
    {
      username: "janedoe",
      song_id: 2,
      album_img: null,
      song_name: "Picture You",
      artist_name: "Raveena",
      rating: 3,
      review_text: "best song from the album imo!",
      like_count: 12,
    }
  ]

  const album_cards = album_data.map((album, i) =>
    <AlbumCard 
      key={`album-card-${i}`} 
      album_data={album} />
  )

  const saved_cards = list_data.map((list, i) => 
    <div key={`saved-card-${i}`}>
      <ListCard 
        list_data={list} />
      <hr className="opacity-30"></hr>
    </div >
  )

  const other_cards = review_data.map((review, i) => 
    <div key={`review-card-${i}`}>
      <SongReviewCard 
        review_data={review} />
      <hr className="opacity-30"></hr>
    </div >  
  )

  const song_review_data = {
      username: "janedoe",
      song_id: 1,
      album_img: null,
      album_name: "Lucid",
      song_name: "Petal",
      artist_name: "Raveena",
      year: 2019,
      rating: 4,
      review_text: "best song from the album imo!",
      like_count: 12,
    }

    return (
      <div className="flex flex-row w-full gap-6">
        {/* Left column for User Profile and Song Info */}
        <section className="w-2/3 flex flex-col gap-5">
          {/* user profile picture */}
          <Image
            src={song_review_data.album_img ?? "/images/default-user.png"} 
            alt={song_review_data.song_name}
            width={140}
            height={1400}
            className="rounded-md"
          />
    
          <div className="flex flex-col gap-3">
            {/* stats container: reviews, albums, followers, following */}
            <section id="song-info-section" className="container-box">
              <div className="flex flex-col gap-3">
                <span>by {song_review_data.username}</span>
                <h2>{song_review_data.song_name}</h2>
                <div className="flex flex-row gap-3">
                  <span className="song-stats-child">
                    <span className="label-sm">{song_review_data.artist_name}</span>
                  </span>
                  <span className="song-stats-child">
                    <span className="label-sm">{song_review_data.album_name}</span>
                  </span>
                  <span className="song-stats-child">
                    <span className="label-sm">{song_review_data.year}</span>
                  </span>
                  <span className="song-stats-child">
                    <span className="label-sm">★★★☆☆ 2½</span>
                  </span>
                </div>
              </div>
              <div id="song-description">
                <p>{song_review_data.review_text}</p>
              </div>
              <div className="review-likes">
                <Rating rating={song_review_data.rating} />
              </div>
            </section>
          </div> 
        </section>
    
        {/* Right column for "Saved In" and "Other Reviews" */}
        <section className="w-1/3 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <h3 className="mb-3">Saved In</h3>
              
            </div>
            <hr className="opacity-30"></hr>
            {saved_cards}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <h3 className="mb-3">Other Reviews</h3>
              
            </div>
            <hr className="opacity-30"></hr>
            {other_cards}
          </div>
        </section>
      </div>
    );
    
    
}