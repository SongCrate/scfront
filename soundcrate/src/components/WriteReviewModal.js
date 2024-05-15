'use client';
import { get_db } from '/utils';
import { useState } from 'react';
import { 
  Star,
  X 
} from '@phosphor-icons/react';

export default function WriteReviewModal(
  song_id,
  album_id,
  album_art
) {

  // mock data, would be grabbing this from header
  const user_id = 1;

  const modal_id = "write-review-modal-id";
  const [ rating, setRating ] = useState(null);
  const [ reviewText, setReviewText ] = useState("");
  const review_text_char_limit = 1000;

  const db = get_db();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // create new database object
    const last_id = db['review'].slice(-1)[0].id
    var new_db = db
    new_db['review'][last_id] = {
      "id": last_id + 1,
      "user_id": user_id,
      "song_id": song_id,
      "album_id": album_id,
      "rating": rating,
      "review_text": reviewText.trim()
    }

    try {
      console.log(new_db);
      const response = await fetch('/api/update_db', {
        method: 'POST',
        body: JSON.stringify(new_db)
      });

      const response_data = await response.json();

      if (response.status === 200) {
        console.log('success');
      } else {
        console.log(response.status)
      }
    } catch (error) {
      console.log(error);
    }

  }

  const renderForm = () => {
    return (
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

        {/* list description */}
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
          <button type="button" className="btn hs-dropup-toggle gap-x-2 text-sm font-medium rounded-md text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay={"#write-review-modal-id"}>
            Cancel
          </button>
          <button 
            type="submit"
            disabled={rating}
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
      <button type="button" className="btn p-2 bg-accent text-white text-lg font-sembold rounded-md hover:bg-blue p-3" data-hs-overlay={"#"+modal_id}>
        <Star size={24} weight="fill" className="mr-2" /> Rate / Review
      </button>

      <div id="write-review-modal-id" className="hs-overlay hs-overlay-backdrop-open:bg-dark-dark/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        {/* hs overlay */}
        <div className="opacity-100 transition-all hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          {/* modal box */}
          <div className="bg-dark-light flex flex-col shadow-sm rounded-lg pointer-events-auto">
            
            {/* header and close button */}
            <div className="flex justify-between items-center py-3 px-4">
              <h3 className="font-bold">Rate / Review</h3>
              <button type="button" className="btn-round hs-dropup-toggle flex text-gray hover:bg-dark hover:bg-opacity-40" data-hs-overlay="#write-review-modal-id">
                <span className="sr-only">Close</span>
                <X size={18} />
              </button>
            </div>

            {/* modal body */}
            <div className="px-4 py-1">
              {renderForm()}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
