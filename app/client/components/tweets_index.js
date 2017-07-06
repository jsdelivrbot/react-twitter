import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';

import SearchBar from './search_bar';
import TweetList from './tweet_list';

class TweetsIndex extends Component {
  render() {
    return (
      !this.props.isGeolocationAvailable
      ? <div className="alert-top">Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div className="alert-top">Geolocation is not enabled</div>
        : this.props.coords
          ? <div>
              <SearchBar />
              <TweetList location={this.props.coords} />
            </div>
            : <div className="alert-top">Getting the location data&hellip;</div>
    );
  }
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(TweetsIndex);
