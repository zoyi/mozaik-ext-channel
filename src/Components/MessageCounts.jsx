import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import c3                              from 'c3';
import _                               from 'lodash';
import moment                          from 'moment';


class TimeseriesChart {

  constructor(bindTo, opts) {
    opts = opts || {};
    this.chart = c3.generate({
      bindto: bindTo,
      transition: {
        // Skipping transition for now
        duration: null
      },
      data: {
        labels: true,
        x: 'x',
        xFormat: '%Y-%m-%d',
        columns: []
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function(x) {
              return moment(x).format('YYYY-MM-DD');
            },
            count: opts.tickCount
          }
        },
        y: {
          min: 0
        }
      },
      color: {
        pattern: ['#5b83fe', '#00bc9b', '#ff4eaa']
      },
      padding: { top: 20, right: 70, bottom: 20, left: 70 }
    });
  }

  load(data) {
    return this.chart.load(data);
  }

  loadEntries(entries) {
    var xData = [];
    var groupMessagesData = [];
    var directChatMessagesData = [];
    var userChatMessagesData = [];
    var weekDayRegions = [];

    if (!entries || entries.length === 0) {
      console.warn('No statistics provided');
      return;
    }

    _.each(entries, function(entry) {

      var date = moment(entry.date, 'YYYY-MM-DD');

      // Mark Sat and Sun with region
      if (_.includes([6, 7], date.isoWeekday())) {
        var weekDayRegion = {
          start: date.format('YYYY-MM-DD'),
          end: date.format('YYYY-MM-DD')
        };
        weekDayRegions.push(weekDayRegion);
      };

      xData.push(date.format('YYYY-MM-DD'));
      groupMessagesData.push(entry.groupMessages);
      directChatMessagesData.push(entry.directChatMessages);
      userChatMessagesData.push(entry.userChatMessages);
    });

    return this.load({
      columns: [
        ['x'].concat(xData),
        ['그룹 챗\u00A0\u00A0\u00A0\u00A0'].concat(groupMessagesData),
        ['다이렉트 챗\u00A0\u00A0\u00A0\u00A0'].concat(directChatMessagesData),
        ['유저 챗'].concat(userChatMessagesData)
      ],
      regions: weekDayRegions
    });
  }
};


class MessageCounts extends Component {
  constructor(props) {
    super(props);
    this.chartClassName = 'chart';
    this.chart = null;
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    var chartElement = React.findDOMNode(this).getElementsByClassName(this.chartClassName)[0];
    this.chart = new TimeseriesChart(chartElement, {
      min: this.props.min,
      max: this.props.max,
      tickCount: this.props.tickCount,
      dateFormat: this.props.dateFormat
    });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  getApiRequest() {
    return {
      id: 'channel.messages',
      params: {}
    };
  }

  onApiData(data) {
    const values = data.metrics[1].values
    const dcMessages = values.filter((v) => v[1] === 'DirectChat')
    const gcMessages = values.filter((v) => v[1] === 'Group')
    const ucMessages = values.filter((v) => v[1] === 'UserChat')
    const dates = dcMessages.map((v) => v[0])
    const messages = dates.map((d, i) => {
      return {
        date: d,
        directChatMessages: dcMessages[i][2],
        groupMessages: gcMessages[i][2],
        userChatMessages: ucMessages[i][2]
      }
    })
    this.setState({ messages });
    this.chart.loadEntries(this.state.messages);
  }

  render() {
    return (
      <div>
        <div className="widget__header">
          <span className="widget__header__subject">최근 7일간 메시지 수</span>
          <i className="fa fa-info-circle" />
        </div>
        <div className="widget__body">
          <div className={this.chartClassName}/>
        </div>
      </div>
    );
  }
}

MessageCounts.displayName = 'MessageCounts';

reactMixin(MessageCounts.prototype, ListenerMixin);
reactMixin(MessageCounts.prototype, Mozaik.Mixin.ApiConsumer);


export default MessageCounts;
