import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class InfoItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      showEidtor: false,
      showPwd: false,
      newPwd: false,
    };
  }

  operateLink = () => {
    const { type } = this.props;

    switch (type) {
      case 'WATCH': return '查看';
      case 'EDITOR': return this.state.showEidtor ? '收起' : '编辑';
      case 'PWD': return this.state.showPwd ? '收起' : '修改密码';
      default: return '';
    }
  }

  clickItem = () => {
    const { type } = this.props;

    switch (type) {
      case 'WATCH': return;
      case 'EDITOR': this.setState({ showEidtor: !this.state.showEidtor }); return;
      case 'PWD': this.setState({ showPwd: !this.state.showPwd }); return;
      default: return;
    }
  }

  hideEditor = () => {
    this.setState({ showEidtor: false, showPwd: false });
  }

  render() {
    const styles = require('./InfoItem.scss');
    const { title } = this.props;
    const { showEidtor, showPwd, newPwd } = this.state;

    return (
      <div className={styles.info_item_container}>
        <div className={styles.info_item_header} onClick={this.clickItem}>
          <span className={styles.item_title}>{title}</span>
          <span className={styles.item_content}>{showEidtor ? '' : 'YangJi'}</span>
          <span className={styles.item_operate}>{this.operateLink()}</span>
        </div>

        {showEidtor && <div className={styles.info_item_footer}>
          <div className={styles.old_wrapper}>
            <span>现{title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>1</span>
          </div>
          <div className={styles.new_wrapper}>
            <span>新{title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className={styles.input} placeholder={`请输入新${title}`} />
          </div>
          <button className={styles.save_btn}>保存</button>
          <button className={styles.close_btn} onClick={this.hideEditor}>关闭</button>
        </div>}

        {showPwd && <div className={styles.info_item_footer}>
          <div className={styles.old_wrapper}>
            <div>
              <span>原密码</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className={styles.input} placeholder={'请输入原密码'} />
              <span className={styles.tip}>请输入正确的密码</span>
            </div>
            <button className={styles.save_btn}>下一步</button>
          </div>
          {newPwd && <div className={styles.new_wrapper}>
            <div style={{ marginBottom: 10 }}>
              <span>新密码</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className={styles.input} placeholder={'请输入原密码'} />
            </div>
            <div>
              <span>确认新密码</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className={styles.input} placeholder={'请输入原密码'} />
              <span className={styles.tip}>两次密码不一致</span>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className={styles.save_btn}>提&nbsp;&nbsp;交</button>
          </div>}
        </div>}
      </div>
    );
  }
}
