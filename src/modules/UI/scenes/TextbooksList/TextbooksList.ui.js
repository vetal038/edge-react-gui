// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Animated, FlatList, Image, TouchableOpacity, View, Text } from 'react-native'
import Gradient from '../../../UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import s from '../../../../locales/strings'
import T from '../../components/FormattedText'
import * as UTILS from '../../../utils'
import { intl } from '../../../../locales/intl'
import styles from './style'
import {default as walletStyles} from '../WalletList/style'

const SHOW_BALANCE_TEXT = s.strings.string_show_balance
const BALANCE_TEXT = s.strings.fragment_wallets_balance_text
const SELL_BOOK = s.strings.string_sell_book

export default class TextbooksList extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      balanceBoxVisible: true,
    }
  }

  onHandleOnBalanceBoxPress = () => this.setState({ balanceBoxVisible: !this.state.balanceBoxVisible })
  balanceBox = (fiatBalanceString: string) => {
    return (
      <View style={[walletStyles.totalBalanceBox]}>
        <View style={[walletStyles.totalBalanceWrap]}>
          <View style={[walletStyles.totalBalanceHeader]}>
            <T style={[walletStyles.totalBalanceText]}>{BALANCE_TEXT}</T>
          </View>
          <View style={[walletStyles.currentBalanceBoxDollarsWrap]}>
            <T style={[walletStyles.currentBalanceBoxDollars]}>{fiatBalanceString}</T>
          </View>
        </View>
      </View>
    )
  }

  hiddenBalanceBox = () => {
    return (
      <View style={[walletStyles.totalBalanceBox]}>
        <View style={[walletStyles.totalBalanceWrap]}>
          <View style={[walletStyles.hiddenBalanceBoxDollarsWrap]}>
            <T style={[walletStyles.currentBalanceBoxDollars]}>{SHOW_BALANCE_TEXT}</T>
          </View>
        </View>
      </View>
    )
  }

  tallyUpTotalCrypto = () => {
    const temporaryTotalCrypto = {}
    for (const parentProp in this.props.wallets) {
      for (const balanceProp in this.props.wallets[parentProp].nativeBalances) {
        if (!temporaryTotalCrypto[balanceProp]) {
          temporaryTotalCrypto[balanceProp] = 0
        }
        const nativeBalance = this.props.wallets[parentProp].nativeBalances[balanceProp]
        if (nativeBalance && nativeBalance !== '0') {
          let denominations
          if (this.props.settings[balanceProp]) {
            denominations = this.props.settings[balanceProp].denominations
          } else {
            const tokenInfo = this.props.settings.customTokens.find(token => token.currencyCode === balanceProp)
            denominations = tokenInfo.denominations
          }
          const exchangeDenomination = denominations.find(denomination => denomination.name === balanceProp)
          const nativeToExchangeRatio: string = exchangeDenomination.multiplier

          const cryptoAmount: number = parseFloat(UTILS.convertNativeToExchange(nativeToExchangeRatio)(nativeBalance))
          temporaryTotalCrypto[balanceProp] = temporaryTotalCrypto[balanceProp] + cryptoAmount
        }
      }
    }
    const totalBalance = this.calculateTotalBalance(temporaryTotalCrypto)
    return totalBalance
  }

  calculateTotalBalance = (values: any) => {
    let total = 0
    for (const currency in values) {
      const addValue = this.props.currencyConverter.convertCurrency(currency, 'iso:' + this.props.settings.defaultFiat, values[currency])
      total = total + addValue
    }
    return intl.formatNumber(total, { toFixed: 2 })
  }

  onPressSellBook = () => this.setState({ balanceBoxVisible: !this.state.balanceBoxVisible })

  _renderSellingList = () => {
    const {list, fetchTextbooksLoading, fetchTextbooksError} = this.props;

    if (fetchTextbooksLoading) {
      return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" style={{ flex: 1, alignSelf: 'center' }} />
        </View>
      )
    }
    if (fetchTextbooksError) {
      return (
        <View style={[{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }]}>
          <T style={styles.noResults}>{fetchTextbooksError}</T>
        </View>
      )
    }

    return list && list.length
      ? (<FlatList
        style={{flex: 1, width: '100%'}}
        data={list}
        renderItem={ this._renderItem }
      />)
      : (<View><T style={styles.noHistory}>Selling history is empty</T></View>)
  };


  _getImage = (imagesCSV) => {
    return 'https://images-na.ssl-images-amazon.com/images/I/' + imagesCSV[0]
  }


  _renderItem = ({item}) => {
    return (
      <View style={{
                      borderBottomColor: '#000',
                      borderBottomWidth: 2,
                      paddingBottom: 5,
                      marginBottom: 5,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row'
        }}>
        <View style={styles.sceneBoxImageBlock}>
          {
            item.product.imagesCSV && item.product.imagesCSV.length ? (
              <Image
                style={{height: 100, width: 60, marginHorizontal: 10}}
                source={{uri: this._getImage(item.product.imagesCSV)}}
              />
            )
              :
              (<T>No image</T>)
          }
        </View>
        <View>
          <T style={{fontSize: 18, fontWeight: '700'}}>{item.product.productInfo.title}</T>
          <T>Author: {item.product.productInfo.author}</T>
          <T>Status: Pending</T>
          <T>Price: 0.00BTC</T>
        </View>
      </View>
    )
  };

  render () {
    const { settings } = this.props

    let fiatBalanceString
    const fiatSymbol = settings.defaultFiat ? UTILS.getFiatSymbol(settings.defaultFiat) : ''
    if (fiatSymbol.length !== 1) {
      fiatBalanceString = this.tallyUpTotalCrypto() + ' ' + settings.defaultFiat
    } else {
      fiatBalanceString = fiatSymbol + ' ' + this.tallyUpTotalCrypto() + ' ' + settings.defaultFiat
    }

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Gradient style={styles.gradient} />

          <TouchableOpacity onPress={this.onHandleOnBalanceBoxPress}>
            {this.state.balanceBoxVisible ? this.balanceBox(fiatBalanceString) : this.hiddenBalanceBox()}
          </TouchableOpacity>

          <View style={[styles.listContainer]}>
            {(this._renderSellingList())}
          </View>

          {/*<TouchableOpacity style={styles.bottomButtonWrapper} onPress={this.onPressSellBook}>*/}
            {/*<View style={styles.bottomButton}>*/}
              {/*<T style={styles.bottomButtonText}>{SELL_BOOK}</T>*/}
            {/*</View>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </SafeAreaView>
    )
  }
}
