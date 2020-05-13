import React, { Component } from 'react';
import MovieList from '../components/movieList/MovieList';
import * as articleAPI from '../services/services';
class Home extends Component {
  state = { movies: null };
  componentDidMount() {
    this.updateMovies();
  }

  updateMovies = async () => {
    const result = await articleAPI.fetchMovies();
    const movies = result.data.results;
    this.setState({ movies });
  };
  render() {
    const { movies } = this.state;
    return (
      <>
        <h1>Home</h1>
        <h2>Popular movies </h2>
        {movies && <MovieList {...this.props} movies={movies} />}
      </>
    );
  }
}

export default Home;
