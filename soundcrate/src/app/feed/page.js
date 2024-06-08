'use client';

import { get_songs } from '@/lib/spotify';
import { SongReviewCard } from '@/components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Feed() {
  const [ songData, setSongData ] = useState([]);
  const [ reviews, setReviews ] = useState();
  const router = useRouter();

  useEffect(() => {
    // get song data from spotify api for review cards
    const get_song_data = async () => {
      if (reviews) {
        const song_ids = reviews.map((review) => {
          return review.songId;
        })
        if (song_ids.length) {
          const response = await get_songs(song_ids);
          setSongData(response?.tracks);
        }
      }
    };
    
    get_song_data();
  }, [reviews]);

  // fetch all reviews for this songId
  useEffect(() => {
    async function fetchFeedReviews() {
      try {
        const response = await fetch(
          `/api/review/getFollowingReviews`, 
          { method: 'GET' }
        );
    
        const responseData = await response.json();
        if (responseData?.body) {
          setReviews(responseData.body);
        } if (responseData?.status == 401) {
          // redirect to home page if user is not authenticated
          router.push('/');
        } else {
          throw responseData.error;
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchFeedReviews();
  }, []);

  const render_review_cards = (review_array) => {
    return (review_array && review_array.map((review) => {
      const song_obj = songData?.find((song) => song.id === review.songId);
      return (
        <div key={`social-review-card-${review._id}`} className="w-full flex flex-row gap-4">
          {/* profile image */}
          <Link href={`/user/${review.user.username}/profile`} className="grow-0">
            <div class="col-start-2 text-center">
                <div class="hs-tooltip [--placement:bottom] inline-block">
                  <button type="button" class="hs-tooltip-toggle inline-flex justify-center items-center gap-2 rounded-full">
                    <img
                      src={review.user.imageUrl ?? "/images/default-user.png"} 
                      alt={review.user.username}
                      className="rounded-md object-cover w-[45px] h-[45px]"
                      onError={e => {
                        e.currentTarget.src = "/images/default-user.png"
                      }}
                    />
                    <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-1.5 bg-accent bg-opacity-90 text-xs font-medium text-white rounded">
                      {review.user.username}
                    </span>
                  </button>
                </div>
              </div>
          </Link>

          <div className="flex-1">
            <SongReviewCard
              username={review.user.username}
              review_id={review._id}
              song_id={review.songId}
              rating={review.rating}
              review_text={review.text}
              song_name={song_obj?.name}
              song_artist={song_obj?.artists[0]?.name}
              image={song_obj?.album?.images[1]?.url}
              detail_type={'album'}
              likes={review.likes}
              />
              <p className="opacity-60 uppercase text-xs tracking-wider font-medium mt-2">
                {new Date(review.createdAt).toLocaleDateString(
                  'en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  }
                )}
              </p>
            </div>
          </div>
      )}
    ))
  }

  if (reviews?.length == 0)
    return (
      <div className="box-container content-center text-opacity-80 px-12 py-16">
        <p className="text-center opacity-70 text-pretty">Nothing to see here. Follow more people to see what they have to say!</p>
      </div>
    )
    
  return (
    <main className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-6 w-full items-center">
        {render_review_cards(reviews)}
      </div>
      {reviews?.length > 0 && <p className="opacity-40">You've reached the end!</p>}
    </main>
  );
}