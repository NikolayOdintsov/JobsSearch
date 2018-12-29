import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { MapView } from 'expo';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

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

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const {
                company, formattedRelativeTime, url,
                jobkey, longitude, latitude, jobtitle
            } = job;

            const initialRegion = {
                longitude: longitude,
                latitude: latitude,
                longitudeDelta: 0.02,
                latitudeDelta: 0.045
            };

            return (
                <Card key={jobkey} title={jobtitle}>
                    <View style={{ height: 200 }}>

                        <MapView
                            scrollEnabled={false}
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.OS === 'android' ? true : false}
                            initialRegion={initialRegion}
                        >
                        </MapView>

                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>

                        <Button
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}/>
                    </View>
                </Card>
            );
        });
    };

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    },
    italics: {
        fontStyle: 'italic'
    }
};

const mapStateToProps = (state) => {
    return {
        likedJobs: state.likedJobs
    }
};
export default connect(mapStateToProps)(ReviewScreen);
