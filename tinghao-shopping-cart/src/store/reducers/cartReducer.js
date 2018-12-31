import { ADD_TO_CART, DEL_FROM_CART, CHECKOUT } from '../actions/types';

const initState = {
  items: [],
  quantity: {}
};

const cartReducer = (state = initState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      // create productIdArray
      var productIdArray = [];
      state.items.forEach((product)=> productIdArray.push(product._id));
      return productIdArray.includes(action.payload._id) ?
        // item exist
        {
          ...state,
          quantity: {
            ...state.quantity,
            [action.payload._id]: state.quantity[action.payload._id] + 1
          }
        }
        :
        // if item doesn't exist
        {
          ...state,
          items: [...state.items, action.payload],
          quantity: {
            ...state.quantity,
            [action.payload._id]: 1
          }
        }

    case DEL_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          product => product._id !== action.payload
        ),
        quantity: {
          ...state.quantity,
          [action.payload._id]: 0
        }
      }

    case CHECKOUT:
      return state

    default:
      return state;
  }
};

export default cartReducer;
