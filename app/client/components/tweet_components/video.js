import React, {Component} from 'react';
import VideoJS from 'react-videojs';

class Video extends Component {
  render () {
    let {media, gif} = this.props;
    let videoSrc = '';

    media[0].video_info.variants.forEach(video => {
      if (video.url.indexOf('.mp4') > -1) {
        videoSrc = video.url;
      }
    });

    let VideoComponent = (
      <video className="media-item" src={videoSrc} controls={!gif} autoPlay={gif} loop={gif}>
        {'Your browser does not support the '}<code>{'video '}</code>{'element.'}
      </video>
    );

    if (typeof window.videojs !== 'undefined') {
      VideoComponent = (
        <VideoJS className="media-item" src={videoSrc} controls={!gif} autoPlay={gif} loop={gif}>
          {'Your browser does not support the '}<code>{'video '}</code>{'element.'}
        </VideoJS>
      );
    }

    return (
      <div className="media-video">
        {VideoComponent}
      </div>
    );
  }
};

export default Video;
