import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { Reply } from '../index';

export default class ReplyModal extends Component {
  render() {
    return (
      <div>
        <Modal
          show
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              <b>查看对话</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Reply />
            <Reply />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
