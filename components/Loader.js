import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color='blue' />
            </View >
        );
    }
}
