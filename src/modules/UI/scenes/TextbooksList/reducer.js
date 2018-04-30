// @flow

import type { AbcTransaction } from 'edge-login'
import { combineReducers } from 'redux'

import type { Action } from '../../../ReduxTypes.js'
import * as ACTION from './action'

const initialState = {
  list: [],
}

export type State = {
  list: Array<any>,
}

// const fetchTextbooks = (state: State = initialState, action: Action) => {
//   const { type, data = {} } = action
//
//   switch (type) {
//     case ACTION.FETCH_TEXTBOOKS:
//       const { list } = data
//       return {
//         ...state,
//         list
//       }
//     default:
//       return state
//   }
// }

const fetchTextbooks = (state = [], action: Action) => {
  switch (action.type) {
    case ACTION.FETCH_TEXTBOOKS:
      return action.data
    default:
      return state
  }
}

const fetchTextbooksError = (state = false, action: Action) => {
  switch (action.type) {
    case ACTION.FETCH_TEXTBOOKS_FAILED:
      return action.data
    default:
      return state
  }
}

const fetchTextbooksLoading = (state = false, action: Action) => {
  switch (action.type) {
    case ACTION.FETCH_TEXTBOOKS_LOADING:
      return action.data
    default:
      return state
  }
}

export const textBooks = combineReducers({
  fetchTextbooks,
  fetchTextbooksError,
  fetchTextbooksLoading
})

export default textBooks
