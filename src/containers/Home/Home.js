import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Home extends Component { // eslint-disable-line
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <div>
        <Helmet title="主页"/>
        <div>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}
