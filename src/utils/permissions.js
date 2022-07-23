import {
  check,
  PERMISSIONS,
  checkMultiple,
  request,
} from 'react-native-permissions';
import {isIOS, isAndroid} from './helper';

export const checkForLocationPermission = async () => {
  let result = '';
  if (isIOS()) {
    result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else if (isAndroid()) {
    result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
  return result;
};
export const requestForLocationPermission = async () => {
  let result = '';
  if (isIOS()) {
    result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else if (isAndroid()) {
    result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
  return result;
};
