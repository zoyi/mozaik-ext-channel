import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class GuestCounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guestCounts: 0
        }
    }

    getApiRequest() {
        return {
            id: 'channel.guests',
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
                    <span className="widget__header__subject">최근 7일간 접속한 게스트 수</span>
                    <i className="fa fa-info-circle" />
                </div>
                <div className="widget__body">
                    <div className="channel__guest-counts__body">
                        <span className="channel__guest-counts__icon">
                            <i className="fa fa-check-square"/>
                        </span>
                        <span className="channel__guest-counts__message">
                            {`${this.state.guestCounts} 명`}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

GuestCounts.displayName = 'GuestCounts';

reactMixin(GuestCounts.prototype, ListenerMixin);
reactMixin(GuestCounts.prototype, Mozaik.Mixin.ApiConsumer);


export default GuestCounts;
