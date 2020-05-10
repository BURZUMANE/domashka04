import React, { Component, Fragment } from 'react';
import MovieSearch from '../components/movieSearch/MovieSearch';
import { fetchMovieByQuery } from '../services/fetchMovies';
import queryString from 'query-string';
import MovieList from '../components/MovieList/MovieList';

class Movies extends Component {
  state = {
    query: '',
    movies: null,
  };
  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    if (parsed.query) {
      this.updateMovies(parsed.query);
    } else if (this.state.query.length) {
      this.updateMovies(this.state.query);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.updateMovies(this.state.query);
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    await this.setState({ query });
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${this.state.query}`,
    });
  };
  updateMovies = async (value) => {
    try {
      const fetchResult = await fetchMovieByQuery(value);
      this.setState({ movies: fetchResult });
    } catch (error) {
      console.warn(error);
    }
  };
  getQueryString = (props) => {
    return queryString.parse(props.location.search);
  };
  render() {
    const { movies } = this.state;
    const { location } = this.props;
    return (
      <Fragment>
        <MovieSearch onChange={this.onChange} onSubmit={this.onSubmit} />
        {movies ? (
          <MovieList movies={movies} location={location} />
        ) : (
          <p>Nothing for you</p>
        )}
      </Fragment>
    );
  }
}

export default Movies;
