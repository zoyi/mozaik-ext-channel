import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class FunnelCounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 0,
            userChats: 0,
            users: 0
        }
    }

    getApiRequest() {
        return {
            id: 'channel.funnel',
            params: {}
        };
    }

    onApiData(data) {
        this.setState(data);
    }

    render() {
        const counts = this.state[this.props.funnelType.charAt(0).toLowerCase() + this.props.funnelType.slice(1)]
        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{`최근 7일간 접속한 ${this.props.funnelType} 수`}</span>
                    <i className="fa fa-info-circle" />
                </div>
                <div className="widget__body">
                    <div className="channel__funnel-counts__body">
                        <span className="channel__funnel-counts__icon">
                            <i className="fa fa-check-square"/>
                        </span>
                        <span className="channel__funnel-counts__message">
                            {`${counts} 명`}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

FunnelCounts.displayName = 'FunnelCounts';

FunnelCounts.propTypes = {
    funnelType: PropTypes.oneOf(['Guests', 'Users', 'UserChats'])
};

FunnelCounts.defaultProps = {
    funnelType: 'Guests'
};

reactMixin(FunnelCounts.prototype, ListenerMixin);
reactMixin(FunnelCounts.prototype, Mozaik.Mixin.ApiConsumer);


export default FunnelCounts;
