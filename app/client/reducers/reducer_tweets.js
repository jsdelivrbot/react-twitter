import _ from 'lodash';
import update from 'react-addons-update';
import { FETCH_TWEETS, ADD_TWEET } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TWEETS:
      return _.mapKeys(action.payload.data.statuses, 'id');
    case ADD_TWEET:
      const isPresent = _.find(state, { id: action.payload.id });
      if (isPresent) {
        return state;
      } else {
        const newTweet = [action.payload];
        return update(state, {$unshift: newTweet});
      }
    default:
      return state;
  }
}
