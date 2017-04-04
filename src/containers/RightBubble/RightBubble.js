import React, { Component, PropTypes } from 'react';

export default class RightBubble extends Component {
  render() {
    const styles = require('./RightBubble.scss');

    return (
      <div className={styles.bubble_container}>
        <div className={styles.bubble_wrapper}>
          这是这是这是这是这是这是这是这是这是这是
          这是这是这是这是这是这是这是这是这是这是
          这是这是这是这是这是这是这是这是这是这是
        </div>
        <div className={styles.triangle}></div>
        <div className={styles.portrait}></div>
      </div>
    );
  }
}
