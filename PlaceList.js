import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PaginatableList from '@twotalltotems/paginatable-list';
import { paginationStateManager } from './listReducer';

const GOOGLE_PLACES_API_KEY = 'GOOGLEPLACESAPIKEY'

const queryParams = {
  location: '-33.8670522,151.1957362',
  radius: '1500',
  type: 'restaurant',
  key: GOOGLE_PLACES_API_KEY
}

var nextPageToken = { pagetoken : null }

class PlaceList extends Component {
    renderListItem = ({ index, item }) => {
        return (
            <TouchableOpacity style={{ height: 50 }} key={item.id}>
                <Text>Name:{item.name}</Text>
            </TouchableOpacity>
        )
    }

    keyExtractor = (item, index) => item.id;

    onRefresh = ({onCompleteRefreshing}) => {
        this.props.dispatch(paginationStateManager.refresh({
            ...queryParams
        }, (data) => {
            onCompleteRefreshing(data)
            this.onParseNextPageToken(data)
        }))
    }

    onLoadMore = () => {
        this.props.dispatch(paginationStateManager.loadMore({ 
            ...queryParams,
            ...nextPageToken
        }, (data) => {
            this.onParseNextPageToken(data)
        }))
    }

    onParseNextPageToken = (data) => {
        const { next_page_token } = data
        if (next_page_token) {
            nextPageToken.pagetoken = next_page_token
        }
    }

    render() {
        return (
            <View style={{ flex:1 }}>
                <PaginatableList
                    onRenderItem={this.renderListItem}
                    customizedPaginationStateManager={paginationStateManager}
                    keyExtractor={this.keyExtractor}
                    onLoadMore={this.onLoadMore}
                    onRefresh={this.onRefresh}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ }) => ({ });

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);