import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import { FormGroup, FormControl } from 'react-bootstrap';
import * as loginActions from '../../actions/login';

@connect(
  state => ({
    user: state.async.verifyUser,
    loadState: state.async.loadState && state.async.loadState.verifyUser
  }),
  loginActions
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.any,
    loadState: PropTypes.any,
    verifyUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      idValidFlag: false,
      nextStepClicked: false,
      init: true
    };
  }

  componentDidMount() {
    const useridInput = this.useridInput;
    useridInput.onchange = this.judgeIdValid;
  }

  judgeIdValid = () => {
    const userid = this.useridInput.value;
    console.log(userid);
    this.setState({ init: false });
    if (!/^(\d){6}$/.test(userid) && !/^(\d){11}$/.test(userid)) {
      this.setState({ idValidFlag: false });
    } else {
      this.setState({ idValidFlag: true });
      this.props.verifyUser(userid);
    }
    // console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let userid = this.useridInput.value;
    let pwd = this.pwdInput.value;
    // console.log(userid + ' ' + pwd);
    this.props.login(userid, pwd).then(() => { browserHistory.push('/dashboard'); });
    userid = '';
    pwd = '';
  };

  nextStep = (e) => {
    e.preventDefault();
    this.setState({ nextStepClicked: true });
  };

  render() {
    const styles = require('./Login.scss');
    const { user, loadState } = this.props;
    const { init, idValidFlag, nextStepClicked } = this.state;

    return (
      <div className={styles.container}>
        <Helmet title="登录" />
        <header className={styles.header}>
          <span className={styles.brand}>S</span>
          <span><a className={styles.signup_link}>注 册</a></span>
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
                  className={styles.form_id_control}
                  style={
                    idValidFlag ? {} :
                    { borderBottomLeftRadius: 2, borderBottomRightRadius: 2 }
                  }
                  disabled={nextStepClicked}
                  inputRef={ref => { this.useridInput = ref; }}
                />
                {!init && user && !user.email && idValidFlag &&
                  loadState && loadState.loaded &&
                  <div className={styles.prompt_container}>
                    <span className={styles.prompt_text}>
                      该&nbsp;ID&nbsp;尚未用于注册&nbsp;Sin&nbsp;帐号。
                      现在&nbsp;
                      <a href="/register">注册</a>
                      &nbsp;吗?
                    </span>
                  </div>
                }
                {!init && !user && idValidFlag &&
                  loadState && loadState.loaded &&
                  <div className={styles.prompt_container}>
                    <span className={styles.prompt_text}>
                      无该&nbsp;学生学号&nbsp;/&nbsp;教工工号&nbsp;
                    </span>
                  </div>
                }
                {!init && !idValidFlag &&
                  <div className={styles.prompt_container}>
                    <span className={styles.prompt_text}>
                      请输入正确的&nbsp;ID&nbsp;
                    </span>
                  </div>
                }
                {nextStepClicked &&
                  <FormControl
                    type="password"
                    placeholder="密码"
                    className={styles.form_pwd_control}
                    inputRef={ref => { this.pwdInput = ref; }}
                  />
                }
              </FormGroup>
              <button
                className={`${styles.btn_login} btn`}
                onClick={!nextStepClicked ? this.nextStep : this.handleSubmit}
                disabled={!(user && user.email)}
              >
                <span className={styles.text_login}>
                  {nextStepClicked ? '登 录' : '下 一 步'}
                </span>
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
