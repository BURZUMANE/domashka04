import React, { Component, lazy, Suspense } from 'react';
import { Route, Link } from 'react-router-dom';
import { fetchMovie } from '../../services/fetchMovies';
import Article from '../article/Article';
import Cast from './cast/Cast';
import Select from 'react-select';

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
    query: '',
  };
  componentDidMount() {
    console.log(this.props);
    this.props.location.state.search &&
      this.setState({
        query: this.props.location.state.search,
      });
    this.updateState();
  }

  updateState = async () => {
    const movieId = this.props.match.params.movieId
      ? this.props.match.params.movieId
      : '121';
    console.log(movieId);
    try {
      const movie = await fetchMovie(movieId);
      this.setState({ movie: movie.data });
    } catch (eror) {
      console.log(eror);
      this.props.history.push('/notfound');
    }
  };

  handleGoBack = () => {
    const { location, history } = this.props;
    location.state.search
      ? history.push({
          pathname: this.props.location.state.from,
          state: { from: location },
          search: this.state.query,
          // search: location.state.search ? this.state.query : '',
        })
      : history.push('/');
  };
  handleChange = async (selectedOption) => {
    await this.setState({ selectedOption });
    this.props.history.push(
      this.props.match.url + '/' + this.state.selectedOption.value
    );
  };
  render() {
    // console.log(this.props.location.state.search);
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
                state: {
                  from: this.props.location.state.from,
                  search: this.props.location.state.search,
                },
              }}
            >
              cast
            </Link>
            <Link
              to={{
                pathname: `${this.props.match.url + '/reviews'}`,
                state: {
                  from: this.props.location.state.from,
                  search: this.props.location.state.search,
                },
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
