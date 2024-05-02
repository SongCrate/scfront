import {
  AlbumCard,
  CreateListModal,
  ListCard,
  SongReviewCard,
} from "@/components";;

export default function UserProfilePage({ params }) {
  const { username } = params;

  // mock data
  const review_data = [
    {
      username: "janedoe",
      song_id: 1,
      album_img: null,
      song_name: "Petal",
      artist_name: "Raveena",
      rating: 4,
      review_text: "best song from the album imo!",
      like_count: 12,
    },
    {
      username: "janedoe",
      song_id: 2,
      album_img: null,
      song_name: "Hypnosis",
      artist_name: "Raveena",
      rating: 2,
      review_text: "disappointing! definitely not her best work :((",
      like_count: 1,
    },  
  ]

  const album_data = [
    {
      album_id: 1,
      album_img: null,
      album_name: "The Rise and Fall of a Midwest Princess",
      year: 2022,
      artist_name: "Chappell Roan",
    },
    {
      album_id: 2,
      album_img: null,
      album_name: "Lucid",
      year: 2020,
      artist_name: "Raveena",
    },
    {
      album_id: 3,
      album_img: null,
      album_name: "Call For Help",
      year: 2020,
      artist_name: "Pearly Drops",
    },
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

  const review_cards = review_data.map((review, i) =>
    <SongReviewCard 
      key={`review-card-${i}`} 
      review_data={review} />
  )

  const album_cards = album_data.map((album, i) =>
    <AlbumCard 
      key={`album-card-${i}`} 
      album_data={album} />
  )

  const list_cards = list_data.map((list, i) => 
    <div key={`list-card-${i}`}>
      <ListCard 
        list_data={list} />
      <hr className="opacity-30"></hr>
    </div >
  )

  return (
    <div className="flex flex-wrap md:flex-nowrap w-full gap-6">
      <div className="flex flex-col grow shrink gap-6 w-2/3">
        <section className="flex flex-col gap-3">
          <h3>Reviews</h3>
          {review_cards}
        </section>
        <section>
          <h3 className="mb-3">Albums</h3>
          <div className="gap-3 grid grid-cols-4">
            {album_cards}
          </div>
        </section>
      </div>
      <section className="flex flex-col grow shrink min-w-52 w-1/3">
        <div className="flex justify-between items-baseline">
          <h3 className="mb-3">Lists</h3>
          <CreateListModal />
        </div>
        <hr className="opacity-30"></hr>
        {list_cards}
      </section>
    </div>
  );
}