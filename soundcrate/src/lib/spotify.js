import { Goudy_Bookletter_1911 } from 'next/font/google';

const axios = require('axios');
const request = require('request');

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
var auth_options = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

const authorize = async () => {

  // attempt to retrieve from session storage first
  var access_token = window.sessionStorage.getItem('spotify-access');

  // if none in storage, generate and save a new access token
  if ((!access_token) || access_token == null || access_token == undefined) {
    
    try {
      request.post(auth_options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          // set newly retrieved access token
          access_token = body.access_token;
          window.sessionStorage.setItem('spotify-access', access_token);
        } else {
          console.log(error);
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return access_token;
};

export const get_song = async (song_id) => {
  const access_token = await authorize();

  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${song_id}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch(error) {
    console.log(error);
  } 
};

export const get_songs = async (song_id_array) => {
  const access_token = await authorize();

  const song_ids = song_id_array.join('%2C'); // ex. 'songid1%2Csongid%2Csongid3'

  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks?ids=${song_ids}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch(error) {
    console.log(error);
  } 
};

export const get_album = async (album_id_array) => {
  const access_token = await authorize();

  const album_ids = album_id_array.join('%2C'); // ex. 'albumid1%2Calbumid%2Calbumid3'

  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums?ids=${album_ids}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch(error) {
    console.log(error);
  } 
};

