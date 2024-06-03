'use client';
import { get_db } from '/utils';
import { Fragment, useState } from 'react';
import {
  Star,
  X
} from '@phosphor-icons/react';

export default function WriteReviewModal({
  song_id,
  album_id,
  song_name,
  artist,
  album_name,
  album_art,
  year
}) {

  // mock data, would be grabbing this from header
  const user_id = '664690bb36aa3aa3e8c8d240';

  const modal_id = "write-review-modal-id";
  const [ rating, setRating ] = useState(null);
  const [ reviewText, setReviewText ] = useState("");
  const review_text_char_limit = 1000;

  // const db = get_db();

  const handleCancel = () => {
    // deselect all ratings
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].type == "radio") {
          elements[i].checked = false;
      }
    }
    setRating(0);
    setReviewText("");
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    //
    // // create new database object
    // const last_id = db['review'].slice(-1)[0].id
    // var new_db = db
    // new_db['review'][last_id] = {
    //   "id": last_id + 1,
    //   "user_id": user_id,
    //   "song_id": song_id,
    //   "album_id": album_id,
    //   "rating": rating,
    //   "review_text": reviewText.trim()
      async function postReview(new_review) {
        try {
          const response = await fetch('/api/review/postReview', {
            method: 'POST',
            body: JSON.stringify(new_review)
          });

          const response_data = await response.json();
          if (response_data?.status == 200) {
            console.log(response_data.body)
          } else {
            console.log(response_data.error)
          }

        } catch (error) {
          console.log(error);
        }
      }

      // try {
      //   const response = await fetch('/api/update_db', {
      //     method: 'POST',
      //     body: JSON.stringify(new_db)
      //   });
      //
      //   const response_data = await response.json();
        e.preventDefault();

  //       if (response.status === 200) {
  //     console.log('success');
  //   } else {
  //     console.log(response.status)
  //   }
  // } catch (error) {
  //     console.log(error);
      // create body to send to api
      const new_review = {
        user_id,
        song_id,
        album_id,
        rating: rating,
        review_text: reviewText,
      }

      postReview(new_review)

      // close modal
      const close_btn = document.getElementById("write-review-modal-close-btn");
      close_btn.click();

      // clear modal inputs
      handleCancel();
    }

  const render_header = () => {
    return (
        <section className="flex flex-row gap-4 items-end">
          {/* album art */}
          <img
              src={album_art ?? "/images/default-user.png"}
              alt={`${song_name} by ${artist}`}
              className="rounded-md w-[60px] h-[60px]"
              onError={e => {
                e.currentTarget.src = "/images/default-user.png"
              }}
          />
          {/* song details */}
          <div className="flex flex-col">
            <h1>{song_name}</h1>
            <p className="text-med opacity-70 text-sm">
              <span>{artist}</span>
              <span className="mx-1">∙</span>
              <span>{album_name} ({year})</span>
            </p>
          </div>
        </section>
    )
  }
  const renderForm = () => {
    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          {/* star rating */}
          <div className="flex flex-row-reverse justify-end items-center">
            {[1, 2, 3, 4, 5].map((num) =>
                <Fragment key={`star-rating-${num}`}>
                  <input
                      id={`star-rating-${num}`}
                      type="radio"
                      name="hs-rating"
                      value={num}
                      onChange={e => setRating(5 - e.target.value + 1)}
                      className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                  />
                  <label htmlFor={`star-rating-${num}`} className="text-gray pointer-events-none peer-checked:text-accent">
                    <Star size={32} weight="fill" />
                  </label>
                </Fragment>
            )
            }
          </div>
          {/* review */}
          <div className="w-full">
            <div className="flex justify-between items-center">
              <label htmlFor="list-desc-textarea" className="block text-sm font-medium mb-1 text-light">
                Review <span className="opacity-60">(Optional)</span>
              </label>
              <span className={`block mb-2 text-sm opacity-60" ${reviewText.trim().length < review_text_char_limit - 25 ? 'invisible' : 'visible'}`}>
              {reviewText.trim().length} / {review_text_char_limit}
            </span>
            </div>
            <textarea
                id="list-desc-textarea"
                className="py-2 px-3 block w-full bg-gray-dark rounded-md text-sm focus:border-gray focus:ring-gray disabled:opacity-50 disabled:pointer-events-none"
                rows="5"
                maxLength={review_text_char_limit}
                value={reviewText}
                placeholder={"Let everyone know your thoughts!"}
                onChange={(e) => { setReviewText(e.target.value) }}
            >
          </textarea>
          </div>
          {/* cancel and action buttons */}
          <div className="flex justify-end items-center gap-x-2 p-3">
            <button
                type="button"
                onClick={handleCancel}
                className="btn hs-dropup-toggle gap-x-2 text-sm font-medium rounded-md text-gray hover:bg-dark hover:bg-opacity-40"
                data-hs-overlay={"#write-review-modal-id"}>
              Cancel
            </button>
            <button
                type="submit"
                disabled={rating == null || rating == 0}
                onClick={handleSubmit}
                className="btn gap-x-2 text-sm rounded-md bg-blue hover:bg-opacity-80 text-light disabled:opacity-50"
            >
              Publish
            </button>
          </div>
        </form>
    )
  }
  return (
      <>
        <button type="button" className="btn bg-accent text-white text-lg font-sembold rounded-md hover:bg-blue p-3 w-full" data-hs-overlay={"#"+modal_id}>
          <Star size={18} weight="fill" className="mr-2" /> Rate / Review
        </button>
        <div id="write-review-modal-id" className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
          {/* hs overlay */}
          <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            {/* modal box */}
            <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">

              {/* header and close button */}
              <div className="flex justify-between items-center py-3 px-4">
                <h3 className="font-bold">Rate / Review</h3>
                <button type="button" id="write-review-modal-close-btn" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay="#write-review-modal-id">
                  <span className="sr-only">Close</span>
                  <X size={18} />
                </button>
              </div>
              {/* modal body */}
              <div className="flex flex-col gap-3 px-4 py-1">
                {render_header()}
                <hr className="opacity-10" />
                {renderForm()}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}