// @flow

import React, { Component } from 'react'
import moment from 'moment-timezone'
import { Text, View, FlatList } from 'react-native'
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
    this.state = {}
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log('componentWillReceiveProps', nextProps.currentUsername)
  //   if (nextProps.currentUsername && nextProps.currentUsername !== this.props.currentUsername) {
  //     this._refreshData(nextProps.currentUsername)
  //   }
  // }

  getData = async (token) => {
    const walletInfo = await this.props.getWallet(token.access_token)
    if (walletInfo && !walletInfo.error) {
      this.props.fetchWallet({ wallet: walletInfo })
    }
    this.props.setFirstTimeLoading()
  }

  _refreshData = async (username) => {
    if (username) {
      const token = await this.props.getToken(username)
      console.log('_getToken', token)
      if (!token.error) {
        this.props.addToken({ token })
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
            {Constants.getStrategy(item.strategy || item.type)}
            {(item.strategy)
              ? (' $' + item.dollars.toFixed(2) + '/V' + item.vaults)
              : ((item.type && item.type === 'LIMIT') ? (' $' + item.new_state.toFixed(2)) : null)
            }
            {(item.type) && ('\n' + Constants.getStrategy(Constants.FEE) + ' $' + item.cost.toFixed(2))}
          </Text>
        </View>
        <View style={style.renderDetails}>
          <Text style={style.renderItem}>{moment.utc(item.created_date + ' ' + item.created_time, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY HH:mm:ss')}</Text>
          {item.status && (<Text style={[style.renderItem, statusStyle(item.status)]}>{item.status}</Text>)}
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
                    '$' + this.props.wallet.dollars.toFixed(2) + ' / V' + this.props.wallet.vaults
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
