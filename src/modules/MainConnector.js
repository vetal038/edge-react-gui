// @flow

import { connect } from 'react-redux'

import * as actions from '../actions/indexActions'
import { requestPermission } from '../reducers/permissions/actions.js'
import { requestATMList } from '../modules/UI/scenes/KiosksLocation/action'
import { addContext, addUsernames } from './Core/Context/action.js'
import makeContextCallbacks from './Core/Context/callbacks'
import Main from './Main.ui'
import type { Dispatch } from './ReduxTypes'
import { setKeyboardHeight } from './UI/dimensions/action'
import { disableScan, enableScan } from './UI/scenes/Scan/action'
import { addCurrencyPlugin } from './UI/Settings/action'
import { fetchWalletDispatcher } from './UI/scenes/TransactionVLList/action'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestATMList: username => {
    return dispatch(requestATMList(username))
  },
  requestPermission: permission => {
    return dispatch(requestPermission(permission))
  },
  dispatchEnableScan: () => {
    return dispatch(enableScan())
  },
  dispatchDisableScan: () => {
    return dispatch(disableScan())
  },
  addCurrencyPlugin: plugin => {
    return dispatch(addCurrencyPlugin(plugin))
  },
  setKeyboardHeight: keyboardHeight => {
    return dispatch(setKeyboardHeight(keyboardHeight))
  },
  addContext: context => {
    return dispatch(addContext(context))
  },
  addUsernames: usernames => {
    return dispatch(addUsernames(usernames))
  },
  dispatchFetchWallet: () => {
    return dispatch(fetchWalletDispatcher())
  },
  // commented out since it was blowing up flow && doesnt seem to be called.. TODO remove
  /* setLocaleInfo: (localeInfo) => {
    return dispatch(setLocaleInfo(localeInfo))
  }, */
  urlReceived: backupKey => {
    return dispatch(actions.deepLinkLogout(backupKey))
  },
  contextCallbacks: makeContextCallbacks(dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Main)
