import {
  REQUEST_CAREER_DATA, RECEIVE_CAREER_DATA
} from '../actions/apiActions';

export default function careers(state = { }, action) {
  switch(action.type) {
    case REQUEST_CAREER_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_CAREER_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });

    default:
      return state;
  }
}
