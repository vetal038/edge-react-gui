import { AsyncStorage, Alert } from 'react-native'
import type { AbcLobby } from 'edge-login'
import { Actions } from 'react-native-router-flux'

import * as Constants from '../constants/indexConstants'
import req from '../http/user'
import * as CORE_SELECTORS from '../modules/Core/selectors'
import s from '../locales/strings.js'
// @flow
import * as actions from './indexActions'

export function storeLobby (type: string, data: AbcLobby) {
  return {
    type,
    data
  }
}

export const loginWithEdge = (url: string) => async (dispatch: any, getState: any) => {
  const splitArray = url.split('edge/')
  const state = getState()
  const account = state.core.account
  const lobby: AbcLobby = await account.fetchLobby(splitArray[1]).catch(e => {
    dispatch(actions.dispatchActionString(Constants.SET_LOBBY_ERROR, e.message))
  })
  if (lobby) {
    dispatch(storeLobby(Constants.SAVE_ABC_LOBBY, lobby))
  }
}

export const lobbyLogin = () => async (dispatch: any, getState: any) => {
  const state = getState()
  dispatch(actions.dispatchAction(Constants.PROCESS_ABC_LOGIN))
  await state.core.edgeLogin.lobby.loginRequest.approve()
  dispatch(actions.dispatchAction(Constants.INVALIDATE_ABC_LOBBY))
  Actions.pop()
  Actions.transactionListScene()

  // let pushNotificationToken = await AsyncStorage.getItem('push_notification_token')
  // if (pushNotificationToken) {
  //   console.log('push_notification_token', pushNotificationToken)
  //   pushNotificationToken = JSON.parse(pushNotificationToken)
  //   const username = CORE_SELECTORS.getUsername(state)
  //   req.updatePushNotificationToken(pushNotificationToken, username)
  // }
}

export const vCashLogin = () => async (dispatch: any, getState: any) => {
  const state = getState()
  console.log('vCashLogin', state)
  const qrcode = state.ui.scenes.sendConfirmation.qrcode
  const ATMLogin = await req.ATMLogin(qrcode)
  console.log('ATMLogin', ATMLogin)
  Actions.pop()
  if (ATMLogin.error) {
    Alert.alert(s.strings.fragment_error, ATMLogin.message.toString(), [
      { text: s.strings.string_ok }
    ])
  } else {
    Actions.transactionListScene()
  }

  let pushNotificationToken = await AsyncStorage.getItem('push_notification_token')
  if (pushNotificationToken) {
    console.log('push_notification_token', pushNotificationToken)
    pushNotificationToken = JSON.parse(pushNotificationToken)
    req.updatePushNotificationToken(pushNotificationToken, 'PUT')
  }
}
