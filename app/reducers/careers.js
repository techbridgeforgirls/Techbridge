import {
  REQUEST_CAREERS, RECEIVE_CAREERS
} from '../actions/apiActions';

export default function careers(state = { }, action) {
  switch(action.type) {
    case REQUEST_CAREERS:
      return Object.assign({}, state, {
        isFetching: true,
        data: undefined
      });

    case RECEIVE_CAREERS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });

    default:
      return state;
  }
}
