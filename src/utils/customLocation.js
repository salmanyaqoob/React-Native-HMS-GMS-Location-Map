import Geolocation from 'react-native-geolocation-service';
import HMSLocation from '@hmscore/react-native-hms-location';
import getAndroidDeviceType from './getAndroidDeviceType';
function logMsg(...args) {
  console.log(...args);
}

export const getCurrentPosition = async options => {
  const deviceType = await getAndroidDeviceType();

  if (deviceType === 'hms') {
    return asyncGetCurrentPositionHuawei();
  }

  return asyncGetCurrentPosition(options);
};

const asyncGetCurrentPosition = options => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const asyncGetCurrentPositionHuawei = async () => {
  const hasPermission = await HMSLocation.FusedLocation.Native.hasPermission();
  if (hasPermission) {
    return new Promise(async (resolve, reject) => {
      const locationSettingsResponse = await checkLocationSettingAsync();
      if (
        locationSettingsResponse === true ||
        (locationSettingsResponse.locationSettingsStates.isGpsPresent ===
          true &&
          locationSettingsResponse.locationSettingsStates.isGpsUsable ===
            true &&
          locationSettingsResponse.locationSettingsStates.isLocationUsable ===
            true)
      ) {
        try {
          const lastLocation = await getLastLocationAsync();
          if (lastLocation != null) {
            const coordinates = {
              coords: {
                latitude: lastLocation.latitude,
                longitude: lastLocation.longitude,
              },
              lastLocation,
            };
            resolve(coordinates);
          }
        } catch (execption) {
          logMsg('Failed to get last location', execption);

          const requestLocationUpdatesWithCallback =
            await requestLocationUpdatesWithCallbackAsync();
          if (requestLocationUpdatesWithCallback) {
            const {requestCode} = requestLocationUpdatesWithCallback;
            logMsg('id', requestCode);
          } else {
            logMsg('Exception while requestLocationUpdatesWithCallback ');
          }

          HMSLocation.FusedLocation.Events.addFusedLocationEventListener(
            location => {
              const position = location.hwLocationList[0];
              const coordinates = {
                coords: {
                  latitude: position.latitude,
                  longitude: position.longitude,
                },
                position,
              };
              resolve(coordinates);
            },
          );
        }
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      reject('permission_reject');
    });
  }
};

const checkLocationSettingAsync = async () => {
  const locationRequest = {
    id: 'locationRequest' + Math.random() * 10000,
    priority:
      HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
    interval: 5000,
    numUpdates: 20,
    fastestInterval: 6000,
    expirationTime: 100000,
    expirationTimeDuration: 100000,
    smallestDisplacement: 0,
    maxWaitTime: 1000.0,
    needAddress: false,
    language: 'en',
    countryCode: 'en',
  };

  const locationSettingsRequest = {
    locationRequests: [locationRequest],
    alwaysShow: false,
    needBle: false,
  };

  const locationSettingsResponse =
    await HMSLocation.FusedLocation.Native.checkLocationSettings(
      locationSettingsRequest,
    );
  return locationSettingsResponse;
};

const getLastLocationAsync = async () =>
  await HMSLocation.FusedLocation.Native.getLastLocation();

const requestLocationUpdatesWithCallbackAsync = async () => {
  const LocationRequest = {
    id: 'e0048e' + Math.random() * 10000,
    priority:
      HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
    interval: 3,
    numUpdates: 1,
    fastestInterval: 1000.0,
    expirationTime: 1000.0,
    expirationTimeDuration: 1000.0,
    smallestDisplacement: 0.0,
    maxWaitTime: 1000.0,
    needAddress: false,
    language: 'en',
    countryCode: 'en',
  };
  return await HMSLocation.FusedLocation.Native.requestLocationUpdatesWithCallback(
    LocationRequest,
  );
};
