import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import * as articleAPI from '../services/services';
import Cast from './Cast';
import Reviews from './Reviews';
const getIdFromProps = props => props.match.params.id;

class MovieDetailsPage extends Component {
  state = { movie: null, retreat: null };
  componentDidMount() {
    const id = getIdFromProps(this.props);
    this.updateMovies(id);
  }
  updateMovies = async value => {
    const getMovie = await articleAPI.fetchMovie(value);
    const movie = getMovie.data;
    this.setState({ movie });
    this.setState({ retreat: this.props.location.state });
    console.log(this.state);
  };
  goBack = () => {
    console.log(this.state.retreat.query);
    this.props.history.push({
      pathname: this.state.retreat.from,
      search: this.state.retreat.query,
    });
  };

  render() {
    const { movie } = this.state;
    return (
      <>
        <h1>Movie details</h1>
        <div>
          {movie && (
            <>
              <h2>{movie.title}</h2>
              <img
                src={
                  'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' +
                  movie.poster_path
                }
                alt={movie.title}
              ></img>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <button
                style={{ display: 'block', width: '100%' }}
                onClick={this.goBack}
              >
                Go back
              </button>
              <Link
                style={{ marginRight: 20 }}
                to={{
                  pathname: `/movies/${this.props.match.params.id}/cast`,
                }}
              >
                Cast
              </Link>
              <Link
                to={{
                  pathname: `/movies/${this.props.match.params.id}/reviews`,
                }}
              >
                Reviews
              </Link>
              <Switch>
                <Route exact path={`/movies/:id/cast`} component={Cast} />
              </Switch>
              <Switch>
                <Route exact path={`/movies/:id/reviews`} component={Reviews} />
              </Switch>
            </>
          )}
        </div>
      </>
    );
  }
}

export default MovieDetailsPage;
