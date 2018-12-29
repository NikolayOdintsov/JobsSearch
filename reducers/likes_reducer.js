import _ from 'lodash';
import { LIKE_JOB, CLEAR_LIKE_JOBS } from '../actions/types';

export default function (state = [], action) {

    switch (action.type) {
        case LIKE_JOB:
            return _.unionBy([
                action.payload, ...state
            ], 'jobkey');

        case CLEAR_LIKE_JOBS:
            return [];

        default:
            return state;
    }
};
