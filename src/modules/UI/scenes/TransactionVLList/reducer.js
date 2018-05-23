// @flow

import _ from 'lodash'
import type { Action } from '../../../ReduxTypes'
import * as ACTION from './action.js'

const initialState = {
  token: {},
  balance: 0,
  transactionList: [],
  firstTimeLoading: false,
  wallet: {
    dollars: 0,
    vaults: 0,
    limit: 0,
    active: false,
    transactions: [],
    upgrades: []
  }
}

export type State = {
  token: any,
  balance: number,
  transactionList: Array<any>,
  firstTimeLoading: boolean,
  wallet: any
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

    case ACTION.FETCH_WALLET: {
      const { wallet } = data
      return {
        ...state,
        wallet
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
        wallet: {
          ...state.wallet,
          transactions: (state.wallet.transactions || []).concat([transaction])
        }
      }
    }

    case ACTION.REPLACE_TRANSACTION: {
      const {transaction} = data
      const filteredTransaction = _.filter((state.wallet.transactions || []), tr => { return tr.status.toUpperCase() !== 'PENDING' })
      return {
        ...state,
        wallet: {
          ...state.wallet,
          transactions: filteredTransaction.concat([transaction]),
          dollars: (state.wallet.dollars || 0) + (transaction.strategy === 'DEPOSIT' ? transaction.dollars : -1 * transaction.dollars),
          vaults: (state.wallet.vaults || 0) + (transaction.strategy === 'DEPOSIT' ? transaction.vaults : -1 * transaction.vaults)
        }
      }
      // {
      //   ...state,
      //   transactionList: state.transactionList.concat([transaction])
      // }
    }

    case ACTION.ADD_UPGRADE: {
      const { upgrade } = data
      return {
        ...state,
        wallet: {
          ...state.wallet,
          upgrades: (state.wallet.upgrades || []).concat([upgrade])
        }
      }
    }

    case ACTION.REPLACE_UPGRADE: {
      const {upgrade} = data
      const filteredUpgrade = _.filter((state.wallet.upgrades || []), up => { return up.status.toUpperCase() !== 'PENDING' })
      return {
        ...state,
        wallet: {
          ...state.wallet,
          upgrades: filteredUpgrade.concat([upgrade]),
          limit: upgrade.new_state
        }
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
