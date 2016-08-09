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
            return new Promise((resolve) => {
                  resolve({
                      channels: [
                          { name: 'Channel Name 1', description: 'Channel Description 1' },
                          { name: 'Channel Name 2', description: 'Channel Description 2' },
                          { name: 'Channel Name 3', description: 'Channel Description 3' },
                          { name: 'Channel Name 4', description: 'Channel Description 4' },
                          { name: 'Channel Name 5', description: 'Channel Description 5' },
                          { name: 'Channel Name 6', description: 'Channel Description 6' }
                      ]
                  });
            });
        }
    };

    return methods;
};


export default client;
