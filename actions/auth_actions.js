import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';
import { FACEBOOK_APP_ID } from '../const';


export const facebooklogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        //startup FB login process:
        doFacebookLogin(dispatch);
    }

};

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    await AsyncStorage.setItem('fb_token', token);

    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });

};
