import React, { Component, PropTypes } from 'react';
import { Message } from '../index';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messageList';

@connect(
  state => ({
    user: state.async.login,
    messages: state.async.messagebox
  }),
  actionCreators
)
export default class MessageList extends Component {
  static propTypes = {
    user: PropTypes.any,
    messages: PropTypes.any,
    getMessageBox: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { user, getMessageBox } = this.props;
    const uid = user.sid || user.tid;

    getMessageBox(uid);
  }

  mapMessageList = messages => (
    messages.map((message, index) => (
      <Message message={message} key={index} />
    ))
  )

  render() {
    const styles = require('./MessageList.scss');
    const { messages } = this.props;
    // console.log(messages);

    return (
      <div className={styles.message_list_wrapper}>
        <div className={styles.message_list_header}>
          <div className={styles.title}>私信</div>
        </div>

        {messages && this.mapMessageList(messages)}

      </div>
    );
  }
}
