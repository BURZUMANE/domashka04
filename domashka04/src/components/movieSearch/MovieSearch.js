import React, { Component } from 'react';
class MovieSearch extends Component {
  onChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };
  render() {
    const { onChange, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input placeholder="..." onChange={onChange} name="search"></input>
        <button>Search</button>
      </form>
    );
  }
}

export default MovieSearch;
