import { AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import * as Constants from '../constants/indexConstants'

async function getToken () {
  const version = DeviceInfo.getVersion()
  console.log('DeviceInfo.getVersion', version)
  const username = await AsyncStorage.getItem('vc_username')
  const password = await AsyncStorage.getItem('vc_password')
  const url = await Constants.baseUrl()
  return fetch(url + '/api/accounts/oauth/token?grant_type=password&scope=web_client&username=' + username + '&password=' + password, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Constants.APP_TOKEN,
      'version': version
    }
  })
    .then((response) => {
      console.log('getToken username', username, password)
      return response.json()
    })
    .then((responseJson) => {
      console.log('getToken responseJson', responseJson)
      return responseJson
    })
    .catch((error) => {
      console.error(error)
      return false
    })
}

async function getTransactions (token) {
  const url = await Constants.baseUrl()
  return fetch(url + '/api/user/transactions/', {
    method: 'GET',
    headers: {
      'Authorization': 'bearer ' + token
    }
  })
    .then((response) => {
      console.log('getTransactions', response)
      return response.json()
    })
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

async function getBalance (token) {
  const url = await Constants.baseUrl()
  return fetch(url + '/api/balance', {
    method: 'GET',
    headers: {
      'Authorization': 'bearer ' + token
    }
  })
    .then((response) => {
      console.log('getBalance', response)
      return response.json()
    })
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

async function getWallet (token) {
  const url = await Constants.baseUrl()
  return fetch(url + '/api/purchase/wallets', {
    method: 'GET',
    headers: {
      'Authorization': 'bearer ' + token
    }
  })
    .then((response) => {
      console.log('TODO: change API')
      console.log('getWallet', response)
      return response.json()
    })
    .then((responseJson) => {
      console.log('getWallet responseJson', responseJson)
      return responseJson
      // return {
      //   "dollars": 19.04,
      //   "vaults": 1904,
      //   "limit": 200.00,
      //   "active": true,
      //   "last_transaction": {
      //     "hash": "0x31a1384d1fc08ada2000b2d5fd7475b45657f3cdffa2c814f9fcac26f5117210",
      //     "vaults": 790,
      //     "dollars": 7.90,
      //     "status": "SUCCESSFUL",
      //     "strategy": "WITHDRAW",
      //     "xtoken": "testXToken",
      //     "created_date": "2018-04-20",
      //     "updated_date": "2018-04-20",
      //     "created_time": "11:50:34",
      //     "updated_time": "11:50:34"
      //   },
      //   "last_upgrade": {
      //     "previous_state": 100.00,
      //     "new_state": 200.00,
      //     "cost": 10.00,
      //     "type": "LIMIT",
      //     "xtoken": "testXToken",
      //     "created_date": "2018-04-20",
      //     "updated_date": "2018-04-20",
      //     "created_time": "11:50:30",
      //     "updated_time": "11:50:30"
      //   },
      //   "created_date": "2018-04-20",
      //   "updated_date": "2018-04-20",
      //   "created_time": "11:50:05",
      //   "updated_time": "11:50:34",
      //   "transactions": [
      //     {
      //       "hash": "0x5cf24a1c5318feb79c3529163de03ecbe4e5c5b3cfc36ebde688e44459d3ab20",
      //       "vaults": 1347,
      //       "dollars": 13.47,
      //       "status": "SUCCESSFUL",
      //       "strategy": "DEPOSIT",
      //       "xtoken": "testXToken",
      //       "created_date": "2018-04-20",
      //       "updated_date": "2018-04-20",
      //       "created_time": "11:50:19",
      //       "updated_time": "11:50:19"
      //     },
      //     {
      //       "hash": "0x0a78557fb9e361eb43ee8d1c75a3fd2c94f2fc9a7f5a5001eed346f3272a5447",
      //       "vaults": 1347,
      //       "dollars": 13.47,
      //       "status": "SUCCESSFUL",
      //       "strategy": "DEPOSIT",
      //       "xtoken": "testXToken",
      //       "created_date": "2018-04-20",
      //       "updated_date": "2018-04-20",
      //       "created_time": "11:50:20",
      //       "updated_time": "11:50:20"
      //     },
      //     {
      //       "hash": "0x31a1384d1fc08ada2000b2d5fd7475b45657f3cdffa2c814f9fcac26f5117210",
      //       "vaults": 790,
      //       "dollars": 7.90,
      //       "status": "SUCCESSFUL",
      //       "strategy": "WITHDRAW",
      //       "xtoken": "testXToken",
      //       "created_date": "2018-04-20",
      //       "updated_date": "2018-04-20",
      //       "created_time": "11:50:34",
      //       "updated_time": "11:50:34"
      //     }
      //   ],
      //   "upgrades": [
      //     {
      //       "previous_state": 0.00,
      //       "new_state": 100.00,
      //       "cost": 10.00,
      //       "type": "UNLOCK",
      //       "xtoken": "testXToken",
      //       "created_date": "2018-04-20",
      //       "updated_date": "2018-04-20",
      //       "created_time": "11:50:08",
      //       "updated_time": "11:50:08"
      //     },
      //     {
      //       "previous_state": 100.00,
      //       "new_state": 200.00,
      //       "cost": 10.00,
      //       "type": "LIMIT",
      //       "xtoken": "testXToken",
      //       "created_date": "2018-04-20",
      //       "updated_date": "2018-04-20",
      //       "created_time": "11:50:30",
      //       "updated_time": "11:50:30"
      //     }
      //   ]
      // }
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

async function updatePushNotificationToken (token, method) {
  const url = await Constants.baseUrl()
  const accessToken = await getToken()

  return fetch(url + '/api/accounts/device', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + accessToken.access_token
    }
  })
    .then((response) => {
      console.log('updatePushNotificationToken get', response)
      const detectedMethod = response.status === 200 ? 'PUT' : 'POST'
      return fetch(url + '/api/accounts/device', {
        method: detectedMethod || 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + accessToken.access_token
        },
        body: JSON.stringify({token: token.token})
      })
        .then((response) => {
          console.log('updatePushNotificationToken response', response)
          return response.status === 200
        })
        .catch((error) => {
          console.error(error)
          return error
        })
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

async function deletePushNotificationToken () {
  const url = await Constants.baseUrl()
  const accessToken = await getToken()

  return fetch(url + '/api/accounts/device', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + accessToken.access_token
    }
  })
    .then((response) => {
      console.log('deletePushNotificationToken get', response)
      if (response.status === 200) {
        return fetch(url + '/api/accounts/device', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken.access_token
          }
        })
          .then((response) => {
            console.log('deletePushNotificationToken delete', response)
            return response.status === 200
          })
          .catch((error) => {
            console.error(error)
            return error
          })
      }
      else {
        return response.status === 200
      }
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

async function ATMLogin (qrToken) {
  const url = await Constants.baseUrl()
  const accessToken = await getToken()
  return fetch(url + '/api/kiosk/login?token=' + qrToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + accessToken.access_token
    }
  })
    .then((response) => {
      console.log('ATMLogin', response)
      if (response.status === 200) {
        return response
      } else {
        return response.json()
      }
    })
    .then((responseJson) => {
      console.log('ATMLogin responseJson', responseJson)
      return responseJson
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

export default { getToken, getTransactions, getBalance, updatePushNotificationToken, deletePushNotificationToken, getWallet, ATMLogin }
