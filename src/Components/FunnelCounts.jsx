import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import request                         from 'superagent-bluebird-promise';


class FunnelCounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'stats',
            columns: ['open_chats', 'new_users'],
            values: [[]]
        }
    }

    getApiRequest() {
        return {
            id: 'channel.funnel',
            params: {}
        };
    }

    onApiData(data) {
        this.setState(data.metrics[0]);
    }

    render() {
        const counts = this.props.funnelType === 'open_chats' ? this.state.values[0][0] : this.state.values[0][1]
        const title = this.props.funnelType === 'open_chats' ? '최근 7일간 새로 열린 유저챗 수' : '최근 7일간 새로 인증한 유저 수'
        return (
          <div>
              <div className="widget__header">
                  <span className="widget__header__subject">{title}</span>
                  <i className="fa fa-info-circle" />
              </div>
              <div className="widget__body">
                  <div className="channel__funnel-counts__body">
                        <span className="channel__funnel-counts__message">
                            {counts}
                        </span>
                  </div>
              </div>
          </div>
        );
    }
}

FunnelCounts.displayName = 'FunnelCounts';

FunnelCounts.propTypes = {
    funnelType: PropTypes.oneOf(['open_chats', 'new_users'])
};

FunnelCounts.defaultProps = {
    funnelType: 'open_chats'
};

reactMixin(FunnelCounts.prototype, ListenerMixin);
reactMixin(FunnelCounts.prototype, Mozaik.Mixin.ApiConsumer);


export default FunnelCounts;
