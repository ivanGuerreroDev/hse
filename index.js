/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import config from './app.json';
const appName = config?.[Platform?.OS]?.name ? config[Platform.OS].name : config.name
AppRegistry.registerComponent(appName, () => App);
