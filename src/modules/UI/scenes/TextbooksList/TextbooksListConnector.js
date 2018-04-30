// @flow

import _ from 'lodash'
import { connect } from 'react-redux'
import type { Dispatch, State } from '../../../ReduxTypes'
import * as CORE_SELECTORS from '../../../Core/selectors.js'
import * as SETTINGS_SELECTORS from '../../Settings/selectors'

import TextbooksList from './TextbooksList.ui'

const mapStateToProps = (state: State) => {
  const currencyConverter = CORE_SELECTORS.getCurrencyConverter(state)
  const settings = SETTINGS_SELECTORS.getSettings(state)
  const wallets = state.ui.wallets.byId

  return {
    settings,
    wallets,
    currencyConverter,
    list: state.ui.scenes.textBooks.fetchTextbooks,
    fetchTextbooksError: state.ui.scenes.textBooks.fetchTextbooksError,
    fetchTextbooksLoading: state.ui.scenes.textBooks.fetchTextbooksLoading
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TextbooksList)
