// @flow

import React, { Component } from 'react'
import moment from 'moment'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as Constants from '../../../../constants/indexConstants'
import { TransactionVLListSceneStyles } from '../../../../styles/indexStyles'
import Gradient from '../../../UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import s from '../../../../locales/strings'
import T from '../../components/FormattedText'

const BALANCE_TEXT = s.strings.fragment_wallets_balance_text
const TITLE = s.strings.fragment_wallets_transaction_history_text

export default class TransactionVLList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      //token: {},
      //balance: 0,
      //transactionList: [],
      //firstTimeLoading: false
    }
  }

  // componentDidMount () {
  //   if (this._interval) {
  //     clearInterval(this._interval)
  //   }
  //   this._interval = setInterval(() => {
  //     if (this.state.firstTimeLoading && this.props.currentUsername) {
  //       this._refreshData(this.props.currentUsername, false)
  //       console.log('Timer')
  //     }
  //   }, 5 * 1000)
  // }
  //
  // componentWillUnmount () {
  //   clearInterval(this._interval)
  // }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', nextProps.currentUsername)
    if (nextProps.currentUsername && nextProps.currentUsername !== this.props.currentUsername) {
      this._refreshData(nextProps.currentUsername)
    }/* else if (this.props.currentUsername) {
      this._refreshData(this.props.currentUsername)
    }*/
  }

  async getData (token) {
    let transaction = await this.props.getTransactions(token.access_token)
    let balance = await this.props.getBalance(token.access_token)
    transaction = (transaction && transaction.transaction_history) ? transaction.transaction_history.sort(function (a, b) { return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0) }).reverse() : []
    balance = (balance && balance.balance) ? balance.balance : 0
    console.log('balance', balance)
    console.log('transaction', transaction)
    this.props.changeBalance({ balance })
    this.props.getTransaction({ transactionList: transaction })
    this.props.setFirstTimeLoading()
    // this.setState({ balance: balance, transactionList: transaction })
  }

  async _refreshData (username) {
    if (username) {
      const token = await this.props.getToken(username)
      console.log('_getToken', token)
      if (!token.error) {
        this.props.addToken({ token })
        // this.setState({ token: token })
      }
      this.getData(this.props.token)
    }
  }

  _renderTransactionList = (style: any, list: any) => {
    return list && list.length
      ? (<FlatList
        style={{flex: 1, width: '100%'}}
        data={list}
        renderItem={ this._renderItem }
      />)
      : (<View><Text style={style.transactionText}>Transaction history is empty</Text></View>)
  };

  _renderItem = ({item}) => {
    const style = TransactionVLListSceneStyles
    const statusStyle = function (status) { return status.toLowerCase() === 'successful' ? style.itemStatusSuccess : style.itemStatusFail }
    return (
      <View style={style.renderItemWrapper}>
        <View style={style.renderMainData}>
          <Text style={style.renderItem}>
            {Constants.getStrategy(item.strategy)} ${item.user_amount.toFixed(2)}
            {item.strategy === 'INCREASE_CAPACITY' && ('\n' + Constants.getStrategy(Constants.FEE) + ' $' + item.usd.toFixed(2))}
          </Text>
        </View>
        <View style={style.renderDetails}>
          <Text style={style.renderItem}>{moment(item.time).format('MM/DD/YYYY HH:mm:ss')}</Text>
          <Text style={[style.renderItem, statusStyle(item.status)]}>{item.status}</Text>
        </View>
      </View>
    )
  };

  render () {
    const style = TransactionVLListSceneStyles
    const list = this.props.transactionList

    return (
      <SafeAreaView>
        <View style={style.container}>
          <Gradient style={style.gradient} />

          <View style={[style.totalBalanceBox]}>
            <View style={[style.totalBalanceWrap]}>
              <View style={[style.totalBalanceHeader]}>
                <T style={[style.totalBalanceText]}>{BALANCE_TEXT}</T>
              </View>
              <View style={[style.currentBalanceBoxDollarsWrap]}>
                <T style={[style.currentBalanceBoxDollars]}>
                  {!this.props.firstTimeLoading ? (
                    <Text>Loading...</Text>
                  ) : (
                    '$' + this.props.balance.toFixed(2)
                  )}
                </T>
              </View>
            </View>
          </View>

          <View style={[style.walletsBox]}>
            <Gradient style={[style.walletsBoxHeaderWrap]}>
              <View style={[style.walletsBoxHeaderTextWrap]}>
                <T style={style.walletsBoxHeaderText}>{TITLE}</T>
              </View>
            </Gradient>
          </View>

          <View style={[style.listsContainer]}>
            {
              !this.props.firstTimeLoading ? (
                <Text style={style.loadingItem}>Loading...</Text>
              ) : (
                this._renderTransactionList(style, list)
              )
            }
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
