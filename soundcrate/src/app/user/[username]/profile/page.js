import {
  AlbumCard,
  ListCard,
  SongReviewCard,
} from "@/components";
import { List } from "@phosphor-icons/react/dist/ssr";
import { list } from "postcss";

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
      album_id: 123,
      album_img: null,
      album_name: "Lucid",
      year: 2020,
      artist_name: "Raveena",
    },
    {
      album_id: 123,
      album_img: null,
      album_name: "Lucid",
      year: 2020,
      artist_name: "Raveena",
    },
    {
      album_id: 123,
      album_img: null,
      album_name: "Lucid",
      year: 2020,
      artist_name: "Raveena",
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
    <SongReviewCard key={i} review_data={review} />
  )

  const album_cards = album_data.map((album, i) =>
    <AlbumCard key={i} album_data={album} />
  )

  const list_cards = list_data.map((list, i) => 
    <>
      <ListCard key={i} list_data={list} />
      <hr className="opacity-30"></hr>
    </>
  )

  return (
    <div className="flex flex-wrap w-full gap-6">
      <div className="flex flex-col grow gap-6">
        <section className="flex flex-col gap-3">
          <h3>Reviews</h3>
          {review_cards}
        </section>
        <section>
          <h3 className="mb-3">Albums</h3>
          <div className="flex flex-row flex-wrap gap-3">
            {album_cards}
          </div>
        </section>
      </div>
      <section className="flex flex-col grow">
        <h3 className="mb-3">Lists</h3>
          <hr className="opacity-30"></hr>
          {list_cards}
      </section>
    </div>
  );
}