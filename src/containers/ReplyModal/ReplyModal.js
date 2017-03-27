import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ReplyModal extends Component {
  render() {
    return (
      <div>
        <Modal
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              <b>查看对话</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Wrapped Text</h4>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
