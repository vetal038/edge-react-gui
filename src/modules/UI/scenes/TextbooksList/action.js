export const FETCH_TEXTBOOKS = 'FETCH_TEXTBOOKS'
export const FETCH_TEXTBOOKS_LOADING = 'FETCH_TEXTBOOKS_LOADING'
export const FETCH_TEXTBOOKS_FAILED = 'FETCH_TEXTBOOKS_FAILED'

export const fetchTextbooksDispatcher = () => {
  return (dispatch) => {
    dispatch(loadingFetchTextbooks(true));
    fetch('http://18.130.29.48:8088/orders', {method: 'GET', credentials: 'include'})
      .then((response) => {
        return response;
      })
      .then((response) => response.json())
      .then((orders) => {
        console.log('orders', orders)
        if(orders.error){
          dispatch(failedFetchTextbooks(orders.error.message));
        }
        else {
          dispatch(successfulFetchTextbooks(orders));
          dispatch(failedFetchTextbooks(false));
        }
        dispatch(loadingFetchTextbooks(false));
      })
      .catch((err) => {
        dispatch(failedFetchTextbooks(err.message))
        dispatch(loadingFetchTextbooks(false));
      });
  };
}

export const loadingFetchTextbooks = (msg) => {
  return {
    type: FETCH_TEXTBOOKS_LOADING,
    data: msg
  };
}

export const failedFetchTextbooks = (msg) => {
  return {
    type: FETCH_TEXTBOOKS_FAILED,
    data: msg
  };
}

export const successfulFetchTextbooks = (data: Array<any>) => ({
  type: FETCH_TEXTBOOKS,
  data
})
