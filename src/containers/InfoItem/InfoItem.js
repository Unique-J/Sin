import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actorCretors from '../../actions/infoItem';

@connect(
  state => ({
    user: state.async.login,
    info: state.async.info,
    person: state.async.person,
    validate: state.async.validatePwd,
    pwd: state.async.updatePwd,
  }),
  actorCretors
)
export default class InfoItem extends Component {
  static propTypes = {
    user: PropTypes.any,
    info: PropTypes.any,
    person: PropTypes.any,
    validate: PropTypes.any,
    pwd: PropTypes.any,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    // update: PropTypes.func.isRequired,
    updateInfo: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
    validatePwd: PropTypes.func.isRequired,
    updatePwd: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showEidtor: false,
      showPwd: false,
      success: false,
      oldPwdCorrect: false,
      oldSuccess: false,
      samePwd: true,
      emptyPwd: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { user, getPerson } = this.props;
    const uid = user.sid || user.tid;

    if (nextProps.info !== this.props.info && nextProps.info.success) {
      getPerson(uid);
      this.setState({ success: true });
      setTimeout(() => this.setState({ success: false }), 2000);
      // setTimeout(() => this.setState({ showEidtor: false }), 4000);
    }

    if (nextProps.validate !== this.props.validate && nextProps.validate.email) {
      this.setState({ oldPwdCorrect: true });
    }

    if (nextProps.validate !== this.props.validate) {
      if (!this.state.oldPwdCorrect) {
        this.setState({ oldSuccess: true });
        setTimeout(() => this.setState({ oldSuccess: false }), 2000);
      }
    }
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
      case 'PWD': this.setState({
        showPwd: !this.state.showPwd,
        oldPwdCorrect: false,
        oldSuccess: false,
        samePwd: true,
        emptyPwd: false,
      }); return;
      default: return;
    }
  }

  hideEditor = () => {
    this.setState({
      showEidtor: false,
      showPwd: false,
      oldPwdCorrect: false,
      oldSuccess: false,
      samePwd: true,
      emptyPwd: false,
    });
  }

  updateInfo = () => {
    const { user, title, updateInfo } = this.props;
    const contentInput = this.refs.contentInput;
    // console.log(contentInput.value);

    const uid = user.sid || user.tid;
    if (contentInput.value) {
      updateInfo(uid, title, contentInput.value);
      this.refs.contentInput.value = '';
    }
  }

  validatePwd = () => {
    const { user, validatePwd } = this.props;
    const oldPwd = this.refs.oldPwdInput.value;
    const uid = user.sid || user.tid;

    if (oldPwd) {
      validatePwd(uid, oldPwd);
      this.refs.oldPwdInput.value = '';
    }
  }

  updatePwd = () => {
    const newPwd = this.refs.newPwdInput.value;
    const repeatPwd = this.refs.repeatNewPwdInput.value;
    // console.log(newPwd + ' ' + repeatPwd);
    const { user, updatePwd, logout } = this.props;
    const uid = user.sid || user.tid;

    if (!newPwd || !repeatPwd) {
      this.setState({ emptyPwd: true, samePwd: true });
    }

    if (newPwd && repeatPwd) {
      this.setState({ emptyPwd: false });

      if (newPwd === repeatPwd) {
        this.setState({ samePwd: true });
        updatePwd(uid, newPwd).then(() => logout());
        // updatePwd(uid, newPwd);
      } else {
        this.setState({ samePwd: false });
      }
    }
  }

  render() {
    const styles = require('./InfoItem.scss');
    const { title, content, info, person, pwd } = this.props;
    const { showEidtor, showPwd, oldPwdCorrect,
      success, oldSuccess, samePwd, emptyPwd } = this.state;
    // console.log(person[title]);
    // console.log(oldPwdCorrect);
    // const reloginLink = <a href="/" className={styles.relogin_link} />;
    // console.log(pwd);

    return (
      <div className={styles.info_item_container}>
        <div className={styles.info_item_header} onClick={this.clickItem}>
          <span className={styles.item_title}>{title}</span>
          <span className={styles.item_content}>
            {showEidtor ? '' : ((person && person[title]) || content)}
          </span>
          <span className={styles.item_operate}>{this.operateLink()}</span>
        </div>

        {showEidtor && <div className={styles.info_item_footer}>
          <div className={styles.old_wrapper}>
            <span>现{title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{(person && person[title]) || content}</span>
          </div>
          <div className={styles.new_wrapper}>
            <span>新{title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className={styles.input} placeholder={`请输入新${title}`} ref="contentInput" />
            {info && info.success && success && <span className={styles.tip}>修改成功</span>}
            {info && !info.success && success && <span className={styles.tip}>修改失败</span>}
          </div>
          <button className={styles.save_btn} onClick={this.updateInfo}>保存</button>
          <button className={styles.close_btn} onClick={this.hideEditor}>关闭</button>
        </div>}

        {showPwd && <div className={styles.info_item_footer}>
          {!oldPwdCorrect && <div className={styles.old_wrapper}>
            <div>
              <span>原密码</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                className={styles.input} placeholder={'请输入原密码'}
                type="password" ref="oldPwdInput"
              />
              {oldSuccess && <span className={styles.tip}>请输入正确的密码</span>}
            </div>
            <button className={styles.save_btn} onClick={this.validatePwd}>下一步</button>
          </div>}

          {oldPwdCorrect && <div className={styles.new_wrapper}>
            <div style={{ marginBottom: 10 }}>
              <span>新密码</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                className={styles.input} placeholder={'请输入新密码'}
                type="password" ref="newPwdInput"
              />
            </div>
            <div>
              <span>确认新密码</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                className={styles.input} placeholder={'请输入原密码'}
                type="password" ref="repeatNewPwdInput"
              />
              {!samePwd && <span className={styles.tip}>两次密码不一致</span>}
              {emptyPwd && <span className={styles.tip}>密码不能为空</span>}
              {pwd && pwd.success && <span className={styles.tip}>
                修改密码成功, 请重新&nbsp;<a href="/" className={styles.relogin_link}>登录</a>
              </span>}
              {pwd && !pwd.success && <span className={styles.tip}>
                修改密码失败, 请重试
              </span>}
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className={styles.save_btn} onClick={this.updatePwd}>提&nbsp;&nbsp;交</button>
          </div>}
        </div>}
      </div>
    );
  }
}
