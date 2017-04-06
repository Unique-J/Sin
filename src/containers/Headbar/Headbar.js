import React, { Component, PropTypes } from 'react';
import { Nav, Navbar, NavItem, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actionCreators from '../../actions/headbar';

@connect(
  state => ({
    user: state.async.login,
    commentbox: state.async.commentbox
  }),
  actionCreators
)
export default class Headbar extends Component {
  static propTypes = {
    showEditor: PropTypes.func.isRequired,
    user: PropTypes.any,
    getCommentbox: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, getCommentbox } = this.props;
    const searchInput = this.searchInput;

    searchInput.onkeypress = e => {
      if (e.keyCode === 13) {
        this.searchContent();
      }
    };

    if (user) {
      const uid = user.sid || user.tid;
      getCommentbox(uid);
    }
  }

  searchContent = () => {
    const searchCondition = this.searchInput.value;
    // console.log(searchInput.value);
    if (searchCondition !== '') {
      browserHistory.push(`/searchpage?searchcondition=${searchCondition}`);
    }
  };

  logout = () => {
    const { user, logout } = this.props;
    if (user) {
      logout().then(() => {
        // const socket = io.connect('http://localhost:3005');
        console.log(user);
        // socket.emit('disconnect');
        browserHistory.push('/');
      });
    }
  }

  render() {
    const styles = require('./Headbar.scss');
    const { showEditor, user } = this.props;
    // console.log(user);

    return (
      <header className={styles.header}>
        <Navbar className={styles.navbar} fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <div className={styles.brand}>SIN</div>
            </Navbar.Brand>
            <Navbar.Form pullLeft>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon className={styles.search_glyphicon}>
                    <span className={'glyphicon glyphicon-search'}></span>
                  </InputGroup.Addon>
                  <FormControl
                    type="text" placeholder="搜索 SIN"
                    className={styles.search_input}
                    inputRef={ref => { this.searchInput = ref; }}
                    style={{ width: 500 }}
                  />
                </InputGroup>
              </FormGroup>
            </Navbar.Form>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="/dashboard">
              <span className={`glyphicon glyphicon-home ${styles.icon_link}`}></span>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <span className={`glyphicon glyphicon-send ${styles.icon_link}`}></span>
            </NavItem>
            <NavItem eventKey={3} href="/replylist">
              <span className={`glyphicon glyphicon-comment ${styles.icon_link}`}></span>
              <span className={styles.point}></span>
            </NavItem>
            <NavItem eventKey={4} href="#">
              <span className={`glyphicon glyphicon-envelope ${styles.icon_link}`}></span>
              <span className={styles.point}></span>
            </NavItem>
            <NavItem eventKey={5} href="/userinfo">
              <span className={`glyphicon glyphicon-user ${styles.icon_link}`}></span>
            </NavItem>
            {user && user.tid && <NavItem eventKey={6} href="#" onClick={showEditor}>
              <span className={`glyphicon glyphicon-pencil ${styles.icon_link}`}></span>
            </NavItem>}
            <NavItem eventKey={(user && user.tid) ? 7 : 6} href="#" onClick={this.logout}>
              <span className={`glyphicon glyphicon-log-out ${styles.icon_link}`}></span>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
    );
  }
}
