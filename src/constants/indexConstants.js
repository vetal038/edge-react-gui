// @flow
import * as Keys from './SceneKeys'

export * from './SceneKeys'
export * from './ActionConstants'
export * from './IconConstants'
export * from '../modules/UI/components/WalletListModal/action'
export * from './DropDownValueConstants'
export * from './WalletAndCurrencyConstants'
export * from './FeeConstants'
export * from './ErrorConstants'
export { REQUEST_STATUS } from './RequestStatusConstants'

export const LEFT_TO_RIGHT = 'leftToRight'
export const RIGHT_TO_LEFT = 'rightToLeft'
export const NONE = 'none'
export const FROM = 'from'
export const TO = 'to'
export const ALWAYS = 'always'
export const LOGOUT = 'LOGOUT'

export const CRYPTO_EXCHANGE = 'cryptoExchange'
export const PASSWORD_RECOVERY_LINK = 'passwordRecoveryLink'
export const IOS = 'ios'
export const ANDROID = 'android'
export const PUSH_DELAY_SECONDS = 86400
export const LOCAL_STORAGE_BACKGROUND_PUSH_KEY = 'EdgeWalletLastPushNotification'

export const SELLING_BOOK_STEPS_NUMBER = 5
export const SELLING_FLOW = {
  [Keys.SELL_BOOK_SCENE_SCAN]: 1,
  [Keys.SELL_BOOK_SCENE_SEARCH]: 2,
  [Keys.SELL_BOOK_SCENE_SELECTED_PRODUCT]: 3,
  [Keys.SELL_BOOK_SCENE_TYPE_ADDRESS]: 4,
  [Keys.SELL_BOOK_SCENE_FINISH]: 5
}
