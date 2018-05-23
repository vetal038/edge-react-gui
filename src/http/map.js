import * as Constants from '../constants/indexConstants'

async function getATMLocations (token) {
  const url = await Constants.baseUrl()
  return fetch(url + '/api/kiosk/locations', {
    method: 'GET',
    headers: {
      'Authorization': 'bearer ' + token
    }
  })
    .then((response) => {
      console.log('getATMLocations', response)
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

export default { getATMLocations }
