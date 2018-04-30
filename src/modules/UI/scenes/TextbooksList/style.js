// @flow

import { Image, Platform, StyleSheet } from 'react-native'

import THEME from '../../../../theme/variables/airbitz'
import { PLATFORM } from '../../../../theme/variables/platform.js'

export const styles = {
  gradient: {
    height: THEME.HEADER
  },
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  noItem: {
    marginTop: 10,
    width: '100%',
    textAlign: 'center'
  },
  noResults: {
    width: '100%',
    marginTop: 30,
    textAlign: 'center'
  },
  noHistory: {
    width: '100%',
    marginTop: 30,
    textAlign: 'center'
  },
  bottomButtonWrapper: {
    height: 50
  },
  bottomButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#1f52ff',
  },
  bottomButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: THEME.COLORS.WHITE
  },
}

export default StyleSheet.create(styles)
