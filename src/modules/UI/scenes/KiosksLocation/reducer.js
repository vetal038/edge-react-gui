// @flow

import type { Action } from '../../../ReduxTypes'
import * as ACTION from './action.js'

const initialState = {
  atmList: []
}

export type State = {
  atmList: Array<any>
}

export const KiosksLocation = (state: State = initialState, action: Action) => {
  const { type, data = {} } = action

  switch (type) {
    case ACTION.GET_ATM_LIST: {
      const { atmList } = data
      return {
        ...state,
        atmList
      }
    }

    default:
      return state
  }
}

export default KiosksLocation
