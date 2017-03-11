import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormGroup, FormControl } from 'react-bootstrap';
import * as authActions from '../../actions/auth';

@connect(
  state => ({ user: state.async.user }),
  authActions
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.any,
    login: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.username.value + ' ' + this.pwd.value);
    this.props.login(this.username.value);
    // input.value = '';
  };

  render() {
    const { user, logout } = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.container}>
        <Helmet title="登录" />
        <header className={styles.header}>
          <span className={styles.brand}>S</span>
          <span><Link className={styles.signup_link}>注 册</Link></span>
        </header>
        <div className={styles.body}>
          <div className={styles.side} />
          <div className={styles.form_container}>
            <form className={styles.form}>
              <div>
                <h1 className={styles.title}>S . I . N</h1>
              </div>
              <FormGroup bsSize="large" className={styles.form_group}>
                <FormControl
                  type="text"
                  placeholder="账号"
                  className={styles.form_control}
                  inputRef={ref => { this.username = ref; }}
                />
                <FormControl
                  type="password"
                  placeholder="密码"
                  className={styles.form_control}
                  inputRef={ref => { this.pwd = ref; }}
                />
              </FormGroup>
              <button className={`${styles.btn_login} btn`} onClick={this.handleSubmit}>
                <span className={styles.text_login}>登 录</span>
              </button>
              <div className={styles.forget_pwd}>
                <a href="#" className={styles.link_item}>忘 记 密 码？</a>
              </div>
            </form>
          </div>
          <div className={styles.side}>
            <span className={`${styles.glyphicon} glyphicon glyphicon-menu-right`}></span>
          </div>
        </div>
        <footer className={styles.footer}>
          <span className={styles.link}>
            <a href="#" target="_blank" className={styles.link_item}>条款</a>
          </span>
          <span className={styles.link}>
            <a href="#" target="_blank" className={styles.link_item}>隐私</a>
          </span>
          <span className={styles.link}>
            <a href="#" target="_blank" className={styles.link_item}>工作机会</a>
          </span>
          <span className={styles.link}>
            <a href="#" target="_blank" className={styles.link_item}>客户支持</a>
          </span>
        </footer>
      </div>
    );
  }
}
