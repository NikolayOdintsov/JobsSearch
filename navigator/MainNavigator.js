import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import AuthScreen from '../screens/AuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MapScreen from '../screens/MapScreen';
import DeckScreen from '../screens/DeckScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SettingsScreen from '../screens/SettingsScreen';

/**
 * Navigator setup
 */

const bottomTabNavigationOptions = {
    tabBarVisible: false
};

const ReviewFlowNavigator = createStackNavigator({
    review: { screen: ReviewScreen },
    settings: { screen: SettingsScreen }
});

const MainFlowNavigator = createBottomTabNavigator({
    map: {
        screen: MapScreen,
        navigationOptions: {
            ...bottomTabNavigationOptions,
            title: 'Map',
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Icon name="my-location" size={30} color={tintColor}/>
                );
            }
        }
    },
    deck: {
        screen: DeckScreen,
        navigationOptions: {
            title: 'Jobs',
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Icon name="description" size={30} color={tintColor}/>
                );
            }
        }
    },
    review: {
        screen: ReviewFlowNavigator,
        navigationOptions: {
            title: 'Review',
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Icon name="favorite" size={30} color={tintColor}/>
                );
            }
        }
    }
}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: 12,
        }
    }
});

const MainNavigator = createBottomTabNavigator({
    welcome: {
        screen: WelcomeScreen,
        navigationOptions: bottomTabNavigationOptions
    },
    auth: {
        screen: AuthScreen,
        navigationOptions: bottomTabNavigationOptions
    },
    main: {
        screen: MainFlowNavigator,
        navigationOptions: bottomTabNavigationOptions
    }
});

export default createAppContainer(MainNavigator);
