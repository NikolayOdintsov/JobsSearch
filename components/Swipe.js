import React, { Component } from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    StyleSheet,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.15 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {

    static defaultProps = {
        onSwipeRight: () => {
        },
        onSwipeLeft: () => {
        },
        renderNoMoreCards: () => {
        },
        renderCard: (item) => {
        },
        keyProp: 'id'
    };

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY(0, 0);

        // https://facebook.github.io/react-native/docs/panresponder
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.position = position;
        this.panResponder = panResponder;
        this.state = { index: 0 }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ index: 0 });
        }
    }

    componentWillUpdate() {
        //// https://facebook.github.io/react-native/docs/layoutanimation
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        this.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    resetPosition() {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const rotation = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.position.getLayout(),
            transform: [{ 'rotate': rotation }]
        };
    }

    renderCards() {

        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        const deck = this.props.data.map((item, index) => {
            if (index < this.state.index) {
                return null;
            }

            if (index === this.state.index) {
                return (
                    <Animated.View
                        key={item[this.props.keyProp]}
                        style={[this.getCardStyle(), styles.cardStyle]}
                        {...this.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return (
                <Animated.View key={item[this.props.keyProp]}
                               style={[styles.cardStyle, { top: 10 * (index - this.state.index), zIndex: -index }]}>
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        });

        return Platform.OS === 'android' ? deck : deck.reverse();
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
});

export default Swipe;
