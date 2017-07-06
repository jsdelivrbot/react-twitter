import { UPDATE_LOCATION } from '../actions';

const initialState = {
  location: {
    latitude: '51.509865',
    longitude: '-0.118092'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      const newState = Object.assign({}, state, {
        location: action.payload
      });

      return newState;
    default:
      return state;
  }
}
