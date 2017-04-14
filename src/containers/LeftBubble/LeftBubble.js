import React, { Component, PropTypes } from 'react';
import { formatTime } from '../../utils/utils';

export default class LeftBubble extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./LeftBubble.scss');
    const { message } = this.props;
    // console.log(message);

    return (
      <div>
        <div className={styles.time_line}>
          <span className={styles.line}>
            -----------------------------------------------
          </span>
          &nbsp;&nbsp;
          {typeof message.time === 'object' ?
          formatTime((new Date(message.time)).toJSON()) : formatTime(message.time)}
          &nbsp;&nbsp;
          <span className={styles.line}>
            -----------------------------------------------
          </span>
        </div>
        <div className={styles.bubble_container}>
          <div
            className={styles.portrait}
            style={{ backgroundImage: `url(${message.senderportrait || 'StockSnap_01.jpg'}`,
            backgroundSize: 'cover' }}
          />
          <div className={styles.triangle}></div>
          <div className={styles.bubble_wrapper}>
            {message.content}
          </div>
        </div>
      </div>
    );
  }
}
