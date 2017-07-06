import React, {Component} from 'react';

import Text from './text';

class Quote extends Component {
  render() {
    const {data} = this.props

    return (
      <div className="quote-text">
        <a href={`https://twitter.com/${data.user.screen_name}/status/${data.id_str}`} />
        <div>
          <div>
            <b>{data.user.name}</b>
            <span>{' '}{'@'}{data.user.screen_name}</span>
          </div>
          <div>
            <Text data={data} />
          </div>
        </div>
      </div>
    );
  }
};

export default Quote;
