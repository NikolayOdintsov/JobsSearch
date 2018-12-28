import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import MainNavigator from './navigator/MainNavigator';

class App extends React.Component {
    render() {

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <MainNavigator/>
                </View>
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

