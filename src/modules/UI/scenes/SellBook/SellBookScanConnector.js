// @flow

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import type { Dispatch, State } from '../../../ReduxTypes'
import * as Constants from '../../../../constants/indexConstants'
import { SellBookScan as SellBookScanConnector } from './SellBookScan.ui'
import { SellBookSearch as SellBookSearchConnector } from './SellBookSearch.ui'
import { SellBookSelectedProduct as SellBookSelectedProductConnector } from './SellBookSelectedProduct.ui'
import { SellBookTypeAddress as SellBookTypeAddressConnector } from './SellBookTypeAddress.ui'
import { SellBookFinish as SellBookFinishConnector } from './SellBookFinish.ui'
import { disableScan, enableScan } from '../Scan/action'
import { getCameraPermission } from '../../../../reducers/permissions/selectors'
import { updateBarcode, fetchByBarcodeDispatcher, selectProductDispatcher, setQualityDispatcher, setPersonalDataDispatcher } from './action'

const mapStateToProps = (state: State) => ({
  cameraPermission: getCameraPermission(state),
  torchEnabled: state.ui.scenes.scan.torchEnabled,
  scanEnabled: state.ui.scenes.scan.scanEnabled,
  step: Constants.SELLING_FLOW[Actions.currentScene],
  barcode: state.ui.scenes.sellBook.barcode,
  products: state.ui.scenes.sellBook.products,
  productsError: state.ui.scenes.sellBook.productsError,
  productsLoading: state.ui.scenes.sellBook.productsLoading,
  selectedProduct: state.ui.scenes.sellBook.selectedProduct,
  selectedProductError: state.ui.scenes.sellBook.selectedProductError,
  selectedProductLoading: state.ui.scenes.sellBook.selectedProductLoading,
  quality: state.ui.scenes.sellBook.quality,
  personalData: state.ui.scenes.sellBook.personalData,
  status: state.ui.scenes.sellBook.status,
  currentScene: Actions.currentScene
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchEnableScan: () => dispatch(enableScan()),
  dispatchDisableScan: () => dispatch(disableScan()),
  dispatchUpdateBarcode: (barcode) => dispatch(updateBarcode(barcode)),
  fetchByBarcode: (barcode) => dispatch(fetchByBarcodeDispatcher(barcode)),
  selectProduct: (product) => dispatch(selectProductDispatcher(product)),
  setQuality: (quality) => dispatch(setQualityDispatcher(quality)),
  setPersonalData: (data) => dispatch(setPersonalDataDispatcher(data)),
})

export const SellBookScan = connect(mapStateToProps, mapDispatchToProps)(SellBookScanConnector)
export const SellBookSearch = connect(mapStateToProps, mapDispatchToProps)(SellBookSearchConnector)
export const SellBookSelectedProduct = connect(mapStateToProps, mapDispatchToProps)(SellBookSelectedProductConnector)
export const SellBookTypeAddress = connect(mapStateToProps, mapDispatchToProps)(SellBookTypeAddressConnector)
export const SellBookFinish = connect(mapStateToProps, mapDispatchToProps)(SellBookFinishConnector)
