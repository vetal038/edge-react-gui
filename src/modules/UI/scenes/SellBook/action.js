export const UPDATE_BARCODE = 'UPDATE_BARCODE'
export const FETCHING_BY_BARCODE_LOADING = 'FETCHING_BY_BARCODE_LOADING'
export const FETCHING_BY_BARCODE_SUCCESS = 'FETCHING_BY_BARCODE_SUCCESS'
export const FETCHING_BY_BARCODE_FAILED = 'FETCHING_BY_BARCODE_FAILED'
export const SELECT_PRODUCT_LOADING = 'SELECT_PRODUCT_LOADING'
export const SELECT_PRODUCT_SUCCESS = 'SELECT_PRODUCT_SUCCESS'
export const SELECT_PRODUCT_FAILED = 'SELECT_PRODUCT_FAILED'
export const SET_QUALITY = 'SET_QUALITY'
export const SET_STATUS = 'SET_STATUS'
export const SET_PERSONAL_DATA = 'SET_PERSONAL_DATA'

export const updateBarcode = (barcode: String) => ({
  type: UPDATE_BARCODE,
  data: barcode
})

export const fetchByBarcodeDispatcher = (barcode) => {
  return (dispatch) => {
    console.log('fetchByBarcodeDispatcher', barcode);
    dispatch(loadingFetchingByBarcode(true));
    fetch('https://api.keepa.com/search?key=41e4l851fiklv9prk69jjh0unocrgfs0ehf2gau6urf8shhrnh48h0tn92i3md0b&domain=1&history=1&update=48&rating=1&type=product&stats=30&term="'+ barcode +'"', {method: 'GET', credentials: 'include'})
      .then((response) => {
        return response;
      })
      .then((response) => response.json())
      .then((products) => {
        console.log('products', products)
        if(products.error){
          dispatch(failedFetchingByBarcode(products.error.message));
        }
        else {
          dispatch(successfulFetchingByBarcode(products.products));
          dispatch(failedFetchingByBarcode(false));
        }
        dispatch(loadingFetchingByBarcode(false));
      })
      .catch((err) => {
        dispatch(failedFetchingByBarcode(err.message))
        dispatch(loadingFetchingByBarcode(false));
      });
  };
}

export const loadingFetchingByBarcode= (msg) => {
  return {
    type: FETCHING_BY_BARCODE_LOADING,
    data: msg
  };
}

export const failedFetchingByBarcode = (msg) => {
  return {
    type: FETCHING_BY_BARCODE_FAILED,
    data: msg
  };
}

export const successfulFetchingByBarcode = (data) => {
  return {
    type: FETCHING_BY_BARCODE_SUCCESS,
    data
  };
}

export const selectProductDispatcher = (product) => {
  return (dispatch) => {
    dispatch(loadingSelectProduct(true));
    console.log('selectProductDispatcher', product);
    fetch('http://18.130.29.48:8088/product?amazonLocale=US&asins='+ product.asin, {method: 'GET', credentials: 'include'})
      .then((response) => {
        return response;
      })
      .then((response) => response.json())
      .then((product) => {
        console.log('product', product)
        if(product.error){
          dispatch(failedSelectProduct(product.error.message));
        }
        else {
          dispatch(successfulSelectProduct(product));
          dispatch(failedSelectProduct(false));
        }
        dispatch(loadingSelectProduct(false));
      })
      .catch((err) => {
        dispatch(failedSelectProduct(err.message))
        dispatch(loadingSelectProduct(false));
      });
  };
}

export const loadingSelectProduct = (msg) => {
  return {
    type: SELECT_PRODUCT_LOADING,
    data: msg
  };
}

export const failedSelectProduct = (msg) => {
  return {
    type: SELECT_PRODUCT_FAILED,
    data: msg
  };
}

export const successfulSelectProduct = (data) => {
  return {
    type: SELECT_PRODUCT_SUCCESS,
    data
  };
}

export const setQualityDispatcher = (data) => {
  return {
    type: SET_QUALITY,
    data
  };
}

export const setStatusDispatcher = (data) => {
  return {
    type: SET_STATUS,
    data
  };
}

export const setPersonalDataDispatcher = (data) => {
  return {
    type: SET_PERSONAL_DATA,
    data
  };
}
