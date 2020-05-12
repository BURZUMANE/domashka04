import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
class MovieList extends Component {
  render() {
    const { movies, location, search } = this.props;
    return (
      <Fragment>
        {movies && (
          <ul style={{ listStyle: 'none' }}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `movies/${movie.id}`,
                    state: { from: location, search },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Fragment>
    );
  }
}

export default MovieList;
