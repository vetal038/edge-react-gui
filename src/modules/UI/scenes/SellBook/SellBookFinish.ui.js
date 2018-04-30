// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, View, ScrollView, Image, Button } from 'react-native'
import { FormField } from '../../../../components/indexComponents'
import { Actions } from 'react-native-router-flux'
import s from '../../../../locales/strings'
import T from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import { AUTHORIZED, DENIED } from '../../permissions'
import * as UTILS from '../../../utils.js'
import * as Constants from '../../../../constants/indexConstants'

import styles from './style'

export class SellBookFinish extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  _onPressSellAnother = () => {
    Actions.popTo(Constants.SELL_BOOK_SCENE_SCAN)
  }

  renderProduct = () => {
    const {selectedProduct} = this.props;

    return (
      <View style={styles.sceneBox}>
        <View style={styles.sceneBoxHeader}>
          <View style={styles.sceneBoxImageBlock}>
            {
              selectedProduct.imagesCSV && selectedProduct.imagesCSV.length ? (
                <Image
                  style={{height: 100, width: 60}}
                  source={{uri: this._getImage(selectedProduct.imagesCSV)}}
                />
              )
                :
                (<T>No image</T>)
            }
          </View>
          <View>
            <T style={styles.headerText}>{selectedProduct.productInfo.title}</T>
            <T>Author: {selectedProduct.productInfo.author}</T>
            <T>Manufacturer: {selectedProduct.productInfo.manufacturer}</T>
            <T>Quality: {this.props.quality}</T>
          </View>
        </View>
        <View style={styles.sceneBoxBody}>
          <View style={{marginTop: 10}}>
            <T style={styles.headerText}>Receive Payment</T>
          </View>
          <View style={{width: '100%', flex: 1}}>
            <T>
              Our experts will make sure your book
              matches your given description upon
              receipt. Once they have evaluated
              the book, we will notify you through
              this app, then email, SMS, and finally
              automated robocalls to request final
              payment instructions to confirm your
              preferred payout method!
              Thank you!
            </T>

            <Button title="Sell another book" onPress={() => this._onPressSellAnother()} />
          </View>
        </View>
      </View>
    )
  }

  _getImage = (imagesCSV) => {
    return 'https://images-na.ssl-images-amazon.com/images/I/' + imagesCSV[0]
  }

  render () {
    const {selectedProductError, selectedProductLoading} = this.props;

    if (selectedProductLoading) {
      return (
        <SafeAreaView>
          <View style={styles.scene}>
            <Gradient style={styles.gradient} />
            <View style={styles.container}>
              <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" style={{ flex: 1, alignSelf: 'center' }} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      )
    }

    return (
      <SafeAreaView>
        <View style={styles.scene}>
          <Gradient style={styles.gradient} />
          <View style={styles.container}>
            <View style={styles.boxWrapper}>
              <View style={styles.boxWrapperHeader}>
                <T style={styles.headerBoxStepText}>Step {this.props.step} of {Constants.SELLING_BOOK_STEPS_NUMBER}{this.props.currentScene === Constants.SELL_BOOK_SCENE_FINISH && (' (' + this.props.status + ')')}</T>
              </View>
              <View style={styles.boxWrapperBody}>
                {selectedProductError ?
                  (<T style={styles.noResults}>{selectedProductError}</T>) :
                  this.renderProduct()
                }
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
