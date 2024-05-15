const get_db = () => {
  const db = require('/data/db.json');
  return db;
}

const get_list_length = (list_id) => {
  // get number of songs given a list_id
  const db = get_db();
  return db['list_song'].filter(record => {
    return record.list_id === list_id;
  }).length
}

const get_review_likes = (review_id) => {
  // get number of likes given a review_id
  const db = get_db();
  return db['review_like'].filter(record => {
    return record.review_id === review_id;
  }).length
}

const get_user_id = (username) => {
  // get user_id given username
  const db = get_db();
  return db['user'].find(record => {
      return record.username === username;
  }).id
}

const get_reviews = (username) => {
  // get all reviews given username
  const db = get_db();
  const user_id = get_user_id(username);
  return db['review'].filter(record => {
    return record.user_id === user_id;
  })
}

const get_album_ids = (username) => {
  // get all album_ids from the reviews of a user given username
  var reviews = get_reviews(username);
  var album_ids = reviews.map((review) => (
    review['album_id']
  ))

  // only return one of each album_ids
  return album_ids.filter((item, i, arr) => arr.indexOf(item) === i);
}

const get_lists = (username) => {
  const db = get_db();
  const user_id = get_user_id(username);
  return db['list'].filter(record => {
    return record['user_id'] == user_id;
  })
}

export {
  get_db,
  get_list_length,
  get_review_likes,
  get_user_id,
  get_reviews,
  get_album_ids,
  get_lists,
};