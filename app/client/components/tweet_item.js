import React, {Component} from 'react';

import Metadata from './tweet_components/metadata';
import Header from './tweet_components/header';
import Text from './tweet_components/text';
import Media from './tweet_components/media';
import Quote from './tweet_components/quote';

class TweetItem extends Component {
  render() {
    let tweet = this.props.tweet;
    let isRetweeted = false;
    let MediaComponent = null;
    let QuoteComponent = null;

    if (tweet.retweeted_status) {
      tweet = tweet.retweeted_status;
      isRetweeted = true;
    }

    if (tweet.entities && tweet.entities.media) {
      MediaComponent = <Media media={tweet.entities.media} />;
    }

    if (tweet.extended_entities && tweet.extended_entities.media) {
      MediaComponent = <Media media={tweet.extended_entities.media} />;
    }

    if (tweet.quoted_status) {
      QuoteComponent = <Quote data={tweet.quoted_status} />;
    }

    return (
      <div className="tweet">
        {isRetweeted ? <Metadata {... this.props} /> : null}
        <div className="content">
          <Header data={tweet} />
          <Text data={tweet} />
          {MediaComponent}
          {QuoteComponent}
        </div>
      </div>
    );
  }
};

export default TweetItem;
