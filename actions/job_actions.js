import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import { FETCH_JOBS } from './types';
import * as jsonResponse from './mockIndeedResponse.json';


const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisherId: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        let zip = 'Berlin';
        /**
         * NOTE:  reverseGeocode requires Google API key
         */
        //await reverseGeocode(region);

        /**
         * Indeed.com requires publisherId;
         * @type {string}
         */
        // const url = buildJobsUrl(zip);
        // let { data } = await axios.get(url);

        let data = jsonResponse;

        dispatch({
            type: FETCH_JOBS,
            payload: data
        });

        callback();
    } catch (e) {
        console.error(e);
    }
};
