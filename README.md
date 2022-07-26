# React Native Google & Huawei (Map Location) Adaptation Code

<img src="./screenshots/gms-map.gif" width="350"> <img src="./screenshots/hms-map.gif" width="350">

## Overview

This repo is a sample code of Google & Huawei Map/Locatio Adaptation layer for React Native application developers. You can use this sample code to implement the Map/Location capbility in your React Native Project. 

## Download APK

Donwload release apk click [here](https://github.com/salmanyaqoob/React-Native-HMS-GMS-Location-Map/raw/master/apks/rn-maplocation-release.apk).

## Packages implemented

-   "@hmscore/react-native-hms-location": "^6.4.0-300"
-   "@hmscore/react-native-hms-map": "^6.3.1-304"
-   "react-native-geolocation-service": "^5.3.0"
-   "react-native-maps": "^1.1.0"
-   "react-native-permissions": "^3.6.0"
-   "patch-package": "^6.4.7"
-   "postinstall-postinstall": "^2.1.0"
-   "react-native-device-info": "^10.0.2"

## Patches

**1. Huawie Location plugin**

    @hmscore/react-native-hms-location/android/build.gradle
    apply plugin: 'maven' to apply plugin: 'maven-public'

**2. Huawie Map plugin**

    @hmscore/react-native-hms-map/android/build.gradle
    apply plugin: 'maven' to apply plugin: 'maven-public'

## References

-   Huawei Location [Documentation](https://developer.huawei.com/consumer/en/doc/development/HMS-Plugin-Guides/introduction-0000001050142177)
-   Huawei Map [Documentation](https://developer.huawei.com/consumer/en/doc/development/HMS-Plugin-Guides/introduction-0000001050143001)

