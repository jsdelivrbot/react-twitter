import React, {Component} from 'react';

import Photos from './photos';
import Video from './video';

class Media extends Component {
  render () {
    switch (this.props.media[0].type) {
      case 'photo':
        return <Photos {... this.props} />;
      case 'video':
        return <Video {... this.props} />;
      case 'animated_gif':
        return <Video gif={true} {... this.props} />;
      default:
        return <div />;
    }
  }
};

export default Media;