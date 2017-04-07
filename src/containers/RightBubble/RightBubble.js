import React, { Component, PropTypes } from 'react';

export default class RightBubble extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./RightBubble.scss');
    const { message } = this.props;

    return (
      <div className={styles.bubble_container}>
        <div className={styles.blank_wrapper}></div>
        <div className={styles.bubble_wrapper}>
          {message.content}
        </div>
        <div className={styles.triangle}></div>
        <div className={styles.portrait}></div>
      </div>
    );
  }
}
