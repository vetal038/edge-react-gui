// @flow

import { Text } from 'native-base'
import React, { Component } from 'react'
import { Image, TouchableHighlight, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { sprintf } from 'sprintf-js'

import logoutImage from '../../../../../assets/images/sidenav/logout.png'
import switchImage from '../../../../../assets/images/sidenav/switch.png'
import settings from '../../../../../assets/images/sidenav/settings.png'
import s from '../../../../../locales/strings.js'
import styles from '../style'
import UserList from './UserListConnector'
import req from '../../../../../http/user'

const LOGOUT_TEXT = sprintf(s.strings.settings_button_logout)
const SWITCH_TO_PROD_MODE = sprintf(s.strings.settings_button_switch_to_prod_mode)
const SWITCH_TO_DEV_MODE = sprintf(s.strings.settings_button_switch_to_dev_mode)
const SETTINGS_TEXT = sprintf(s.strings.settings_title)

type Props = {
  logout: (username?: string) => void,
  onPressOption: () => void
}
type State = {}

export default class Main extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      isDevMode: true // true - `dev`, false - `prod`. Immediately rewriting after component mounting
    }
  }
  onLogout = () => {
    this.props.logout()
    req.deletePushNotificationToken()
  }
  async onSwitchMode (isDevMode) {
    this.props.setMode(isDevMode)
    this.setState({isDevMode: !isDevMode})
    // this.props.switchMode()
  }
  async _getMode () {
    const mode = await this.props.getMode()
    this.setState({isDevMode: mode})
  }

  componentDidMount () {
    this._getMode()
  }

  render () {
    return this.props.usersView ? (
      <UserList />
    ) : (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.others.container}>
          <TouchableHighlight
            style={styles.others.iosTouchableHighlight}
            underlayColor={styles.main.iosTouchableHighlightUnderlayColor}
            onPress={this.onSwitchMode.bind(this, this.state.isDevMode)}
          >
            <View style={[styles.others.link, styles.others.borderVertical, { flex: 1 }]}>
              <View style={styles.iconImageContainer}>
                <Image style={styles.iconImage} source={switchImage} />
              </View>
              <View style={styles.others.textContainer}>
                <Text style={styles.others.text}>{this.state.isDevMode ? SWITCH_TO_PROD_MODE : SWITCH_TO_DEV_MODE}</Text>
              </View>
            </View>
          </TouchableHighlight>
          {/*<TouchableHighlight*/}
            {/*style={styles.others.iosTouchableHighlight}*/}
            {/*underlayColor={styles.main.iosTouchableHighlightUnderlayColor}*/}
            {/*onPress={Actions.settingsOverviewTab}*/}
          {/*>*/}
            {/*<View style={[styles.others.link, styles.others.borderBottom, { flex: 1 }]}>*/}
              {/*<View style={styles.iconImageContainer}>*/}
                {/*<Image style={styles.iconImage} source={settings} />*/}
              {/*</View>*/}
              {/*<View style={styles.others.textContainer}>*/}
                {/*<Text style={styles.others.text}>{SETTINGS_TEXT}</Text>*/}
              {/*</View>*/}
            {/*</View>*/}
          {/*</TouchableHighlight>*/}
          <TouchableHighlight
            style={styles.others.iosTouchableHighlight}
            underlayColor={styles.main.iosTouchableHighlightUnderlayColor}
            onPress={this.onLogout}
          >
            <View style={[styles.others.link, styles.others.borderVertical, { flex: 1 }]}>
              <View style={styles.iconImageContainer}>
                <Image style={styles.iconImage} source={logoutImage} />
              </View>
              <View style={styles.others.textContainer}>
                <Text style={styles.others.text}>{LOGOUT_TEXT}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
