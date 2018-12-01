import { SELECT_SORT } from './types'

export const selectSort = sortMethod => dispatch => {
  return dispatch({type: SELECT_SORT, payload: sortMethod});
}
