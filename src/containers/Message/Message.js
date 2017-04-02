import React, { Component, PropTypes } from 'react';

export default class Message extends Component {
  render() {
    const styles = require('./Message.scss');

    return (
      <div className={styles.message_container}>
        <div className={styles.portrait}></div>
        <div className={styles.right_wrapper}>
          <div className={styles.top_wrapper}>
            <span className={styles.name}>671</span>
            <span className={styles.date}>2017-03-21 21:48</span>
          </div>
          <div className={styles.bottom_wrapper}>1231331212</div>
        </div>
      </div>
    );
  }
}
