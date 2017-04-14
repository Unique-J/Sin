import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/forgetPassword';

@connect(
  state => ({
    // user: state.async.user,
    email: state.async.sendResetPwdEmail
  }),
  actionCreators
)
export default class ForgetPassword extends Component {
  static propTypes = {
    // user: PropTypes.any,
    email: PropTypes.any,
    // getUser: PropTypes.func.isRequired,
    sendResetPwdEmail: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      uidEmpty: false,
      emailEmpty: false,
      emailValidate: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.email !== this.props.email) {
      this.setState({ emailValidate: true });
    }
  }

  resetPassword = () => {
    const { sendResetPwdEmail } = this.props;
    const uid = this.uidInput.value;
    const email = this.emailInput.value;

    if (uid && email) {
      sendResetPwdEmail(uid, email);
      this.uidInput.value = '';
      this.emailInput.value = '';
      this.setState({ uidEmpty: false, emailEmpty: false });
    } else if (!email) {
      this.setState({ emailEmpty: true });
    } else if (!uid) {
      this.setState({ uidEmpty: true });
    }
  }

  changeState = () => {
    this.setState({
      emailEmpty: false,
      emailValidate: false
    });
  }

  toPage = url => {
    browserHistory.push(url);
  }

  render() {
    const styles = require('./ForgetPassword.scss');
    const { email } = this.props;
    const { uidEmpty, emailEmpty, emailValidate } = this.state;
    // console.log(email);

    return (
      <div className={styles.forget_password_container}>
        <div className={styles.header}>S&nbsp;I&nbsp;N</div>
        <FormGroup
          controlId="formBasicText"
          className={styles.form_group}
        >
          {!(email && email.success) && <div>
            <FormControl
              type="text"
              placeholder="学生学号 / 教工工号"
              className={styles.uid_form_control}
              inputRef={ref => { this.uidInput = ref; }}
              onFocus={this.changeState}
            />
            <FormControl
              type="text"
              placeholder="电子邮件"
              className={styles.email_form_control}
              inputRef={ref => { this.emailInput = ref; }}
              onFocus={this.changeState}
            />
            {(uidEmpty || emailEmpty) && <div className={styles.tips}>
              请输入ID号或邮箱地址
            </div>}
            {emailValidate && email && <div className={styles.tips}>
              对不起，该电子邮件地址未在此注册
              <div style={{ marginTop: 5 }}>请
                <span className={styles.link}>
                  注册一个新帐户
                </span>
              </div>
            </div>}
            <button className={styles.cancel_btn} onClick={() => this.toPage('/')}>
              取消
            </button>
            <button className={styles.reset_pwd_btn} onClick={this.resetPassword}>
              重置密码
            </button>
          </div>}

          {email && email.success && <div>
            <div className={styles.tip}>
              <div>
                我们已给你发送了一封电子邮件，其中包含了重置密码的说明。
              </div>
              <div style={{ marginTop: 10 }}>
                请确保它没有被过滤到你的垃圾邮件里。&nbsp;&nbsp;如果你没有收到我们的密码重置邮件，请参阅我们的
                <span className={styles.link}>帮助文档</span>
              </div>
            </div>
            <button
              className={styles.cancel_btn}
              onClick={() => this.toPage('/')}
            >完成</button>
          </div>}
        </FormGroup>
      </div>
    );
  }
}
