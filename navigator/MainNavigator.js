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
