// @flow

import type { Action } from '../../../ReduxTypes'
import * as ACTION from './action.js'

const initialState = {
  token: {},
  balance: 0,
  transactionList: [],
  firstTimeLoading: false
}

export type State = {
  token: any,
  balance: number,
  transactionList: Array<any>,
  firstTimeLoading: boolean
}

export const transactionsVLList = (state: State = initialState, action: Action) => {
  const { type, data = {} } = action

  switch (type) {
    case ACTION.ADD_TOKEN: {
      const { token } = data
      return {
        ...state,
        token
      }
    }

    case ACTION.CHANGE_BALANCE: {
      const { balance } = data
      return {
        ...state,
        balance
      }
    }

    case ACTION.ADD_TRANSACTION: {
      const { transaction } = data
      return {
        ...state,
        transactionList: state.transactionList.concat([transaction])
      }
    }

    case ACTION.GET_TRANSACTION: {
      const { transactionList } = data
      return {
        ...state,
        transactionList
      }
    }

    case ACTION.FIRST_TIME_LOADING: {
      return {
        ...state,
        firstTimeLoading: true
      }
    }

    default:
      return state
  }
}

export default transactionsVLList
