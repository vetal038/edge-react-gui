// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { View, PermissionsAndroid } from 'react-native'
import atmIcon from '../../../../assets/images/map/atm.png'
import userIcon from '../../../../assets/images/map/user.png'
import { Actions } from 'react-native-router-flux'
import { KiosksLocationSceneStyles } from '../../../../styles/indexStyles'
import Gradient from '../../../UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'

export default class KiosksLocation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error_message: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null
    }
  }

  componentDidMount () {
    this.getLocationPermission()
  }

  componentWillUnmount () {
    this.watchID && navigator.geolocation.clearWatch(this.watchID)
  }

  getLocationPermission = async (username, update) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You received access to ACCESS_FINE_LOCATION')

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              lastLat: position.coords.latitude,
              lastLong: position.coords.longitude,
              error_message: null
            })
          },
          (error) => this.setState({ error_message: error.message }),
          { enableHighAccuracy: true, timeout: 10000 }
        )

        this.watchID = navigator.geolocation.watchPosition((position) => {
          console.log('position', position)

          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          this.onUserMoves(region, region.latitude, region.longitude)
        })
      } else {
        console.log('You didn\'t receive access to ACCESS_FINE_LOCATION')
        this.setState({ error_message: 'Location permission denied' })
      }
    } catch (err) {
      console.warn(err)
      this.setState({ error_message: 'Unknown error' })
    }
  }

  onUserMoves = (region, lastLat, lastLong) => {
    this.setState({
      mapRegion: {...region, latitudeDelta: 0.00922 * 1.5, longitudeDelta: 0.00421 * 1.5},
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    })
  }

  onRegionChange = (region) => {
    this.setState({
      mapRegion: {...region, latitudeDelta: 0.00922 * 1.5, longitudeDelta: 0.00421 * 1.5}
    })
  }

  _deviceDescription = (devices) => {
    let message = 'Device' + (devices.length > 1 ? 's' : '') + ': '
    message += _.map(devices, 'info').join(', ')
    return message
  }

  shouldComponentUpdate (nextProps, nextState) {
    return _.differenceWith(nextProps.atmList, this.props.atmList, _.isEqual).length
  }

  render () {
    const style = KiosksLocationSceneStyles
    const {atmList} = this.props

    return (
      <SafeAreaView>
        <View style={style.container}>
          <Gradient style={style.gradient} />

          <View style ={style.mapContainerWrapper}>
            <View style ={style.mapContainer}>
              <MapView
                style={style.map}
                region={this.state.mapRegion}
              >
                {(this.state.lastLat && this.state.lastLong) && <Marker
                  image={userIcon}
                  coordinate={{
                    latitude: (this.state.lastLat) || 39.801548,
                    longitude: (this.state.lastLong) || -101.898148
                  }}
                  title="It's you"
                />}
                {
                  atmList.map(point => {
                    return <Marker
                      image={atmIcon}
                      key={point.location_id}
                      coordinate={{
                        latitude: point.latitude,
                        longitude: point.longitude
                      }}
                      title={point.business_name}
                      description={this._deviceDescription(point.devices)}
                    />
                  })
                }
              </MapView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
