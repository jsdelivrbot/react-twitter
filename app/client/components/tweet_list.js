import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import urlencode from 'urlencode';
import io from 'socket.io-client';

import { fetchTweets, addTweet, updateLocation } from '../actions';
import TweetItem from './tweet_item';

class TweetList extends Component {
  componentDidMount() {
    const that = this;
    this.props.updateLocation(this.props.location);
    const baseTerm = urlencode(this.props.term);
    let socket;

    if (!socket) {
      socket = io();
    }

    socket.emit('term', {
      term: baseTerm,
      lat: this.props.location.latitude,
      lng: this.props.location.longitude
    });

    socket.on('tweet', (tweet) => {
      this.props.addTweet(tweet);
    });
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

export default connect(mapStateToProps, { fetchTweets, addTweet, updateLocation })(TweetList);
