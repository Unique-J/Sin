import React, { Component, PropTypes } from 'react';
import { Nav, Navbar, NavItem, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

export default class Headbar extends Component {
  componentDidMount() {
    const searchInput = this.searchInput;
    searchInput.onblur = this.searchContent;
  }

  searchContent = () => {
    const searchInput = this.searchInput;
    console.log(searchInput.value);
  };

  render() {
    const styles = require('./Headbar.scss');
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
            <NavItem eventKey={1} href="#">
              <span className={`glyphicon glyphicon-home ${styles.icon_link}`}></span>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <span className={`glyphicon glyphicon-send ${styles.icon_link}`}></span>
            </NavItem>
            <NavItem eventKey={3} href="#">
              <span className={`glyphicon glyphicon-comment ${styles.icon_link}`}></span>
            </NavItem>
            <NavItem eventKey={4} href="#">
              <span className={`glyphicon glyphicon-envelope ${styles.icon_link}`}></span>
            </NavItem>
            <NavItem eventKey={5} href="#">
              <span className={`glyphicon glyphicon-user ${styles.icon_link}`}></span>
            </NavItem>
            <NavItem eventKey={6} href="#">
              <span className={`glyphicon glyphicon-pencil ${styles.icon_link}`}></span>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
    );
  }
}
