// @flow

import { StyleSheet } from 'react-native'
import THEME from '../../theme/variables/airbitz'
import * as Styles from '../indexStyles'

const KiosksLocationSceneStyles = {
  scene: Styles.SceneContainer,
  styleCatch: Styles,
  gradient: {
    height: THEME.SPACER.HEADER
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  mapContainerWrapper: {
    flex: 1,
    position: 'relative'
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  markerTextWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 2,
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  markerText: {
    fontSize: 10
  }
}

export { KiosksLocationSceneStyles }
