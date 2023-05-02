# react-native-instantpay-bluetooth

React Native module for checking Bluetooth state with event listener. Supports both iOS and Android.

## TOC

- [Installation](#installation)
- [Manual Installation](#manual-installation)
- [Usage](#usage)

## Installation

```sh
npm install react-native-instantpay-bluetooth
```

## Manual installation
### Android
1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.instantpaybluetooth.InstantpayBluetoothPackage;` to the imports at the top of the file
  - Add `new InstantpayBluetoothPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-instantpay-bluetooth'
  	project(':react-native-instantpay-bluetooth').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-instantpay-bluetooth/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-instantpay-bluetooth')
  	```
### iOS
1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-instantpay-bluetooth` and add `InstantpayBluetooth.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libInstantpayBluetooth.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)

## Usage

```js
import RNBluetooth from 'react-native-instantpay-bluetooth';

// ...

let data = await RNBluetooth.getStatus();
```

**Note about getStatus Method**

Possible options values : 

| key               | Description                                        |  type      | required       |
| ---------------   | -------------------------------------------------- | ---------- | -------------- |
| requestToEnable   | Request to Enable Bluetooth                        | boolean    | Optional       |


### Event Listener Methods

```js

//Add Listener
RNBluetooth.addEventListener("change", handleConnection);

//Remove Listener
RNBluetooth.removeEventListener("change", handleConnection);

handleConnection = (resp) => {
    console.log('response:', resp);
}

```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [Instantpay](https://www.instantpay.in)
