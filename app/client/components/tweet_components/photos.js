import React, {Component} from 'react';

class Photos extends Component {
  render () {
    const {media} = this.props;

    return (
      <div className="media-pictures">
        <a href={media[0].url}>
          <img className="media-item" src={media[0].media_url_https} />
        </a>
      </div>
    );
  }
};

export default Photos;
