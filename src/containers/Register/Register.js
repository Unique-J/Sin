import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem, Thumbnail, Button,
  FormGroup, FormControl
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as registerCreators from '../../actions/register';

@connect(
  state => ({
    register: state.async.register,
    loadState: state.async.loadState && state.async.loadState.register
  }),
  registerCreators
)
class Register extends Component {
  static propTypes = {
    register: PropTypes.any,
    loadState: PropTypes.any,
    judgeUserRegistered: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      idValidFlag: true,
      emailValidFlag: true,
      init: true
    };
  }

  componentDidMount() {
    const idInput = this.idInput;
    const emailInput = this.emailInput;
    idInput.onchange = this.judgeIdValid;
    emailInput.onchange = this.judgeEmaildValid;
  }

  judgeIdValid = () => {
    const id = this.idInput.value;

    this.setState({ idValidFlag: true, init: false });

    if (!/^(\d){6}$/.test(id) && !/^(\d){11}$/.test(id)) {
      this.setState({ idValidFlag: false });
      console.info('wrong');
    } else {
      this.props.judgeUserRegistered(id);
    }
  };

  judgeEmaildValid = () => {
    const email = this.emailInput.value;

    this.setState({ emailValidFlag: true });

    if (/^([A-Za-z]{1}[A-Za-z\d_]{4,16}[A-Za-z\d]{1}|[\d]{11})@((163|126)\.com|yeah\.net)$/
    .test(email)) {
      console.info('valid');
    } else {
      this.setState({ emailValidFlag: false });
      console.info('wrong');
    }
  };

  clickRegisterBtn = () => {
    const id = this.idInput.value;
    const email = this.emailInput.value;
    const pwd = this.pwdInput.value;
    const gender = this.refs.genderSelect.value;
    this.props.registerUser(id, email, pwd, gender);
    console.log(`${id} ${email} ${pwd} ${gender}`);
  };

  render() {
    const styles = require('./Register.scss');
    const { register, loadState } = this.props;
    console.log(register);
    return (
      <div className={styles.container}>
        <Navbar className={styles.banner}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" className={styles.brand_link}>Sin</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Help</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.register_container} style={{ height: 632, background: '#F9F9FA' }}>
          <Thumbnail className={styles.register_box}>
            <span className={styles.register_box_top}></span>
            <div className={styles.sin_logo}>
              <div className={styles.logo_img}></div>
            </div>
            <div>
              <div className={styles.register_text}>注 册</div>
              <FormGroup>
                <FormControl
                  type="text"
                  className={styles.id_input}
                  placeholder="学生学号&nbsp;/&nbsp;教工工号"
                  inputRef={ref => { this.idInput = ref; }}
                />
                {(this.state.idValidFlag && register && register.email) &&
                  <div className={styles.prompt_danger}>
                    该&nbsp;学生学号&nbsp;/&nbsp;教工工号&nbsp;已注册
                  </div>
                }
                {!this.state.init && this.state.idValidFlag &&
                (!(register && (register.tid || register.sid))) &&
                 (loadState && loadState.loaded) &&
                  <div className={styles.prompt_danger}>
                    无该&nbsp;学生学号&nbsp;/&nbsp;教工工号&nbsp;
                  </div>
                }
                {!this.state.idValidFlag &&
                  <div className={styles.prompt_danger}>
                    请输入正确的&nbsp;学生学号&nbsp;/&nbsp;教工工号
                  </div>
                }
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="email"
                  className={styles.email_input}
                  placeholder="邮&nbsp;箱&nbsp;地&nbsp;址"
                  inputRef={ref => { this.emailInput = ref; }}
                />
                {!this.state.emailValidFlag &&
                  <div className={styles.prompt_danger}>
                    请输入正确的邮箱地址
                  </div>
                }
                <div className={styles.prompt}>
                  <a
                    href="http://www.126.com/"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >我要注册新的邮箱</a>
                </div>
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="password"
                  className={styles.pwd_input}
                  placeholder="密&nbsp;&nbsp;码"
                  inputRef={ref => { this.pwdInput = ref; }}
                />
              </FormGroup>
              <FormGroup>
                <select className={styles.sex_select} ref="genderSelect">
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </FormGroup>
              <Button
                type="button" block
                bsStyle="primary"
                bsSize="large"
                className={styles.submit_button}
                onClick={this.clickRegisterBtn}
                disabled={!(register && !register.email && this.state.idValidFlag)}
              >
                继&nbsp;续
              </Button>
            </div>
            <div className={styles.sign_in}>
              已经注册过账户?
              <span className={styles.link}>
                <a href="/login" style={{ textDecoration: 'none' }}>&nbsp;登陆</a>
              </span>
            </div>
            <div className={styles.item}>
              我同意&nbsp;Sin&nbsp;的&nbsp;
              <span className={styles.link}>
                <a href="#" style={{ textDecoration: 'none' }}>条款</a>
              </span>
              &nbsp;和&nbsp;
              <span className={styles.link}>
                <a href="#" style={{ textDecoration: 'none' }}>隐私</a>
              </span>
            </div>
          </Thumbnail>
        </div>
      </div>
    );
  }
}

export default Register;
