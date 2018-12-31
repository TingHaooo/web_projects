import axios from 'axios'
import { FETCH_PRODUCT } from './types'

const PRODUCTAPI = '/api/product'

export const fetchProductAction = (callback) => dispatch => {
  axios.get(PRODUCTAPI)
    .then(res => {
      let products = res.data;
      callback();
      return dispatch({type: FETCH_PRODUCT, payload: products})
    })
}
