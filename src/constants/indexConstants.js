// @flow

import { AsyncStorage } from 'react-native'
export * from './SceneKeys'
export * from './ActionConstants'
export * from './IconConstants'
export * from '../modules/UI/components/WalletListModal/action'
export * from './DropDownValueConstants'
export * from './WalletAndCurrencyConstants'
export * from './FeeConstants'
export * from './ErrorConstants'
export * from './TransactionsConstants'
export { REQUEST_STATUS } from './RequestStatusConstants'

export const LEFT_TO_RIGHT = 'leftToRight'
export const RIGHT_TO_LEFT = 'rightToLeft'
export const NONE = 'none'
export const FROM = 'from'
export const TO = 'to'
export const ALWAYS = 'always'
export const LOGOUT = 'LOGOUT'
export const SWITCH_MODE = 'SWITCH_MODE'

export const CRYPTO_EXCHANGE = 'cryptoExchange'
export const PASSWORD_RECOVERY_LINK = 'passwordRecoveryLink'
export const IOS = 'ios'
export const ANDROID = 'android'
export const PUSH_DELAY_SECONDS = 86400
export const LOCAL_STORAGE_BACKGROUND_PUSH_KEY = 'EdgeWalletLastPushNotification'
export const SENDER_ID = '149672759138'
export const DEFAULT_MODE = false // true - `dev`, false - `prod`

// http
export const APP_TOKEN = 'dmF1bHRsb2dpYzp2YXVsdGxvZ2ljX3NlY3JldA=='
export const baseUrl = async () => {
  let value = await AsyncStorage.getItem('isDevMode')
  value = (value && value.length) ? value === 'dev' : DEFAULT_MODE
  return value ? 'http://35.193.161.72' : 'http://35.224.177.227'//'http://vaultlogic.com'
}
// export {baseUrl}
