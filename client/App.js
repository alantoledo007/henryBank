import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './redux/store/index';

export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <NativeRouter>
          <Route exact path="/" component={Home} />
        </NativeRouter>
      </Provider>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
