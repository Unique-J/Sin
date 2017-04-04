import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { LeftBubble, RightBubble } from '../index';

export default class ChatPannel extends Component {
  render() {
    const styles = require('./ChatPannel.scss');

    return (
      <div className={styles.chat_pannel_container}>
        <div className={styles.chat_pannel_header}>
          <span style={{ fontSize: '13px' }}>与&nbsp;</span>
          <span style={{ fontWeight: 'bold' }}>1212</span>
          <span style={{ fontSize: '13px' }}>&nbsp;对话中</span>
        </div>

        <div className={styles.chat_pannel}>
          <LeftBubble />
          <RightBubble />
          <RightBubble />
          <LeftBubble />
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
            />
            <div
              className={styles.send_btn}
            >
              发&nbsp;送
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}
