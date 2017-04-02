import React, { Component, PropTypes } from 'react';
import { Message, ContactNav } from '../index';

export default class MessagePannel extends Component {
  render() {
    const styles = require('./MessagePannel.scss');

    return (
      <div className={styles.message_pannel_container}>
        <div className={styles.message_list_wrapper}>
          <div className={styles.message_list_header}>
            <div className={styles.title}>私信</div>
          </div>
          <Message />
          <Message />
        </div>
        <div className={styles.contact_nav_wrapper}>
          <ContactNav />
        </div>
      </div>
    );
  }
}
