import React, { Component, Fragment } from 'react';
import { fetchMovies } from '../services/fetchMovies';
import MovieList from '../components/MovieList/MovieList';

class Home extends Component {
  state = {
    movies: null,
    message: null,
  };
  componentDidMount() {
    this.updateMovies();
  }

  updateMovies = async () => {
    try {
      const fetchResult = await fetchMovies();
      const movies = fetchResult.data.results;
      this.setState({ movies });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { location } = this.props;
    const { movies } = this.state;
    return (
      <Fragment>
        {movies && <MovieList movies={movies} location={location} />}
      </Fragment>
    );
  }
}

export default Home;
