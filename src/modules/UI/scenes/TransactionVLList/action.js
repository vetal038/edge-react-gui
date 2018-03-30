// @flow

import type { Dispatch, GetState } from '../../../ReduxTypes'

export const ADD_TOKEN = 'ADD_TOKEN'
export const CHANGE_BALANCE = 'CHANGE_BALANCE'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const GET_TRANSACTION = 'GET_TRANSACTION'
export const FIRST_TIME_LOADING = 'FIRST_TIME_LOADING'

// $FlowFixMe
export function addToken (data) {
  return {
    type: ADD_TOKEN,
    data
  }
}

// $FlowFixMe
export function changeBalance (data) {
  return {
    type: CHANGE_BALANCE,
    data
  }
}

// $FlowFixMe
export function addTransaction (data) {
  return {
    type: ADD_TRANSACTION,
    data
  }
}

// $FlowFixMe
export function getTransaction (data) {
  return {
    type: GET_TRANSACTION,
    data
  }
}

// $FlowFixMe
export function firstTimeLoading () {
  return {
    type: FIRST_TIME_LOADING
  }
}
