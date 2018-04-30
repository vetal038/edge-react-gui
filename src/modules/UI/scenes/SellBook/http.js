export const saveOrder = (order) => {
  console.log('saveOrder', order)
  // let data = new FormData();
  // for (let key in order) {
  //   data.append( key, order[key] );
  // }

  return fetch('http://18.130.29.48:8088/order', {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then((response) => {
      console.log('order', response)
      return response
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}
