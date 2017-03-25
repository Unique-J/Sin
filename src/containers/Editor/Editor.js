import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, FormControl,
  OverlayTrigger, Popover, DropdownButton, MenuItem
 } from 'react-bootstrap';
import marked from 'marked';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions/editor';

@connect(
  state => ({
    user: state.async.login,
    dashboard: state.dashboard,
    saveState: state.async.saveArticle
  }),
  ActionCreators
)
export default class Editor extends Component {
  static propTypes = {
    dashboard: PropTypes.any,
    saveState: PropTypes.any,
    user: PropTypes.any,
    showEditor: PropTypes.func.isRequired,
    saveArticle: PropTypes.func.isRequired,
    getArticlesByTid: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      text: '',
      showPreviewArea: true
    };
  }

  editText = () => {
    const editText = this.editArea.value;
    const text = marked(editText);
    this.setState({ text });
  };

  showPreviewArea = () => {
    this.setState({ showPreviewArea: !this.state.showPreviewArea });
  }

  sendArticle = () => {
    const tid = this.props.user.tid;
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const content = marked(this.editArea.value);
    const tags = this.tagInput.value;
    this.props.saveArticle(title, description, content, tags, new Date(), tid)
      .then(() => {
        this.props.showEditor();
        this.props.getArticlesByTid(tid);
      });
  }

  render() {
    const styles = require('./Editor.scss');
    const popoverFocus = (
      <Popover
        id="popover-trigger-focus"
        title="提 示"
      >
        可以使用 Markdown 语法，点击预览可预览编辑效果
      </Popover>
    );
    const { showEditorFlag } = this.props.dashboard;
    const { showEditor } = this.props;

    return (
      <Modal
        backdrop="static"
        show={showEditorFlag}
        onHide={showEditor}
        bsSize="large"
        dialogClassName={styles.editor_modal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            t-mac-j
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <FormGroup
            bsSize="large"
            className={styles.title_group}
          >
            <FormControl
              type="text"
              bsSize="large"
              placeholder="标 题"
              className={styles.title_input}
              inputRef={ref => { this.titleInput = ref; }}
            />
          </FormGroup>
          <FormGroup className={styles.description_group}>
            <FormControl
              type="text"
              placeholder="描 述"
              className={styles.description_input}
              inputRef={ref => { this.descriptionInput = ref; }}
            />
          </FormGroup>
          <div className={styles.tabs}>
            <span style={{ flex: 1 }}>
              <span className={`glyphicon glyphicon-edit ${styles.markdown_tab}`}>
                <span className={styles.markdown_tab_text}>Markdown</span>
              </span>
              <span
                className={`glyphicon ${styles.preview_tab}
                ${this.state.showPreviewArea ? 'glyphicon-eye-close' : 'glyphicon-eye-open'}`}
                onClick={this.showPreviewArea}
              >
                <span className={styles.preview_tab_text}>
                  {this.state.showPreviewArea ? '取消预览' : '预览'}
                </span>
              </span>
            </span>
            <span
              style={{ flex: 1 }}
              className={this.state.showPreviewArea ? {} : styles.hidden}
            >
              <OverlayTrigger trigger="focus" placement="left" overlay={popoverFocus}>
                <Button className={`glyphicon glyphicon-question-sign ${styles.question_tab}`} />
              </OverlayTrigger>
            </span>
          </div>
          <FormGroup className={styles.edit_area_group}>
            <FormControl
              componentClass="textarea"
              placeholder="编辑文章"
              className={styles.edit_area}
              rows={18}
              inputRef={ref => { this.editArea = ref; }}
              onChange={this.editText}
            />
            <div
              className={this.state.showPreviewArea ? styles.preview_area :
              [styles.preview_area, styles.show]}
              dangerouslySetInnerHTML={{
                __html: this.state.showPreviewArea ? this.state.text : '' }}
            />
          </FormGroup>
          <FormGroup
            bsSize="sm"
            className={styles.tag_group}
          >
            <FormControl
              type="text"
              placeholder="#标 签  [ 以 # 分隔 ] "
              className={styles.tag_input}
              inputRef={ref => { this.tagInput = ref; }}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={styles.close_btn}
            onClick={showEditor}
          >关闭</Button>
          <DropdownButton
            bsStyle="info" title="发送" key={1}
            id="dropdown-btn" pullRight dropup
          >
            <MenuItem eventKey="1" onClick={this.sendArticle}>现在发送</MenuItem>
            <MenuItem eventKey="2">保存为草稿</MenuItem>
          </DropdownButton>
        </Modal.Footer>
      </Modal>
    );
  }
}
