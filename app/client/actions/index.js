import axios from 'axios';

export const FETCH_TWEETS = 'FETCH_TWEETS';
export const ADD_TWEET = 'ADD_TWEET';
export const UPDATE_TERM = 'UPDATE_TERM';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

const ROOT_URL = 'http://localhost:3000';

export function fetchTweets(term, location) {
  const {latitude, longitude} = location;
  const request = axios.get(`${ROOT_URL}/tweets?term=${term}&lat=${latitude}&lng=${longitude}`);

  return {
    type: FETCH_TWEETS,
    payload: request
  };
}

export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    payload: tweet
  };
}

export function updateTerm(term) {
  return {
    type: UPDATE_TERM,
    payload: term
  };
}

export function updateLocation(location) {
  return {
    type: UPDATE_LOCATION,
    payload: location
  };
};
