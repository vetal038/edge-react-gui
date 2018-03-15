// @flow

import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { TransactionVLListSceneStyles } from '../../../../styles/indexStyles'
import Gradient from '../../../UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'

export default class TransactionVLList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _renderItem = ({item}) => {
    const style = TransactionVLListSceneStyles
    return (
      <View style={style.renderItemWrapper}>
        <Text style={style.renderItem}>{item.id}</Text>
      </View>
    )
  };

  render () {
    const style = TransactionVLListSceneStyles
    const list = [{id: 1}, {id: 2}, {id: 3}]

    return (
      <SafeAreaView>
        <Gradient style={[style.scene]}>
          <Gradient style={style.gradient} />
          <View style={style.wrapperView}>
            <View style={style.balanceView}>
              <Text>Balance</Text>
              <Text>$0.00</Text>
            </View>
            <FlatList
              style={{flex: 1, width: '100%'}}
              data={list}
              renderItem={ this._renderItem }
            />
          </View>
        </Gradient>
      </SafeAreaView>
    )
  }
}
