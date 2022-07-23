import React, {useImperativeHandle, useRef, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import HMSMap, {HMSMarker, MapTypes} from '@hmscore/react-native-hms-map';
import getAndroidDeviceType from './getAndroidDeviceType';

const COLOR_TEXT_SECONDARY = 'rgb(2, 137, 149)';

const CustomMap = React.forwardRef((props, ref) => {
  const mapRef = useRef();
  const {
    style,
    showsUserLocation,
    showsMyLocationButton,
    showsScale,
    showsCompass,
    initialRegion,
    onMapReady,
    onPress,
    onLayout,
    selectedLocation,
  } = props;

  const [deviceType, setDeviceType] = useState(); // either gms or hms

  useEffect(() => {
    const get = async () => {
      const result = await getAndroidDeviceType();
      setDeviceType(result);
    };
    get();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      // override original Map methods
      animateToRegion: (region, animation = 1000) => {
        if (deviceType === 'hms') {
          mapRef &&
            mapRef.current.setCameraPosition({
              target: {latitude: region.latitude, longitude: region.longitude},
              zoom: 18,
              tilt: 0,
              bearing: 0,
            });
        } else {
          mapRef && mapRef.current.animateToRegion(region, animation);
        }
      },
    };
  });

  if (deviceType === 'hms') {
    return (
      <HMSMap
        ref={mapRef}
        style={style}
        mapType={MapTypes.NORMAL}
        myLocationEnabled={showsUserLocation}
        myLocationButtonEnabled={showsMyLocationButton}
        compassEnabled={showsCompass}
        rotateGesturesEnabled={true}
        scrollGesturesEnabled={true}
        tiltGesturesEnabled={true}
        zOrderOnTop={false}
        zoomControlsEnabled={true}
        zoomGesturesEnabled={true}
        buildingsEnabled={true}
        scrollGesturesEnabledDuringRotateOrZoom={true}
        camera={{
          target: {
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          },
          zoom: 8,
          bearing: 0,
          tilt: 0,
        }}
        onMapReady={onMapReady} //onMapReady
        onMapClick={onPress} //onPress
        onMapLongClick={onPress} // onPress
        useAnimation={true}
        animationDuration={1000}
        markerClustering={true}>
        {Object.keys(selectedLocation).length > 0 && (
          <HMSMarker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            icon={{hue: 180}}
          />
        )}
      </HMSMap>
    );
  }

  return (
    <MapView
      ref={mapRef}
      style={style}
      provider="google"
      showsUserLocation={showsUserLocation}
      showsMyLocationButton={showsMyLocationButton}
      showsScale={showsScale}
      showsCompass={showsCompass}
      toolbarEnabled={false}
      initialRegion={initialRegion}
      onMapReady={onMapReady}
      onPress={onPress}
      onLayout={onLayout}>
      {Object.keys(selectedLocation).length > 0 && (
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          pinColor={COLOR_TEXT_SECONDARY}
        />
      )}
    </MapView>
  );
});

export default CustomMap;
