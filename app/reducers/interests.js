import {
  REQUEST_INTERESTS, RECEIVE_INTERESTS, SELECT_INTERESTS, DESELECT_INTERESTS
} from '../actions/apiActions';

export default function interests(state = { }, action) {
  var newSelected;

  switch(action.type) {
    case REQUEST_INTERESTS:
      return Object.assign({}, state, {
        isFetching: true,
        data: undefined,
        selected: undefined
      });

    case RECEIVE_INTERESTS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        selected: undefined
      });

    case SELECT_INTERESTS:
      newSelected = [];
      newSelected = newSelected.concat(state.selected || []);
      action.ids.forEach(function (id) {
        if (newSelected.indexOf(id) === -1) {
          newSelected.push(id);
        }
      });
      return Object.assign({}, state, {
        selected: newSelected
      });

    case DESELECT_INTERESTS:
      var oldSelected = state.selected || [];
      newSelected = [];
      oldSelected.forEach(function (id) {
        if (action.ids.indexOf(id) === -1) {
          newSelected.push(id);
        }
      });
      return Object.assign({}, state, {
        selected: newSelected
      });


    default:
      return state;
  }
}
