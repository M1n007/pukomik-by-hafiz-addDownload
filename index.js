import { AppRegistry } from 'react-native';
import App from './App';
import {NativeModules} from 'react-native';

NativeModules.ExceptionsManager = null;
console.disableYellowBox = true;

AppRegistry.registerComponent('pukomikcom', () => App);
