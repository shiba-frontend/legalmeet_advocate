/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import  {Store}  from './src/redux/Store';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
const Aircraft = () =>{
    return(
        <Provider store={Store}>
            <App />
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => Aircraft);
