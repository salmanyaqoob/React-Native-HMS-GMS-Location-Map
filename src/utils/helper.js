import {Platform} from 'react-native';

function isIOS() {
  return Platform.OS === 'ios';
}

function isAndroid() {
  return Platform.OS === 'android';
}

export {isIOS, isAndroid};
