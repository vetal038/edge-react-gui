// @flow

import _ from 'lodash'
import { connect } from 'react-redux'

import * as CORE_SELECTORS from '../../../Core/selectors.js'
import type { Dispatch, State } from '../../../ReduxTypes'
import { addToken, changeBalance, getTransaction, firstTimeLoading, fetchWallet } from './action'
import req from '../../../../http/user'
import TransactionVLList from './TransactionVLList.ui'

const mapStateToProps = (state: State, ownProps) => {
  const currentUsername = CORE_SELECTORS.getUsername(state)
  const reducer = state.ui.scenes.transactionsVLList
  const list = (reducer.wallet.transactions || []).concat(reducer.wallet.upgrades || [])

  return {
    isDevMode: state.core.context.isDevMode,
    firstTimeLoading: reducer.firstTimeLoading,
    balance: reducer.balance,
    token: reducer.token,
    wallet: reducer.wallet,
    //transactionList: (list) ? list.sort(function (a, b) { return (+(new Date(a.created_date + ' ' + a.created_time)) > +(new Date(b.created_date + ' ' + b.created_time))) ? 1 : ((+(new Date(b.created_date + ' ' + b.created_time)) > +(new Date(a.created_date + ' ' + a.created_time))) ? -1 : 0) }).reverse() : [],
    transactionList: (list) ? _.sortBy(list, ['created_date', 'created_time']).reverse() : [],
    currentUsername: currentUsername,
    getToken: (username) => req.getToken(username),
    getTransactions: (token) => req.getTransactions(token),
    getWallet: (token) => req.getWallet(token)
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({
  addToken: token => dispatch(addToken(token)),
  changeBalance: balance => dispatch(changeBalance(balance)),
  fetchWallet: walletInfo => dispatch(fetchWallet(walletInfo)),
  getTransaction: transactionList => dispatch(getTransaction(transactionList)),
  setFirstTimeLoading: () => dispatch(firstTimeLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionVLList)
