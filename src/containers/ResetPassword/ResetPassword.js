import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/resetPassword';
import { browserHistory } from 'react-router';

@connect(
  state => ({
    password: state.async.resetPassword,
  }),
  actionCreators
)
export default class ChangePassword extends Component {
  static propTypes = {
    password: PropTypes.any,
    location: PropTypes.object.isRequired,
    resetPassword: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      samePwd: true,
      showTip: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.password !== this.props.password) {
      this.setState({ showTip: true });
    }
  }

  resetPwd = (uid, email, resetPwdCode) => {
    const pwd = this.pwdInput.value;
    const repeatPwd = this.repeatPwdInput.value;
    console.log(pwd + ' ' + repeatPwd);
    const { resetPassword, logout } = this.props;

    if (pwd === repeatPwd) {
      this.pwdInput.value = '';
      this.repeatPwdInput.value = '';
      this.setState({ samePwd: true });
      logout().then(() => resetPassword(uid, `${email}.com`, resetPwdCode, pwd));
    } else {
      this.setState({ samePwd: false });
    }
  }

  changeState = () => {
    this.setState({
      samePwd: true,
      showTip: false,
    });
  }

  render() {
    const styles = require('./ResetPassword.scss');
    const { uid, email, resetPwdCode } = this.props.location.query;
    const { password } = this.props;
    const { showTip } = this.state;
    console.log(password);
    // console.log(uid + ' ' + email);

    return (
      <div className={styles.change_password_container}>
        <div className={styles.header}>S&nbsp;I&nbsp;N</div>
        <FormGroup
          controlId="formBasicText"
          className={styles.form_group}
        >
          <FormControl
            type="text"
            placeholder={uid}
            disabled
            className={styles.first_form_control}
          />
          <FormControl
            type="text"
            placeholder={email}
            disabled
            className={styles.form_control}
          />
          <FormControl
            type="password"
            placeholder="新密码"
            className={styles.form_control}
            inputRef={ref => { this.pwdInput = ref; }}
            onFocus={this.changeState}
          />
          <FormControl
            type="password"
            placeholder="确认新密码"
            className={styles.last_form_control}
            inputRef={ref => { this.repeatPwdInput = ref; }}
            onFocus={this.changeState}
          />

          {!this.state.samePwd && <div className={styles.tips}>
            两次密码不一致，请检查输入
          </div>}

          {showTip && password && !password.success && <div className={styles.tips}>
            修改密码失败
          </div>}

          {showTip && password && password.success && <div className={styles.tips}>
            修改密码成功,请重新
            <span
              className={styles.link}
              onClick={() => browserHistory.push('/login')}
            >
              登陆
            </span>
          </div>}

          <button className={styles.btn} onClick={() => this.resetPwd(uid, email, resetPwdCode)}>
            设置新密码
          </button>
        </FormGroup>
      </div>
    );
  }
}
