import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { LeftBubble, RightBubble } from '../index';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

@connect(
  state => ({
    user: state.async.login
  })
)
export default class ChatPannel extends Component {
  static propTypes = {
    user: PropTypes.any
  };

  componentDidMount() {
    const { user } = this.props;

    this.socket = io.connect('http://localhost:3005');
    this.socket.emit('login', user);
    this.socket.on('to13110033140', mes => {
      console.log('40: ');
      console.log(mes);
    });
    this.socket.on('to13110033139', mes => {
      console.log('39: ');
      console.log(mes);
    });
  }

  sendMessage = () => {
    const message = this.messageInput.value;
    // const socket = io.connect('http://localhost:3005');
    // socket.emit('login', { sid: '13110033139', name: 'YangJi' });
    this.socket.emit('privateMsg', { to: '13110033140', from: '13110033139', content: message });
    // this.socket.on('to13110033140', mes => {
    //   console.log(mes);
    // });
    // console.log(message);
    this.messageInput.value = '';
  }

  goBack = () => {
    browserHistory.goBack();
  }

  render() {
    const styles = require('./ChatPannel.scss');
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
          <span style={{ fontWeight: 'bold' }}>1212</span>
          <span style={{ fontSize: '13px' }}>&nbsp;对话中</span>
        </div>

        <div className={styles.chat_pannel}>
          <LeftBubble />
          <RightBubble />
          <RightBubble />
          <LeftBubble />
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
