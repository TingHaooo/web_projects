import { combineReducers } from 'redux'
import commentReducer from './commentReducer'
import authReducer from './authReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const RootReducer = combineReducers({
  auth: authReducer,
  comment: commentReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default RootReducer
