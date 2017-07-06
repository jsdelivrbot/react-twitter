import _ from 'lodash';
import { FETCH_TWEETS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TWEETS:
      return _.mapKeys(action.payload.data.statuses, 'id');
    default:
      return state;
  }
}
