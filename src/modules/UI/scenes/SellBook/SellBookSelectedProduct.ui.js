// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, View, ScrollView, Image, Button } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import { Actions } from 'react-native-router-flux'
import s from '../../../../locales/strings'
import T from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import { AUTHORIZED, DENIED } from '../../permissions'
import * as UTILS from '../../../utils.js'
import * as Constants from '../../../../constants/indexConstants'

import styles from './style'

export class SellBookSelectedProduct extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.onChangeText = this.onChangeText.bind(this);

    this.qualityRef = this.updateRef.bind(this, 'quality');

    this.state = {
      quality: 'new',
    };
  }

  onChangeText(text) {
    ['quality']
      .map((name) => ({ name, ref: this[name] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ name, ref }) => {
        this.setState({ [name]: text });
      });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  _onPress = () => {
    this.props.setQuality(this.state.quality)
    Actions.sellBookSceneTypeAddress();
  }

  renderProduct = () => {
    const {selectedProduct} = this.props;
    let { quality } = this.state;

    let data = [
      {
        value: 'new',
        label: 'Like New'
      },
      {
        value: 'old',
        label: 'Like Old'
      },
    ];
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
            </View>
          </View>
          <View style={styles.sceneBoxBody}>
            <View>
              <T style={{marginTop: 10}}>MAX Price: {selectedProduct.priceHistory.maxPrice}</T>
              <T>MIN Price: {selectedProduct.priceHistory.minPrice}</T>
              <T>AVG Price: {selectedProduct.priceHistory.avgPrice}</T>
            </View>
            <View style={{width: '100%', flex: 1}}>
              <Dropdown
                label='Quality'
                data={data}
                value={quality}
                ref={this.qualityRef}
                onChangeText={this.onChangeText}
              />
              <Button title="Next" onPress={() => this._onPress()} />
            </View>
            {/*<T style={{marginTop: 10}}>Description: </T>*/}
            {/*<T>{selectedProduct.productInfo.description}</T>*/}
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
                <T style={styles.headerBoxStepText}>Step {this.props.step} of {Constants.SELLING_BOOK_STEPS_NUMBER}</T>
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
