import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-instantpay-bluetooth' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const InstantpayBluetooth = NativeModules.InstantpayBluetooth
  ? NativeModules.InstantpayBluetooth
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const BluetoothInfoEventEmitter = new NativeEventEmitter(InstantpayBluetooth);

const CONNECTIVITY_EVENT = 'bluetoothDidUpdateState';

const _subscriptions = new Map();

const RNBluetooth = {

    addEventListener: (eventName:string, handler:any) => {

        let listener;

        if (eventName === 'change') {
            listener = BluetoothInfoEventEmitter.addListener(
                CONNECTIVITY_EVENT,
                (appStateData) => {
                    handler(appStateData);
                }
            );
        }
        else{
            console.warn('Trying to subscribe to unknown event: "' + eventName + '"');
            return {
                remove: () => {}
            };
        }

        _subscriptions.set(handler, listener);

        return {
            remove: () => RNBluetooth.removeEventListener(eventName, handler)
        };
    },
    removeEventListener: (_eventName:string, handler:any) => {
       
        const listener = _subscriptions.get(handler);
        
        if (!listener) {
            return;
        }
        
        listener.remove();

        _subscriptions.delete(handler);
    },
    getStatus: (options={}) => {

        let params = null;

        if(Object.keys(options).length > 0){
            params = JSON.stringify(options);
        }

        return InstantpayBluetooth.bluetoothStatus(params);
    }
}

export default RNBluetooth;
