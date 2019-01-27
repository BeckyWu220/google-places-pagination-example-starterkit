import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

import PlaceList from './PlaceList';
import { paginationStateManager } from './listReducer';

const getCombinedReducers = () => {
  return combineReducers({
    places : paginationStateManager.reducer(), // 'places' should be kept the same as the first param in PaginationStateManager instance created in the last step.
  });
}

const reduxStore = createStore(
  getCombinedReducers(),
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
            <PlaceList/>
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
