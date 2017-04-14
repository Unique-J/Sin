import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../../actions/messageList';
import { connect } from 'react-redux';
// import io from 'socket.io-client';
// import config from '../../config';
import { Message } from '../index';

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

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const { user, getMessageBox } = this.props;
    const uid = user.sid || user.tid;
    // console.log(uid);

    getMessageBox(uid);

    // this.socket = io.connect(`http://${config.chatHost}:${config.chatPort}`);
    // this.socket.emit('login', user);
    // this.socket.on(uid, message => {
    //   // console.log(message);
    //   const msgs = this.generatorMessage(message);
    //   this.setState({ messages: msgs });
    // });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.messagebox) {
  //     this.setState({ messages: nextProps.messagebox });
  //   }
  // }

  // generatorMessage = message => {
  //   const messages = this.state.messages;
  //   let pushFlag = true;

  //   // console.log(message);
  //   // console.log(messages);

  //   for (let i = 0; i < messages.length; i++) {
  //     if (messages[i].senderid === message.senderid) {
  //       messages[i].content = message.content;
  //       pushFlag = false;
  //     }
  //   }

  //   if (pushFlag === true) {
  //     messages.push(message);
  //   }

  //   return messages;
  // }

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
