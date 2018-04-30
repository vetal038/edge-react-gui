// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, View, FlatList, Image, Button } from 'react-native'
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

export class SellBookSearch extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  _renderSearchedList = () => {
    const {products} = this.props

    return products && products.length
      ? (<FlatList
            style={{flex: 1, width: '100%'}}
            data={products}
            renderItem={ this._renderItem }
          />)
      : (<View><T style={styles.noResults}>Can't find any product by this barcode</T></View>)
  };

  _getImage = (imagesCSV) => {
    const list = imagesCSV.split(",")
    return 'https://images-na.ssl-images-amazon.com/images/I/' + list[0]
  }

  selectProduct = (product) => {
    this.props.selectProduct(product)
    Actions.sellBookSceneSelectedProduct();
  }


  _renderItem = ({item}) => {
    return (
      <View style={styles.rowBox} >
        <View style={styles.rowBoxHeader}>
          <View style={styles.rowBoxImageBlock}>
            {
              item.imagesCSV ? (
                <Image
                  style={{height: 100, width: 60}}
                  source={{uri: this._getImage(item.imagesCSV)}}
                />
              )
                :
              (<T>No image</T>)
            }
          </View>
          <View>
            <T style={styles.headerText}>{item.title}</T>
            <T>Author: {item.author}</T>
            <T>Manufacturer: {item.manufacturer}</T>
          </View>
        </View>
        <View style={styles.rowBoxBody}>
          <T style={{marginTop: 10}}>Description: </T>
          <T>{item.description.slice(0, 200) + '...'}</T>
          <Button title="Choose" onPress={() => this.selectProduct(item)} />
        </View>
      </View>
    )
  };

  render () {
    const {productsLoading, productsError} = this.props;

    if (productsLoading) {
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
                <T style={styles.foundedResults}>List of products founded by barcode: {this.props.barcode}</T>
              </View>
              <View style={styles.boxWrapperBody}>
                {productsError ? (<T style={styles.noResults}>{productsError}</T>) : this._renderSearchedList()}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
