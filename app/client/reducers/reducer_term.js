import { UPDATE_TERM } from '../actions';

const initialState = {
  value: 'javascript'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TERM:
      return Object.assign({}, state, {
        value: action.payload
      });
    default:
      return state;
  }
}
