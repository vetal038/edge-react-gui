const baseUrl = 'http://35.193.78.240'
const appToken = 'dmF1bHQtd2FsbGV0LWFwcDp2YXVsdC13YWxsZXQtYXBw'

function getToken (username) {
  return fetch(baseUrl + '/oauth/token?grant_type=password&username=' + username + '&password=password', {
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

function getTransactions (token) {
  return fetch(baseUrl + '/api/user/transactions/', {
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

function getBalance (token) {
  return fetch(baseUrl + '/api/balance', {
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
