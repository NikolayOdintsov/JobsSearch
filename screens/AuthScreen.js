import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {

    componentDidMount() {
        this.props.facebooklogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.token) {
            props.navigation.navigate('map');
        }
    }

    render() {
        return (
            <View></View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
