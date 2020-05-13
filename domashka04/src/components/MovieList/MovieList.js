import React, { Component } from 'react';

import { Link } from 'react-router-dom';
class MovieList extends Component {
  render() {
    const { movies, location } = this.props;
    return (
      <ul style={{ listStyle: 'none' }}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={
                {
                  pathname: `movies/${movie.id}`,
                  state: { from: this.props.match.url, query: location.search },
                }
                // `movies/${movie.id}`
              }
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default MovieList;
