import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {

    //needed to override navigation properties
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Review Jobs',
            headerRight: (
                <Button
                    title="Settings"
                    onPress={() => navigation.navigate('settings')}
                    backgroundColor="rgba(0,0,0,0)"
                    //ios color
                    color="rgba(0,122,255,1)"
                />
            ),
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            }

        };
    };

    render() {
        return (
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        );
    }
}

export default ReviewScreen;
