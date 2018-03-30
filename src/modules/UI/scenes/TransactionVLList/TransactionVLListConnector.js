// @flow

import _ from 'lodash'
import { connect } from 'react-redux'

import * as CORE_SELECTORS from '../../../Core/selectors.js'
import type { Dispatch, State } from '../../../ReduxTypes'
import { addToken, changeBalance, getTransaction, firstTimeLoading } from './action'
import req from './http/user'
import TransactionVLList from './TransactionVLList.ui'

const mapStateToProps = (state: State, ownProps) => {
  const currentUsername = CORE_SELECTORS.getUsername(state)
  const reducer = state.ui.scenes.transactionsVLList

  return {
    isDevMode: state.core.context.isDevMode,
    firstTimeLoading: reducer.firstTimeLoading,
    balance: reducer.balance,
    token: reducer.token,
    transactionList: (reducer && reducer.transactionList) ? reducer.transactionList.sort(function (a, b) { return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0) }).reverse() : [],
    currentUsername: currentUsername,
    getToken: (username) => req.getToken(username),
    getTransactions: (token) => req.getTransactions(token),
    getBalance: (token) => req.getBalance(token)
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({
  addToken: token => dispatch(addToken(token)),
  changeBalance: balance => dispatch(changeBalance(balance)),
  getTransaction: transactionList => dispatch(getTransaction(transactionList)),
  setFirstTimeLoading: () => dispatch(firstTimeLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionVLList)
