import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { LeftBubble, RightBubble } from '../index';
import io from 'socket.io-client';
import config from '../../config';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

@connect(
  state => ({
    user: state.async.login
  })
)
export default class ChatPannel extends Component {
  static propTypes = {
    user: PropTypes.any,
    uid: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const uid = user.sid || user.tid;

    this.socket = io.connect(`http://${config.chatHost}:${config.chatPort}`);
    this.socket.emit('login', user);
    this.socket.on(uid, message => {
      // console.log(uid);
      this.setState({ messages: [...this.state.messages, message] });
      console.log(message);
    });
  }

  sendMessage = () => {
    const { user, uid } = this.props;
    // const receiverid = this.props
    const message = {
      senderid: user.sid || user.tid,
      receiverid: uid,
      content: this.messageInput.value,
      time: new Date()
    };
    // console.log(message);
    // this.socket.emit('privateMsg', { to: '13110033140', from: '13110033139', content: message });
    this.socket.emit('privateMsg', message);
    this.setState({ messages: [...this.state.messages, message] });
    this.messageInput.value = '';
  }

  mapMessages = styles => (
    // console.log(this.state.messages)
    this.state.messages.map((message, index) => {
      const { uid } = this.props;
      console.log(message);

      if (message.receiverid === uid) {
        return <RightBubble message={message} key={index} />;
      }
      return <LeftBubble message={message} key={index} />;
    })
  )

  goBack = () => {
    browserHistory.goBack();
  }

  render() {
    const styles = require('./ChatPannel.scss');
    const { uid } = this.props;
    // const socket = io.connect('http://localhost:3005');
    // console.log(io);

    return (
      <div className={styles.chat_pannel_container}>
        <div className={styles.chat_pannel_header}>
          <span
            className={`glyphicon glyphicon-menu-left ${styles.back_btn}`}
            onClick={this.goBack}
          />
          <span style={{ fontSize: '13px' }}>与&nbsp;</span>
          <span style={{ fontWeight: 'bold' }}>{uid}</span>
          <span style={{ fontSize: '13px' }}>&nbsp;对话中</span>
        </div>

        <div className={styles.chat_pannel} ref="chatPannel">
          {this.state.messages.length > 0 && this.mapMessages(styles)}
        </div>

        <div className={styles.chat_pannel_footer}>
          <FormGroup
            controlId="formBasicText"
            className={styles.form_group}
          >
            <FormControl
              type="text"
              placeholder="请输入要发送的内容"
              className={styles.form_control}
              inputRef={ref => { this.messageInput = ref; }}
            />
            <div
              className={styles.send_btn}
              onClick={this.sendMessage}
            >
              发&nbsp;送
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}
