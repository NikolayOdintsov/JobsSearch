import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//https://github.com/rt2zz/redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import reducers from '../reducers';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['likedJobs']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk)));

// call: persistStore(store).purge() to clear store
export const persistor = persistStore(store);
