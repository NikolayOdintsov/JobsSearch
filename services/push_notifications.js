import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';

/**
 * Test push notification with API: https://rallycoding.herokuapp.com/api/tokens
 */

const PUSH_ENDPOINT = 'https://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let previousToken = await AsyncStorage.getItem('pushtoken');

    if (previousToken) {
        await AsyncStorage.removeItem('pushtoken');
        return;
    } else {
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (status !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        console.log('pushToken: ', token);
        if (token) {
            await axios.post(PUSH_ENDPOINT, { token: { token } });
            AsyncStorage.setItem('pushtoken', token);
        }

    }
};
