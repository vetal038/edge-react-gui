// @flow

import React, { Component } from 'react'
import moment from 'moment'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { TransactionVLListSceneStyles } from '../../../../styles/indexStyles'
import Gradient from '../../../UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import s from '../../../../locales/strings'
import T from '../../components/FormattedText'

const BALANCE_TEXT = s.strings.fragment_wallets_balance_text

export default class TransactionVLList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: {},
      balance: 0,
      transactionList: [],
      updating: false,
      firstTimeLoading: false
    }
  }

  componentDidMount () {
    if (this._interval) {
      clearInterval(this._interval)
    }
    this._interval = setInterval(() => {
      if (this.state.firstTimeLoading && this.props.currentUsername) {
        this._refreshData(this.props.currentUsername, false)
        console.log('Timer')
      }
    }, 5 * 1000)
  }

  componentWillUnmount () {
    clearInterval(this._interval)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', nextProps.currentUsername)
    if (nextProps.currentUsername && nextProps.currentUsername !== this.props.currentUsername) {
      this._refreshData(nextProps.currentUsername, false)
    } else if (this.props.currentUsername) {
      this._refreshData(this.props.currentUsername, false)
    }
  }

  async getData (token) {
    const transaction = await this.props.getTransactions(token.access_token)
    const balance = await this.props.getBalance(token.access_token)
    console.log('balance', balance)
    console.log('transaction', transaction)
    this.setState({ balance: balance.balance, transactionList: transaction.transaction_history.sort(function (a, b) { return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0) }).reverse() })
  }

  async _refreshData (username, update) {
    if (username) {
      if (update) {
        this.setState({ updating: true })
      }
      const token = await this.props.getToken(username)
      console.log('_getToken', token)
      if (!token.error) {
        this.setState({ token: token })
      }
      this.getData(this.state.token)
      this.setState({ updating: false })
      if (!update) {
        this.setState({ firstTimeLoading: true })
      }
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
            {item.strategy} ${item.user_amount.toFixed(2)}
            {item.strategy === 'INCREASE_CAPACITY' && ('\nFEE $' + item.usd.toFixed(2))}
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
    const list = this.state.transactionList
    //const title = !this.state.updating ? 'Refresh Data' : 'Refreshing...'
    const title = 'Transaction History'
    const { firstTimeLoading, balance } = this.state

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
                  {!firstTimeLoading ? (
                    <Text>Loading...</Text>
                  ) : (
                    '$' + balance.toFixed(2)
                  )}
                </T>
              </View>
            </View>
          </View>

          <View style={[style.walletsBox]}>
            <Gradient style={[style.walletsBoxHeaderWrap]}>
              <View style={[style.walletsBoxHeaderTextWrap]}>
                {/*<TouchableOpacity onPress={this._refreshData.bind(this, this.props.currentUsername, true)}>*/}
                  <T style={style.walletsBoxHeaderText}>{title}</T>
                {/*</TouchableOpacity>*/}
              </View>
            </Gradient>
          </View>

          <View style={[style.listsContainer]}>
            {
              !firstTimeLoading ? (
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
