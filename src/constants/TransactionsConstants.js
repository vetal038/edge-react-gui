// @flow

export const FEE = 'Fee'
export const UNLOCK_ACCOUNT = 'Unlock Account'
export const DEPOSIT = 'Deposit'
export const INCREASE_CAPACITY = 'Increase capacity to'
export const WITHDRAW = 'Withdraw'

export const STRATEGY_TYPES = {
  UNLOCK_ACCOUNT,
  DEPOSIT,
  INCREASE_CAPACITY,
  WITHDRAW,
  FEE
}

export function getStrategy (type) {
  return STRATEGY_TYPES[type] ? STRATEGY_TYPES[type] : type
}
