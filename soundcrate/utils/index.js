const get_db = () => {
  const db = require('/data/db.json');
  return db;
}

const get_list_length = (list_id) => {
  // get number of songs given a list_id
  // const db = require('/data/db.json');
  const db = get_db();
  return db['list_song'].filter(record => {
    return record.list_id == list_id;
  }).length
}

const get_review_likes = (review_id) => {
  // get number of likes given a review_id
  const db = get_db();
  return db['review_like'].filter(record => {
    return record.review_id == review_id;
  }).length
}

const get_user_id = (username) => {
  // get user_id given username
  const db = get_db();
  return db['user'].find(record => {
      return (record.username === username);
  }).id
}

export {
  get_db,
  get_list_length,
  get_review_likes,
  get_user_id
};