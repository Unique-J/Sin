import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, browserHistory } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import config from '../../config';

@connect(
  state => ({ user: state.async.user }),
)
class Main extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    user: PropTypes.any
  };

  render() {
    const user = this.props.user;
    return (
      <div>
        <Helmet {...config.app.head}/>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar>
              {user && (
                <LinkContainer to="/counter">
                  <NavItem eventKey={1}>计数器</NavItem>
                </LinkContainer>)}
            </Nav>
            <Nav navbar pullRight>
              {!user && (
                <LinkContainer to="/login">
                  <NavItem eventKey={4}>登录</NavItem>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          {/* this will render the child routes */}
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}

export default Main;
