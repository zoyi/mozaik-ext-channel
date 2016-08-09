import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class LatestChannels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: []
        }
    }

    getApiRequest() {
        return {
            id: 'channel.channels',
            params: {}
        };
    }

    onApiData(data) {
        this.setState(data);
    }

    render() {
        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">최근 가입한 채널 목록</span>
                    <i className="fa fa-info-circle" />
                </div>
                <div className="widget__body">
                    {
                        this.state.channels.map((channel) => {
                            return (
                                <div className="list__item">
                                    {channel.name}<br/>
                                    <div className="list__item__time">
                                        {channel.description}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

LatestChannels.displayName = 'LatestChannels';

LatestChannels.propTypes = {
    limit: PropTypes.number.isRequired
};

LatestChannels.defaultProps = {
    limit: 3
};

reactMixin(LatestChannels.prototype, ListenerMixin);
reactMixin(LatestChannels.prototype, Mozaik.Mixin.ApiConsumer);


export default LatestChannels;
