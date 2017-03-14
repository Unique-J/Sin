import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem,
  Thumbnail, Button, FormGroup,
  FormControl
} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Helmet from 'react-helmet';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'One'
    };
  }

  updateValue = (value) => {
    this.setState({
      selectValue: value
    });
  };

  render() {
    const styles = require('./Register.scss');
    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
    ];
    return (
      <div className={styles.container}>
        <Helmet
          link={[{ rel: 'stylesheet', href: 'https://unpkg.com/react-select/dist/react-select.css' }]}
        />
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
            <form>
              <div className={styles.register_text}>注 册</div>
              <FormGroup>
                <FormControl
                  type="text"
                  className={styles.email_input}
                  placeholder="你目前使用的邮箱地址"
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="password"
                  className={styles.pwd_input}
                  placeholder="密&nbsp;&nbsp;码"
                />
              </FormGroup>
              <Select
                name="form-field-name"
                value={this.state.selectValue}
                options={options}
                onChange={this.updateValue}
              />
              <Select
                name="form-field-gender"
                value={this.state.selectValue}
                options={options}
                onChange={this.updateValue}
              />
              <Button
                type="submit" block
                bsSize="large"
                className={styles.submit_button}
              >
                继&nbsp;续
              </Button>
            </form>
          </Thumbnail>
        </div>
      </div>
    );
  }
}

export default Register;
