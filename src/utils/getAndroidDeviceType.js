import DeviceInfo from 'react-native-device-info';

const getAndroidDeviceType = async () => {
  const [hasGms, hasHms] = await Promise.all([
    DeviceInfo.hasGms(),
    DeviceInfo.hasHms(),
  ]);
  if (hasGms) {
    return 'gms';
  }
  if (hasHms) {
    return 'hms';
  }
};

export default getAndroidDeviceType;
