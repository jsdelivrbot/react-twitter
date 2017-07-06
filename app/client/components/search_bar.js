import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import urlencode from 'urlencode';
import io from 'socket.io-client';

import {fetchTweets, updateTerm} from './../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.fetchTweets = _.debounce((term) => {
      const encodedTerm = urlencode(term);

      let socket;

      if (!socket) {
        socket = io();
      }

      socket.emit('term', {
        term: encodedTerm,
        lat: this.props.location.latitude,
        lng: this.props.location.longitude
      });
    }, 300);
  }

  onInputChange(event) {
    const term = event.target.value;
    this.props.updateTerm(term);
    this.fetchTweets(term);
  }

  render() {
    return (
      <div className="search-bar">
        <div className="container">
          <input
          className="form-control"
          type="text"
          value={this.props.term}
          onChange={this.onInputChange} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    term: state.term.value,
    location: state.location.location
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchTweets, updateTerm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
