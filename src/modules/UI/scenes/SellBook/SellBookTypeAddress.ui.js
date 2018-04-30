// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, View, ScrollView, Image, Button, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormField } from '../../../../components/indexComponents'
import { Actions } from 'react-native-router-flux'
import s from '../../../../locales/strings'
import T from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import { AUTHORIZED, DENIED } from '../../permissions'
import * as UTILS from '../../../utils.js'
import * as Constants from '../../../../constants/indexConstants'
import {saveOrder} from './http'

import styles from './style'

export class SellBookTypeAddress extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      loading: false,
      focusName: true,
      focusAddress: false,
      focusCity: false,
      focusState: false,
      focusZip: false,
    };
    //this.onSetNextFocus = this.onSetNextFocus.bind(this);
  }

  nameChange = (value: string) => {
    this.setState(() => {
      return { name: value }
    })
  }

  addressChange = (value: string) => {
    this.setState(() => {
      return { address: value }
    })
  }

  cityChange = (value: string) => {
    this.setState(() => {
      return { city: value }
    })
  }

  stateChange = (value: string) => {
    this.setState(() => {
      return { state: value }
    })
  }

  zipChange = (value: string) => {
    this.setState(() => {
      return { zip: value }
    })
  }

  _onPress = async () => {
    try {
      this.setState({ loading: true })
      let order = {
        name: this.state.name,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }
      //let order = { ...{}, ...this.state }
      order = { ...order, quality: this.props.quality, asins: this.props.selectedProduct.asins || null}
      const res = await saveOrder(order);
      console.log('response saveOrder', res)
      if (res.status === 200) {
        this.setState({ loading: false })
        this.props.setPersonalData(this.state)
        Actions.sellBookSceneFinish();
      }
      else {
        this.setState({ loading: false })
        Alert.alert('Error', res.error, [
          { text: s.strings.string_ok }
        ])
      }
    } catch (e) {
      this.setState({ loading: false })
      console.log(e)
      Alert.alert('Error', e.message, [
        { text: s.strings.string_ok }
      ])
      //dispatch(displayErrorAlert(e.message))
    }
  }

  //Arrow func doesn't work for some reason
  onSetNextFocus (focus) {
    const newState = {
      ...{
        focusName: false,
        focusAddress: false,
        focusCity: false,
        focusState: false,
        focusZip: false,
      }, [focus]: true
    };
    this.setState(newState)
  }

  //Arrow func doesn't work for some reason
  noFocus () {
    Keyboard.dismiss()
    this.setState({
      focusName: false,
      focusAddress: false,
      focusCity: false,
      focusState: false,
      focusZip: false,
    })
  }

  renderProduct = () => {
    const {selectedProduct} = this.props;

    return (
      <ScrollView>
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
              <T style={styles.headerText}>Enter Your Address:</T>

            </View>
            <View style={{width: '100%', flex: 1}}>
              <FormField
                onChangeText={this.nameChange}
                style={[styles.addressInput]}
                label='Name'
                value={this.state.name}
                autoFocus={this.state.focusName}
                forceFocus={this.state.focusName}
                onFocus={this.onSetNextFocus.bind(this, 'focusName')}
                onSubmitEditing={this.onSetNextFocus.bind(this, 'focusAddress')}
              />

              <FormField
                onChangeText={this.addressChange}
                style={[styles.addressInput]}
                label='Address'
                value={this.state.address}
                forceFocus={this.state.focusAddress}
                onFocus={this.onSetNextFocus.bind(this, 'focusAddress')}
                onSubmitEditing={this.onSetNextFocus.bind(this, 'focusCity')}
              />

              <FormField
                onChangeText={this.cityChange}
                style={[styles.addressInput]}
                label='City'
                value={this.state.city}
                forceFocus={this.state.focusCity}
                onFocus={this.onSetNextFocus.bind(this, 'focusCity')}
                onSubmitEditing={this.onSetNextFocus.bind(this, 'focusState')}
              />

              <FormField
                onChangeText={this.stateChange}
                style={[styles.addressInput]}
                label='State'
                value={this.state.state}
                forceFocus={this.state.focusState}
                onFocus={this.onSetNextFocus.bind(this, 'focusState')}
                onSubmitEditing={this.onSetNextFocus.bind(this, 'focusZip')}
              />

              <FormField
                onChangeText={this.zipChange}
                style={[styles.addressInput]}
                label='ZIP'
                value={this.state.zip}
                forceFocus={this.state.focusZip}
                onFocus={this.onSetNextFocus.bind(this, 'focusZip')}
                onSubmitEditing={this.noFocus.bind(this)}
              />

              <T>
                You will receive a mailer in 2-3 business days. Place the book in the mailer, apply the
                enclosed shipping label, and drop it in the mail. That’s it!
              </T>
              {
                this.state.loading
                  ?
                    (<View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                      <ActivityIndicator size="large" style={{ flex: 1, alignSelf: 'center' }} />
                    </View>)
                  :
                    (<Button title="Finish" onPress={() => this._onPress()} />)
              }
            </View>
            {/*<T style={{marginTop: 10}}>Description: </T>*/}
            {/*<T>{selectedProduct.productInfo.description}</T>*/}
          </View>
        </View>
      </ScrollView>
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
