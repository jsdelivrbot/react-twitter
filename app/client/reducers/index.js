import { combineReducers } from 'redux';
import TweetsReducer from './reducer_tweets';
import TermReducer from './reducer_term';
import LocationReducer from './reducer_location';

const rootReducer = combineReducers({
  tweets: TweetsReducer,
  term: TermReducer,
  location: LocationReducer
});

export default rootReducer;
