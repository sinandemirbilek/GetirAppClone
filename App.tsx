import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import RootNavigator from './src/navigators/RootNavigator';
import { LogBox } from 'react-native';
import store from '../GetirClone/src/redux/store';
import { Provider } from 'react-redux';

LogBox.ignoreAllLogs();




export default function App() {
  const linking = {
    prefixes : [],
    config: {
      screens: {
        Search:{
          screens:{
            CartScreen:{
              path:"cartScreen/:message",
              parse:{
             
              }
            }
          }
        }
      }

    }
  }
  return (
    <Provider store={store}>
      <NavigationContainer >
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
