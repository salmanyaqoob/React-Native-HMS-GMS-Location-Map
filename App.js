/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import CustomMap from './src/utils/customMap';
import {getCurrentPosition} from './src/utils/customLocation';

import {isAndroid, isIOS} from './src/utils/helper';
import {
  checkForLocationPermission,
  requestForLocationPermission,
} from './src/utils/permissions';
import {RESULTS} from 'react-native-permissions';

let mapView;

const SAUDI_CENTER_LAT = 24.785416;
const SAUDI_CENTER_LNG = 44.929112;
const SAUDI_CENTER_LAT_DELTA = 15;
const SAUDI_CENTER_LNG_DELTA = 15;

// onMapReady={() => this.animateToCurrentLocation()}
// onPress={this.onMapTapped}
const App: () => Node = () => {
  const [fetchingCurrentLocation, setFetchingCurrentLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const animateToCurrentLocation = () => {
    console.log('permission', 'call user permission');
    if (isIOS()) {
      getCurrentUserLocation();
    } else {
      requestForLocationPermissionNow();
    }
  };
  const requestForLocationPermissionNow = async () => {
    console.log('requestForLocationPermission', 'requestForLocationPermission');
    try {
      const check = await checkForLocationPermission();
      if (check === RESULTS.GRANTED) {
        getCurrentUserLocation();
      } else {
        const request = await requestForLocationPermission();
        if (request === RESULTS.GRANTED) {
          getCurrentUserLocation();
        } else {
          setFetchingCurrentLocationWithDelay();
        }
      }
    } catch (error) {
      console.log('Error fetching location permission', error);
      setFetchingCurrentLocationWithDelay();
    }
  };

  const setFetchingCurrentLocationWithDelay = (
    isFetching = false,
    delay = 250,
  ) => {
    setTimeout(() => {
      setFetchingCurrentLocation(isFetching);
    }, delay);
  };

  const getCurrentUserLocation = async () => {
    setFetchingCurrentLocation(true);

    try {
      const position = await getCurrentPosition({
        enableHighAccuracy: Platform.OS === 'ios',
        timeout: 30000,
        maximumAge: 1000,
      });
      if (position) {
        mapView &&
          mapView.animateToRegion(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000,
          );

        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setSelectedLocation(coordinates);
        setFetchingCurrentLocation(false);
      }
    } catch (error) {
      console.log('error fetching user location', error);
      setFetchingCurrentLocation(false);
    }
  };

  const onMapTapped = e => {
    const {coordinate} = e.nativeEvent;
    console.log('onMapTab', e.nativeEvent);
    setSelectedLocation(coordinate);
    mapView.animateToRegion(
      {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      200,
    );
  };
  // onMapReady={() => animateToCurrentLocation()}
  return (
    <CustomMap
      ref={ref => {
        mapView = ref;
      }}
      style={styles.map}
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      showsScale={true}
      initialRegion={{
        latitude: SAUDI_CENTER_LAT,
        longitude: SAUDI_CENTER_LNG,
        latitudeDelta: SAUDI_CENTER_LAT_DELTA,
        longitudeDelta: SAUDI_CENTER_LNG_DELTA,
      }}
      onLayout={event => {
        const {height: mapHeight} = event.nativeEvent.layout;
        this.setState({
          mapHeight,
        });
      }}
      onMapReady={() => animateToCurrentLocation()}
      onPress={onMapTapped}
      selectedLocation={selectedLocation}
    />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
