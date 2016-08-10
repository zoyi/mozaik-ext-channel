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
                          { name: 'Channel Name 1', description: 'Channel Description 1', avatarUrl: 'https://cdn.channel.io/channel/1-22aab459f056a19cc337a8fdc1534340-thumb.png' },
                          { name: 'Channel Name 2', description: 'Channel Description 2', avatarUrl: 'https://cdn.channel.io/channel/1-22aab459f056a19cc337a8fdc1534340-thumb.png' },
                          { name: 'Channel Name 3', description: 'Channel Description 3', avatarUrl: 'https://cdn.channel.io/channel/1-22aab459f056a19cc337a8fdc1534340-thumb.png' },
                          { name: 'Channel Name 4', description: 'Channel Description 4', avatarUrl: 'https://cdn.channel.io/channel/1-22aab459f056a19cc337a8fdc1534340-thumb.png' },
                          { name: 'Channel Name 5', description: 'Channel Description 5', avatarUrl: 'https://cdn.channel.io/channel/1-22aab459f056a19cc337a8fdc1534340-thumb.png' },
                          { name: 'Channel Name 6', description: 'Channel Description 6', avatarUrl: 'https://cdn.channel.io/channel/1-22aab459f056a19cc337a8fdc1534340-thumb.png' }
                      ]
                  });
            });
        },

        funnel(params) {
            return new Promise((resolve) => {
                resolve({
                    guests: 390,
                    userChats: 40,
                    users: 25
                })
            })
        },

        messages(params) {
            return new Promise((resolve) => {
                resolve({
                    messages: [
                        { date: '2016-08-01', teamMessages: 1000, directChatMessages: 800, userChatMessages: 200 },
                        { date: '2016-08-02', teamMessages: 1100, directChatMessages: 700, userChatMessages: 100 },
                        { date: '2016-08-03', teamMessages: 800, directChatMessages: 600, userChatMessages: 300 },
                        { date: '2016-08-04', teamMessages: 900, directChatMessages: 500, userChatMessages: 100 },
                        { date: '2016-08-05', teamMessages: 500, directChatMessages: 400, userChatMessages: 2000 },
                        { date: '2016-08-06', teamMessages: 700, directChatMessages: 800, userChatMessages: 300 },
                        { date: '2016-08-07', teamMessages: 800, directChatMessages: 1000, userChatMessages: 400 }
                    ]
                })
            })
        }
    };

    return methods;
};


export default client;
