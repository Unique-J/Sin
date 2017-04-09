import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/resetPassword';

@connect(
  state => ({
    password: state.async.updatePassword,
  }),
  actionCreators
)
export default class ChangePassword extends Component {
  static propTypes = {
    password: PropTypes.any,
    location: PropTypes.object.isRequired,
    updatePassword: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      samePwd: true,
    };
  }

  setPwd = uid => {
    const pwd = this.pwdInput.value;
    const repeatPwd = this.repeatPwdInput.value;
    console.log(pwd + ' ' + repeatPwd);
    const { logout, updatePassword } = this.props;

    if (pwd === repeatPwd) {
      this.pwdInput.value = '';
      this.repeatPwdInput.value = '';
      this.setState({ samePwd: true });
      logout().then(() => updatePassword(uid, pwd));
    } else {
      this.setState({ samePwd: false });
    }
  }

  render() {
    const styles = require('./ResetPassword.scss');
    const { uid, email } = this.props.location.query;
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
          />
          <FormControl
            type="password"
            placeholder="确认新密码"
            className={styles.last_form_control}
            inputRef={ref => { this.repeatPwdInput = ref; }}
          />
          {!this.state.samePwd && <div className={styles.tips}>
            两次密码不一致，请检查输入
          </div>}
          <button className={styles.btn} onClick={() => this.setPwd(uid)}>
            设置新密码
          </button>
        </FormGroup>
      </div>
    );
  }
}
