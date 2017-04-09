import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { LeftBubble, RightBubble } from '../index';
import io from 'socket.io-client';
import config from '../../config';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actionCreators from '../../actions/chatPannel';
import { createMessageId } from '../../utils/utils';

@connect(
  state => ({
    user: state.async.login,
    historyMessages: state.async.messages,
    person: state.async.person,
  }),
  actionCreators
)
class MyChatPannel extends Component {
  static propTypes = {
    user: PropTypes.any,
    historyMessages: PropTypes.any,
    person: PropTypes.any,
    uid: PropTypes.string.isRequired,
    getMessages: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      messages: [],
      historyMessages: []
    };
  }

  componentDidMount() {
    const { user, uid, getMessages, getPerson } = this.props;
    const userid = user.sid || user.tid;
    const mid = createMessageId(userid, uid);
    const messageInput = this.messageInput;

    messageInput.onkeypress = e => {
      if (e.keyCode === 13) {
        this.sendMessage();
      }
    };

    getMessages(mid, 3);
    getPerson(uid);

    this.socket = io.connect(`http://${config.chatHost}:${config.chatPort}`);
    this.socket.emit('login', user);
    this.socket.on(userid, message => {
      // console.log(message);
      if (message.senderid === uid) {
        this.setState({ messages: [...this.state.messages, message] });
      }
      // console.log(message);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.historyMessages !== this.props.historyMessages) {
      this.setState({ historyMessages: [...this.state.historyMessages,
        ...nextProps.historyMessages] });
    }
  }

  sendMessage = () => {
    const { user, uid } = this.props;
    const msgContent = this.messageInput.value;
    // const receiverid = this.props
    if (msgContent) {
      const message = {
        senderid: user.sid || user.tid,
        receiverid: uid,
        content: this.messageInput.value,
        time: new Date()
      };

      this.socket.emit('privateMsg', message);
      this.setState({ messages: [...this.state.messages, message] });
      this.messageInput.value = '';
    }
    // console.log(message);
    // this.socket.emit('privateMsg', { to: '13110033140', from: '13110033139', content: message });
  }

  mapMessages = (messages) => (
    // console.log(this.state.messages)
    messages.map((message, index) => {
      const { uid } = this.props;
      // console.log(message);

      if (message.receiverid === uid) {
        return <RightBubble message={message} key={index} />;
      }
      return <LeftBubble message={message} key={index} />;
    })
  )

  goBack = () => {
    browserHistory.push('/userinfo');
  }

  render() {
    const styles = require('./ChatPannel.scss');
    const { person } = this.props;
    const { messages, historyMessages } = this.state;
    // const socket = io.connect('http://localhost:3005');
    // console.log(messages);

    return (
      <div className={styles.chat_pannel_container}>
        <div className={styles.chat_pannel_header}>
          <span
            className={`glyphicon glyphicon-menu-left ${styles.back_btn}`}
            onClick={this.goBack}
          />
          <span style={{ fontSize: '13px' }}>与&nbsp;</span>
          <span style={{ fontWeight: 'bold' }}>{person && person.name}</span>
          <span style={{ fontSize: '13px' }}>&nbsp;对话中</span>
        </div>

        <div className={styles.chat_pannel} ref="chatPannel">
          {historyMessages && historyMessages.length > 0 && this.mapMessages(historyMessages)}

          <div className={styles.history_record_line}>
            <span className={styles.line}>
              --------------------------------------------------
            </span>
            &nbsp;&nbsp;
            {historyMessages && (historyMessages.length === 0 ? '暂时无历史纪录' : '以上为历史记录')}
            &nbsp;&nbsp;
            <span className={styles.line}>
              --------------------------------------------------
            </span>
          </div>

          {messages && messages.length > 0 && this.mapMessages(messages)}
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

export default function ChatPannel(props) {
  return (<MyChatPannel {...props} key={props.uid} />);
}

ChatPannel.propTypes = {
  uid: PropTypes.string.isRequired
};
