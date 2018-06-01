// @flow
import { AsyncStorage } from 'react-native'
import * as Constants from '../../../../constants/indexConstants'
import req from '../../../../http/user'
import type { Dispatch, GetState } from '../../../ReduxTypes'

export const ADD_TOKEN = 'ADD_TOKEN'
export const FETCH_WALLET = 'FETCH_WALLET'
export const CHANGE_BALANCE = 'CHANGE_BALANCE'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const REPLACE_TRANSACTION = 'REPLACE_TRANSACTION'
export const ADD_UPGRADE = 'ADD_UPGRADE'
export const REPLACE_UPGRADE = 'REPLACE_UPGRADE'
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
export const fetchWalletDispatcher = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('vc_token')
    if (!token) {
      const vcToken = await req.getToken()
      if (vcToken && vcToken.access_token) {
        await AsyncStorage.setItem('vc_token', vcToken.access_token)
        token = vcToken.access_token
      }
    }

    const url = await Constants.baseUrl()
    return fetch(url + '/api/purchase/wallet', {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + token
      }
    })
      .then((response) => {
        console.log('TODO: change API')
        console.log('getWallet token', token)
        return response.json()
      })
      .then((wallet) => {
        dispatch(firstTimeLoading())
        console.log('getWallet responseJson', wallet)
        if (wallet && !wallet.error) {
          dispatch(fetchWallet({ wallet }))
        }
        //return responseJson
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }
}

// $FlowFixMe
export function fetchWallet (data) {
  return {
    type: FETCH_WALLET,
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
export function replaceTransaction (data) {
  return {
    type: REPLACE_TRANSACTION,
    data
  }
}

// $FlowFixMe
export function addUpgrade (data) {
  return {
    type: ADD_UPGRADE,
    data
  }
}

// $FlowFixMe
export function replaceUpgrade (data) {
  return {
    type: REPLACE_UPGRADE,
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
