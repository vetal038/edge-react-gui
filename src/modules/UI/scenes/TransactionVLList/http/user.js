import { AsyncStorage } from 'react-native'

const baseUrl = async function () {
  let value = await AsyncStorage.getItem('isDevMode')
  value = (value && value.length) ? value === 'dev' : true
  return value ? 'http://35.193.78.240' : 'http://vaultlogic.com'
}
const appToken = 'dmF1bHQtd2FsbGV0LWFwcDp2YXVsdC13YWxsZXQtYXBw'

async function getToken (username) {
  const url = await baseUrl()
  return fetch(url + '/oauth/token?grant_type=password&username=' + username + '&password=password', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + appToken
    }
  })
    .then((response) => {
      console.log('getToken', response)
      return response.json()
    })
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error)
      return false
    })
}

async function getTransactions (token) {
  const url = await baseUrl()
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
  const url = await baseUrl()
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

export default { getToken, getTransactions, getBalance }
