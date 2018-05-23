// @flow

import _ from 'lodash'
import type { Dispatch, GetState } from '../../../ReduxTypes'
import requser from '../../../../http/user'
import reqmap from '../../../../http/map'

export const GET_ATM_LIST = 'GET_ATM_LIST'

// $FlowFixMe
export const requestATMList = (username) => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const token = _.isEmpty(state.ui.scenes.transactionsVLList.token) ? (await requser.getToken(username)) : state.ui.scenes.transactionsVLList.token
  const atmList = await reqmap.getATMLocations(token.access_token)
  dispatch(getATMList({atmList: atmList.locations || []}))
}

// $FlowFixMe
export const getATMList = (data) => ({
  type: GET_ATM_LIST,
  data: data
})
