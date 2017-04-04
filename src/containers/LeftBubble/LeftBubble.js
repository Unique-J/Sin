import React, { Component, PropTypes } from 'react';

export default class LeftBubble extends Component {
  render() {
    const styles = require('./LeftBubble.scss');

    return (
      <div className={styles.bubble_container}>
        <div className={styles.portrait}></div>
        <div className={styles.triangle}></div>
        <div className={styles.bubble_wrapper}>
          这是这是这是这是这是这是这是这是这是这是
          这是这是这是这是这是这是这是这是这是这是
          这是这是这是这是这是这是这是这是这是这是
        </div>
      </div>
    );
  }
}
