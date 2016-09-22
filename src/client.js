import request from 'superagent';
import Promise from 'bluebird';
import cache   from 'memory-cache';
import config  from './config';
require('superagent-bluebird-promise');


const API_BASE_URL = 'http://api.channel.io/';


/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config);

    const methods = {
        channels(params) {
            return request
              .get('http://api.channel.io:8081/api/admin/dashboard?latestChannelsLimit=10&timeSpanInDays=7')
              .then(res => res.body)
        },

        funnel(params) {
            return request
              .get('http://api.channel.io:8081/api/admin/dashboard?latestChannelsLimit=10&timeSpanInDays=7')
              .then(res => res.body)
        },

        messages(params) {
            return request
              .get('http://api.channel.io:8081/api/admin/dashboard?latestChannelsLimit=10&timeSpanInDays=7')
              .then(res => res.body)
        }
    };

    return methods;
};


export default client;
