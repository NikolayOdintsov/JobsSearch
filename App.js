import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

class App extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <MainNavigator/>
            </View>
        );
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

/**
 * Navigator setup
 */
const ReviewFlowNavigator = createStackNavigator({
    review: { screen: ReviewScreen },
    settings: { screen: SettingsScreen }
});

const MainFlowNavigator = createBottomTabNavigator({
    map: { screen: MapScreen },
    deck: { screen: DeckScreen },
    review: {
        screen: ReviewFlowNavigator
    }
});

const MainNavigator = createBottomTabNavigator({
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen },
    main: {
        screen: MainFlowNavigator
    }
});


export default createAppContainer(MainNavigator);

