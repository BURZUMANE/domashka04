import React, { Component } from 'react';
import { fetchMovieCast } from '../../../services/fetchMovies';

export default class Cast extends Component {
  state = { cast: null };
  componentDidMount() {
    this.updateState();
  }

  updateState = async () => {
    try {
      const movieId = this.props.id;
      const cast = await fetchMovieCast(movieId);
      const actualCast = cast.data.cast;
      this.setState({ cast: actualCast });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { cast } = this.state;
    console.log(cast);
    return (
      <div>
        {cast && (
          <ul>
            {cast.map((item) => (
              <li key={item.cast_id}>
                <h2>{item.character}</h2>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
