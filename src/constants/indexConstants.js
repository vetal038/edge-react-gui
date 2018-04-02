// @flow

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
