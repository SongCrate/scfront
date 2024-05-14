import db from '/data/db.js';

const get_list_length = (list_id) => {
  // get number of songs given a list_id
  return db['list_song'].filter(record => {
    return record.list_id == list_id;
  }).length
}

const get_review_likes = (review_id) => {
  // get number of likes given a review_id
  return db['review_like'].filter(record => {
    return record.review_id == review_id;
  }).length
}

const get_user_id = (username) => {
  // get user_id given username
  return db['user'].find(record => {
      return (record.username === username);
  }).id
}

export {
  get_list_length,
  get_review_likes,
  get_user_id
};