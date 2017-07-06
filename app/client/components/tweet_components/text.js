import React, {Component} from 'react';
import twitterText from 'twitter-text';

class Text extends Component {
  render() {
    let {data} = this.props;
    let {text, entities} = data;

    if (entities && entities.media) {
      entities.media.forEach( e => {
        text = text.replace(e.url, '');
      });
    }

    if (entities && data.quoted_status) {
      entities.urls.forEach( u => {
        if (u.expanded_url.indexOf('/status/') > -1) {
          text = text.replace(u.url, '');
        }
      });
    }

    text = twitterText.autoLinkWithJSON(text, (entities || {}), {'usernameIncludeSymbol': true});
    text = text.replace(/href=/g, 'style="text-decoration: none;color:#6CCCF9;" href=');

    const tweetProps = {
      'className': 'tweet-text',
      'dangerouslySetInnerHTML': {
        '__html': text
      }
    };

    return <p {... tweetProps} />;
  }
};

export default Text;