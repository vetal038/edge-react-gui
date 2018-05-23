// @flow

import { connect } from 'react-redux'

import * as CORE_SELECTORS from '../../../Core/selectors.js'
import type { Dispatch, State } from '../../../ReduxTypes'
import KiosksLocation from './KiosksLocation.ui'

const mapStateToProps = (state: State, ownProps) => {
  const currentUsername = CORE_SELECTORS.getUsername(state)

  return {
    currentUsername: currentUsername,
    token: state.ui.scenes.transactionsVLList.token,
    atmList: state.ui.scenes.KiosksLocation.atmList
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(KiosksLocation)
