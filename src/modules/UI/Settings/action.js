// UI/Settings
const PREFIX = 'UI/Settings/'

export const SET_LOGIN_STATUS = PREFIX + 'SET_LOGIN_STATUS'

export const ADD_EXCHANGE_TIMER = PREFIX + 'ADD_EXCHANGE_TIMER'

export const UPDATE_SETTINGS = PREFIX + 'UPDATE_SETTINGS'
export const LOAD_SETTINGS = PREFIX + 'LOAD_SETTINGS'

// Core Settings
export const SET_PIN_MODE = PREFIX + 'SET_PIN_MODE'
export const SET_PIN = PREFIX + 'SET_PIN'
export const SET_OTP_MODE = PREFIX + 'SET_OTP_MODE'
export const SET_OTP = PREFIX + 'SET_OTP'

// Synced Account Settings
export const SET_AUTO_LOGOUT_TIME = PREFIX + 'SET_AUTO_LOGOUT_TIME'
export const SET_DEFAULT_FIAT = PREFIX + 'SET_DEFAULT_FIAT'
export const SET_MERCHANT_MODE = PREFIX + 'SET_MERCHANT_MODE'

// Local Account Settings
export const SET_BLUETOOTH_MODE = PREFIX + 'SET_BLUETOOTH_MODE'

// Currency Settings
export const SET_BTC_DENOMINATION = PREFIX + 'SET_BITCOIN_DENOMINATION'
export const SET_BITCOIN_OVERRIDE_SERVER = PREFIX + 'SET_BITCOIN_OVERRIDE_SERVER'
export const SET_LTC_DENOMINATION = PREFIX + 'SET_LITECOIN_DENOMINATION'
export const SET_ETH_DENOMINATION = PREFIX + 'SET_ETHEREUM_DENOMINATION'
export const SET_REP_DENOMINATION = PREFIX + 'SET_REP_DENOMINATION'
export const SET_WINGS_DENOMINATION = PREFIX + 'SET_WINGS_DENOMINATION'
export const SET_LUN_DENOMINATION = PREFIX + 'SET_LUNYR_DENOMINATION'

// Denomination
export const SET_DENOMINATION_KEY = PREFIX + 'SET_DENOMINATION_KEY'

// Plugins
export const ADD_CURRENCY_PLUGIN = PREFIX + 'ADD_CURRENCY_PLUGIN'

import * as SETTINGS_SELECTORS from './selectors'

export const setLoginStatus = (loginStatus) => ({
  type: SET_LOGIN_STATUS,
  data: {loginStatus}
})

export const addExchangeTimer = (exchangeTimer) => ({
  type: ADD_EXCHANGE_TIMER,
  data: {exchangeTimer}
})

export const removeExchangeTimer = () => (dispatch, getState) => {
  const state = getState()
  const exchangeTimer = SETTINGS_SELECTORS.getExchangeTimer(state)
  clearInterval(exchangeTimer)

  return {
    type: 'REMOVE_EXCHANGE_TIMER'
  }
}

export const updateSettings = settings => ({
  type: UPDATE_SETTINGS,
  data: {settings}
})

export const loadSettings = settings => ({
  type: LOAD_SETTINGS,
  data: {settings}
})

export const setPINMode = pinMode => ({
  type: SET_PIN_MODE,
  data: {pinMode}
})

export const setPIN = pin => ({
  type: SET_PIN,
  data: {pin}
})

export const setOTPMode = otpMode => ({
  type: SET_OTP_MODE,
  data: {otpMode}
})

export const setOTP = otp => ({
  type: SET_OTP,
  data: {otp}
})

export const setAutoLogoutTimeInSeconds = (autoLogoutTimeInSeconds) => ({
  type: SET_AUTO_LOGOUT_TIME,
  data: {autoLogoutTimeInSeconds}
})

export const setDefaultFiat = defaultFiat => ({
  type: SET_DEFAULT_FIAT,
  data: {defaultFiat}
})

export const setMerchantMode = merchantMode => ({
  type: SET_MERCHANT_MODE,
  data: {merchantMode}
})

export const setBluetoothMode = bluetoothMode => ({
  type: SET_BLUETOOTH_MODE,
  data: {bluetoothMode}
})

// BTC Settings
export const setBitcoinOverrideServer = overrideServer => ({
  type: SET_BITCOIN_OVERRIDE_SERVER,
  data: {overrideServer}
})

// Denomination
export const setDenominationKey = (currencyCode, denominationKey) => ({
  type: SET_DENOMINATION_KEY,
  data: {currencyCode, denominationKey}
})

// Plugins
export const addCurrencyPlugin = (plugin) => {
  const pluginName = plugin.pluginName
  const walletTypes = plugin.currencyInfo.walletTypes
  return {
    type: ADD_CURRENCY_PLUGIN,
    data: {pluginName, plugin, walletTypes}
  }
}
