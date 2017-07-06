import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import urlencode from 'urlencode';
import socket from 'socket.io';

import { fetchTweets, updateLocation } from '../actions';
import TweetItem from './tweet_item';

class TweetList extends Component {
  componentDidMount() {
    this.props.updateLocation(this.props.location);
    const baseTerm = urlencode(this.props.term);
    this.props.fetchTweets(baseTerm, this.props.location);
  }

  renderTweets() {
    return _.map(this.props.tweets, tweet => {
      return (
        <TweetItem key={tweet.id} tweet={tweet} />
      );
    });
  }

  render() {
    return (
      <div className="container">
        {this.renderTweets()}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    tweets: state.tweets,
    term: state.term.value
  };
}

export default connect(mapStateToProps, { fetchTweets, updateLocation })(TweetList);
