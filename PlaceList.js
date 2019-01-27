import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import PaginatableList from '@twotalltotems/paginatable-list';
import { paginationStateManager } from './listReducer';

const GOOGLE_PLACES_API_KEY = ''

const queryParams = {
  location: '-33.8670522,151.1957362',
  radius: '1500',
  type: 'restaurant',
  key: GOOGLE_PLACES_API_KEY
}

var nextPageToken = { pagetoken : null }

class PlaceList extends Component {
    renderListItem = ({ index, item }) => {
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        return (
            <TouchableOpacity style={{ height: 100, flexDirection: 'row', padding: 10, alignItems:'center' }} key={item.id}>
                <Image style={{width: 50, height: 50, borderRadius: 4}} source={{ uri: imageUrl}}/>
                <View style={{ flexGrow: 1, marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>{item.vicinity}</Text>
                </View>
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

    renderSeparator = () => {
        return (
            <View style={{ height: 1, width: '100%', backgroundColor: 'red' }} />
        )
    }

    render() {
        return (
            <View style={{ flex:1 }}>
                <PaginatableList
                    onRenderItem={this.renderListItem}
                    customizedPaginationStateManager={paginationStateManager}
                    onRenderSeparator={this.renderSeparator}
                    keyExtractor={this.keyExtractor}
                    onLoadMore={this.onLoadMore}
                    onRefresh={this.onRefresh}
                    style={{ margin: 10 }}
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