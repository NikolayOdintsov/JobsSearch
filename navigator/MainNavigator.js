import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
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
        navigationOptions: bottomTabNavigationOptions
    },
    deck: {
        screen: DeckScreen,
        navigationOptions: bottomTabNavigationOptions
    },
    review: {
        screen: ReviewFlowNavigator
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
