import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

const getCombinedReducers = () => {}

const reduxStore = createStore(
  getCombinedReducers,
	{}, //Initial State of Redux Store
	compose(
		applyMiddleware(ReduxThunk)
  ),
)

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Provider store={reduxStore}>
          </Provider>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
