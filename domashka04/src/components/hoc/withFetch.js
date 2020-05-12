import React, { Component } from 'react';

const withFetch = (url) => (BaseComponent) => {
  return class WithFetch extends Component {
    render() {
      console.log(url);
      return <BaseComponent {...this.props} />;
    }
  };
};

export default withFetch;
