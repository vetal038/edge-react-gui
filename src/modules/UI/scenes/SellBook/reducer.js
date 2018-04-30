// @flow

import type { AbcTransaction } from 'edge-login'
import { combineReducers } from 'redux'

import type { Action } from '../../../ReduxTypes.js'
import * as ACTION from './action'

const barcode = (state = false, action: Action) => {
  switch (action.type) {
    case ACTION.UPDATE_BARCODE:
      return action.data
    default:
      return state
  }
}

const products = (state = [], action: Action) => {
  switch (action.type) {
    case ACTION.FETCHING_BY_BARCODE_SUCCESS:
      return action.data
    default:
      return state
  }
}

const productsError = (state = false, action: Action) => {
  switch (action.type) {
    case ACTION.FETCHING_BY_BARCODE_FAILED:
      return action.data
    default:
      return state
  }
}

const selectedProduct = (state = {}, action: Action) => {
  switch (action.type) {
    case ACTION.SELECT_PRODUCT_SUCCESS:
      return action.data
    default:
      return state
  }
}

const selectedProductError = (state = false, action: Action) => {
  switch (action.type) {
    case ACTION.SELECT_PRODUCT_FAILED:
      return action.data
    default:
      return state
  }
}

const selectedProductLoading = (state = false, action: Action) => {
  switch (action.type) {
    case ACTION.SELECT_PRODUCT_LOADING:
      return action.data
    default:
      return state
  }
}

const productsLoading = (state = false, action: Action) => {
  switch (action.type) {
    case ACTION.FETCHING_BY_BARCODE_LOADING:
      return action.data
    default:
      return state
  }
}

const quality = (state = false, action: Action) => {
  switch (action.type) {
    case ACTION.SET_QUALITY:
      return action.data
    default:
      return state
  }
}

const InitPersonalData = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
}

const personalData = (state = InitPersonalData, action: Action) => {
  switch (action.type) {
    case ACTION.SET_PERSONAL_DATA:
      return action.data
    default:
      return state
  }
}

const status = (state = 'Pending', action: Action) => {
  switch (action.type) {
    case ACTION.SET_STATUS:
      return action.data
    default:
      return state
  }
}

export const sellBook = combineReducers({
  barcode,
  products,
  productsError,
  productsLoading,
  selectedProduct,
  selectedProductError,
  selectedProductLoading,
  quality,
  personalData,
  status
})

export default sellBook
