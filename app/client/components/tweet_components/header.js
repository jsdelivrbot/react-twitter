import React, {Component} from 'react';

class Header extends Component {
  createTimestamp (time) {
    if (!time) {
      return null;
    }

    const parseTwitterDate = tdate => {
      let system_date = new Date(Date.parse(tdate))
      var user_date = new Date()

      let diff = Math.floor((user_date - system_date) / 1000)
      if (diff < 59) {return diff + "s"}
      if (diff <= 3540) {return Math.round(diff / 60) + "m"}
      if (diff <= 86400) {return Math.round(diff / 3600) + "h"}
      if (diff < 604800) {return Math.round(diff / 86400) + "d"}
      return system_date.toString().substring(4, 10)
    }

    return parseTwitterDate(time)
  }

  render() {
    const {data} = this.props;
    const timestamp = this.createTimestamp(data.created_at);

    return (
      <div className="header">
        <a className="account-group" href={`http://twitter.com/${data.user.screen_name}`}>
          <img className="avatar" src={data.user.profile_image_url} />
          <strong className="fullname">{data.user.name}{' '}</strong>
          <span className="username">
            <small>{`@${data.user.screen_name}`}</small>
          </span>
        </a>
        <small className="time">
          <a href={`http://twitter.com/${data.user.screen_name}/status/${data.id_str}`} className="tweet-timestamp">
            {' • '}{timestamp}
          </a>
        </small>
      </div>
    );
  }
};

export default Header;