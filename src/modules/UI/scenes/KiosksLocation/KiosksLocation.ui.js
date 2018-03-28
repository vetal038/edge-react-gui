// @flow

import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { View, Text, Image, PermissionsAndroid } from 'react-native'
import atmIcon from '../../../../assets/images/map/atm.png'
import userIcon from '../../../../assets/images/map/user.png'
import { Actions } from 'react-native-router-flux'
import { KiosksLocationSceneStyles } from '../../../../styles/indexStyles'
import Gradient from '../../../UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import s from '../../../../locales/strings'
import T from '../../components/FormattedText'

export default class KiosksLocation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error_message: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      atmList: [
        {
          lat: 37.762586,
          lng: -122.434669
        },
        {
          lat: 34.071420,
          lng: -118.357130
        }
      ]
    }
  }

  componentDidMount () {
    this.getLocationPermission()
  }

  componentWillUnmount () {
    this.watchID && navigator.geolocation.clearWatch(this.watchID)
  }

  async getLocationPermission (username, update) {
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
            latitude:       position.coords.latitude,
            longitude:      position.coords.longitude,
            latitudeDelta:  0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
          }
          this.onRegionChange(region, region.latitude, region.longitude)
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

  onRegionChange (region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    })
  }

  render () {
    const style = KiosksLocationSceneStyles
    const {atmList} = this.state

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
                      key={point.lat}
                      coordinate={{
                        latitude: point.lat,
                        longitude: point.lng
                      }}
                      title="ATM"
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
