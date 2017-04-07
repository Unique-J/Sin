import React, { Component, PropTypes } from 'react';
import { ContactNav, MessageList, ChatPannel } from '../index';

export default class MessagePannel extends Component {
  static propTypes = {
    uid: PropTypes.any,
  };

  render() {
    const styles = require('./MessagePannel.scss');
    const { uid } = this.props;
    // const uid = location.query && location.query.uid;
    // console.log(uid);

    return (
      <div className={styles.message_pannel_container}>
        {uid && <ChatPannel uid={uid} />}
        {!uid && <MessageList />}
        <div className={styles.contact_nav_wrapper}>
          <ContactNav />
        </div>
      </div>
    );
  }
}
