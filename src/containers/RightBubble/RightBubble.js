import React, { Component, PropTypes } from 'react';
import { formatTime } from '../../utils/utils';
import { connect } from 'react-redux';

@connect(
  state => ({
    person: state.async.person,
  })
)
export default class RightBubble extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    person: PropTypes.any,
  };

  render() {
    const styles = require('./RightBubble.scss');
    const { message, person } = this.props;
    // console.log(person);

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
          <div className={styles.blank_wrapper}></div>
          <div className={styles.bubble_wrapper}>
            {message.content}
          </div>
          <div className={styles.triangle}></div>
          {person && <div
            className={styles.portrait}
            style={{ backgroundImage: `url(${person.portrait || 'StockSnap_01.jpg'}`,
            backgroundSize: 'cover' }}
          />}
        </div>
      </div>
    );
  }
}
