import { SELECT_SORT } from '../actions/types';

const initState = {
  item: 'l-h'
};

const sortReducer = (state = initState, action) => {
  switch(action.type) {
    case SELECT_SORT:
    console.log(action.payload);
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
};

export default sortReducer;
