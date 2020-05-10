import React, { Component, lazy, Suspense } from 'react';
import { Route, Link } from 'react-router-dom';
import { fetchMovie } from '../../services/fetchMovies';
import Article from '../article/Article';
import Cast from './cast/Cast';
// import Reviews from './reviews/Reviews';
import Select from 'react-select';
// import Loadable from 'react-loadable';
const AsyncReviews = lazy(() => import('./reviews/Reviews'));
const options = [
  { value: 'cast', label: 'Cast' },
  { value: 'reviews', label: 'Reviews' },
];

class SingleMovie extends Component {
  state = {
    movie: null,
    cast: null,
    selectedOption: 'Cast',
  };
  componentDidMount() {
    this.updateState();
  }

  updateState = async () => {
    const movieId = this.props.match.params.movieId;
    const movie = await fetchMovie(movieId);
    this.setState({ movie: movie.data });
  };

  handleGoBack = () => {
    const { location } = this.props;
    location
      ? this.props.history.push(location.state.from)
      : this.props.history.push('/home');
  };
  handleChange = async (selectedOption) => {
    await this.setState({ selectedOption });
    this.props.history.push(
      this.props.match.url + '/' + this.state.selectedOption.value
    );
  };
  render() {
    const { movie } = this.state;
    return (
      <>
        {movie && (
          <>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={options}
            />
            <Article {...movie} goBack={this.handleGoBack} />
            <Link
              style={{ paddingRight: 10 }}
              to={{
                pathname: `${this.props.match.url + '/cast'}`,
                // search: '?category=adventure',
                // hash: '#treasure-island',
                // state: { from: this.props.match.url },
              }}
            >
              cast
            </Link>
            <Link
              to={{
                pathname: `${this.props.match.url + '/reviews'}`,
                // search: '?category=adventure',
                // hash: '#treasure-island',
                // state: { from: this.props.match.url },
              }}
            >
              reviews
            </Link>
            <Route
              path={this.props.match.path + '/cast'}
              render={(props) => (
                <Cast {...props} id={this.props.match.params.movieId} />
              )}
            />
            <Route
              path={this.props.match.path + '/reviews'}
              render={(props) => (
                <Suspense>
                  <AsyncReviews
                    {...props}
                    id={this.props.match.params.movieId}
                  />
                </Suspense>
              )}
            />
          </>
        )}
      </>
    );
  }
}

export default SingleMovie;
