import React, { Component } from 'react';
import * as articleAPI from '../services/services';

export default class Cast extends Component {
  state = { cast: null };
  componentDidMount() {
    this.updateState();
  }

  updateState = async () => {
    console.log(this.props.match.params);
    try {
      const movieId = this.props.match.params.id;
      const cast = await articleAPI.fetchMovieCast(movieId);
      const actualCast = cast.data.cast;
      this.setState({ cast: actualCast });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { cast } = this.state;
    return (
      <div>
        {cast && (
          <ul>
            {cast.map(item => (
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
