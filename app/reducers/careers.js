import {
  REQUEST_CAREERS, RECEIVE_CAREERS
} from '../actions/apiActions';

export default function careers(state = { }, action) {
  var newState;

  switch(action.type) {
    case REQUEST_CAREERS:
      newState = {};
      newState[action.interests.join(',')] = {
        isFetching: true
      };
      return Object.assign({}, state, newState);

    case RECEIVE_CAREERS:
      newState = {};
      newState[action.interests.join(',')] = {
        isFetching: false,
        list: action.careers
      };
      return Object.assign({}, state, newState);

    default:
      return state;
  }
}
