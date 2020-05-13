import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';

import * as articleAPI from '../services/services';
import MovieList from '../components/movieList/MovieList';
class Movies extends Component {
  state = { movies: '', query: '' };

  componentDidMount() {
    // console.log(this.props.location.search);
    const queryParams = queryString.parse(this.props.location.search);
    // console.log(queryParams.query);
    if (queryParams.query) {
      this.updateMovies(queryParams.query);
    }
  }

  componentDidUpdate(prevProps) {
    const prevQuery = queryString.parse(prevProps.location.search);
    const currentQuery = queryString.parse(this.props.location.search);
    if (prevQuery.query !== currentQuery.query) {
      this.updateMovies(currentQuery.query);
    }
  }
  updateMovies = async value => {
    const movies = await articleAPI.fetchMovieByQuery(value);
    this.setState({ movies });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${e.target.search.value}`,
    });
  };
  render() {
    const { movies } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="..." name="search"></input>
          <button>Search</button>
        </form>
        {movies ? (
          <MovieList {...this.props} movies={movies} />
        ) : (
          //   <ul style={{ listStyle: 'none' }}>
          //     {movies.map(movie => (
          //       <li key={movie.id}>
          //         <Link to={`${this.props.match.path}/${movie.id}`}>
          //           {movie.title}
          //         </Link>
          //       </li>
          //     ))}
          //   </ul>
          <p>Please, look for something</p>
        )}
      </>
    );
  }
}

export default Movies;
