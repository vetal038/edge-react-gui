// @flow

import { Image, Platform, StyleSheet } from 'react-native'

import THEME from '../../../../theme/variables/airbitz'
import { PLATFORM } from '../../../../theme/variables/platform.js'

export const styles = {
  gradient: {
    height: THEME.HEADER
  },
  scene: {
    flex: 1,
    alignItems: 'stretch'
  },
  container: {
    height: PLATFORM.deviceHeight - 66 - PLATFORM.footerHeight,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  headerBox: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  headerBoxStepText: {
    fontSize: 18,
    color: THEME.COLORS.BLACK
  },
  headerBoxInfoText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  boxWrapperHeader: {
    height: 50,
  },
  boxWrapperBody: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  noItem: {
    marginTop: 10,
    width: '100%',
    textAlign: 'center'
  },
  foundedResults: {
    width: '100%',
    marginBottom: 10,
    textAlign: 'center'
  },
  noResults: {
    width: '100%',
    marginTop: 30,
    textAlign: 'center'
  },
  rowBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingBottom: 5
  },
  rowBoxHeader: {
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  rowBoxImageBlock: {
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowBoxBody: {

  },
  headerText: {
    color: THEME.COLORS.BLACK,
    fontSize: 18,
    fontWeight: '700'
  },
  sceneBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingBottom: 5
  },
  sceneBoxHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  sceneBoxImageBlock: {
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sceneBoxBody: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  addressInput: {
    borderBottomColor: THEME.COLORS.GRAY_2,
    borderBottomWidth: 1,
    height: 26,
    textAlign: 'center',
    fontSize: 20,
    color: THEME.COLORS.GRAY_1
  },
}

export default StyleSheet.create(styles)
