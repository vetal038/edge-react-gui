// @flow

export const FEE = 'Fee'
export const UNLOCK_ACCOUNT = 'Unlock Account'
export const UNLOCK = 'Unlock Account'
export const DEPOSIT = 'Deposit'
export const INCREASE_CAPACITY = 'Increase capacity to'
export const LIMIT = 'Increase limit to'
export const WITHDRAW = 'Withdraw'

export const STRATEGY_TYPES = {
  UNLOCK_ACCOUNT,
  UNLOCK,
  DEPOSIT,
  INCREASE_CAPACITY,
  LIMIT,
  WITHDRAW,
  FEE
}

export function getStrategy (type) {
  return STRATEGY_TYPES[type] ? STRATEGY_TYPES[type] : type
}
