import React, { Component, PropTypes } from 'react';
import { Message } from '../index';

export default class MessageList extends Component {
  render() {
    const styles = require('./MessageList.scss');

    return (
      <div className={styles.message_list_wrapper}>
        <div className={styles.message_list_header}>
          <div className={styles.title}>私信</div>
        </div>
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    );
  }
}
