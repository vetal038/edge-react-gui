// @flow

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import { logoutRequest, switchMode } from '../../../../Login/action'
import type { Dispatch, State } from '../../../../ReduxTypes'
import Main from './Main'

const mapStateToProps = (state: State) => ({
  usersView: state.ui.scenes.controlPanel.usersView,
  isDevMode: state.core.context.isDevMode,
  setMode: (value) => {
    const newVal = value ? 'prod' : 'dev'
    AsyncStorage.setItem('isDevMode', newVal)
  },
  getMode: async function () {
    let value = await AsyncStorage.getItem('isDevMode')
    value = (value && value.length) ? value === 'dev' : true
    return value
  }
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: (username?: string) => dispatch(logoutRequest(username)),
  switchMode: () => dispatch(switchMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
