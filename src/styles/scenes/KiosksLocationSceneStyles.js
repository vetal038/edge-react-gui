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
  }
}

export { KiosksLocationSceneStyles }
