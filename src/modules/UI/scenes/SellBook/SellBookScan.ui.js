// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Alert, Keyboard, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Camera from 'react-native-camera'
import s from '../../../../locales/strings'
import T from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import { AUTHORIZED, DENIED } from '../../permissions'
import * as UTILS from '../../../utils.js'
import * as Constants from '../../../../constants/indexConstants'

import styles from './style'
const DENIED_PERMISSION_TEXT = 'DENIED_PERMISSION' // blank string because way off-centered (not sure reason why)

export class SellBookScan extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  onBarCodeRead = (scan: { data: string }) => {
    if (!this.props.scanEnabled) return
    console.log('onBarCodeRead', scan, Actions.currentScene)
    this.parseData(scan)
  }

  parseData = (code: string) => {
    try {
      if (code.type === 'EAN_8' || code.type === 'EAN_13' || code.type === 'EAN_128') {
        this.props.dispatchUpdateBarcode(code.data)
        this.props.fetchByBarcode(code.data)
        Actions.sellBookSceneSearch()
      }
    } catch (error) {
      this.props.dispatchDisableScan()
      Alert.alert(s.strings.fragment_scan_barcode, error.toString(), [
        { text: s.strings.string_ok, onPress: () => this.props.dispatchEnableScan() }
      ])
    }
  }

  renderCamera = () => {
    console.log('this.props.cameraPermission', this.props.cameraPermission);
    if (this.props.cameraPermission === AUTHORIZED && Actions.currentScene === 'sellBookSceneScan') {
      const torchMode = this.props.torchEnabled ? Camera.constants.TorchMode.on : Camera.constants.TorchMode.off

      return <Camera style={styles.preview} ref="cameraCapture" torchMode={torchMode} onBarCodeRead={this.onBarCodeRead} />
    } else if (this.props.cameraPermission === DENIED && Actions.currentScene === 'sellBookSceneScan') {
      return (
        <View style={[styles.preview, { justifyContent: 'center', alignItems: 'center' }, UTILS.border()]}>
          <Text>{DENIED_PERMISSION_TEXT}</Text>
        </View>
      )
    } else {
      return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" style={{ flex: 1, alignSelf: 'center' }} />
        </View>
      )
    }
  }

  render () {
    return (
      <SafeAreaView>
        <View style={styles.scene}>
          <Gradient style={styles.gradient} />
          <View style={styles.container}>
            <View style={styles.headerBox}>
              <T style={styles.headerBoxStepText}>Step {this.props.step} of {Constants.SELLING_BOOK_STEPS_NUMBER}</T>
              <T style={styles.headerBoxInfoText}>Scan the barcode at the back of the book to estimate your buy-back price</T>
            </View>
            {(Actions.currentScene === 'sellBookSceneScan') && this.renderCamera()}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
