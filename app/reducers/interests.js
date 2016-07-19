import {
  REQUEST_INTERESTS, RECEIVE_INTERESTS
} from '../actions/apiActions';

export default function interests(state = { }, action) {
  switch(action.type) {
    case REQUEST_INTERESTS:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_INTERESTS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.interests
      });

    default:
      return state;
  }
}
