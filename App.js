import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Notifications } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import MainNavigator from './navigator/MainNavigator';
import registerForNotification from './services/push_notifications';

class App extends React.Component {

    componentDidMount() {
        registerForNotification();

        Notifications.addListener((notification) => {
            const { data: { text }, origin } = notification;


            if (origin === 'received' && text) {
                Alert.alert(
                    'New Push Notification',
                    text,
                    [{ text: 'OK' }]
                );
            }

        });
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <View style={styles.container}>
                        <MainNavigator/>
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
