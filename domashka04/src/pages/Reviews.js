import React, { Component } from 'react';
import * as articleAPI from '../services/services';
class reviews extends Component {
  state = { reviews: null };
  componentDidMount() {
    this.updateState();
  }
  updateState = async () => {
    console.log(this.props);
    try {
      const movieId = this.props.match.params.id;
      const reviews = await articleAPI.fetchMovieReviews(movieId);
      const actualReviews = reviews.data.results;
      this.setState({ reviews: actualReviews });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { reviews } = this.state;
    return (
      reviews && (
        <div>
          {reviews.length ? (
            <ul>
              {reviews.map((item, idx) => (
                <li key={idx}>
                  <h2>{item.author}</h2>
                  <p>{item.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            // eslint-disable-next-line jsx-a11y/accessible-emoji
            <h2>No reviews for your today 👞</h2>
          )}
        </div>
      )
    );
  }
}

export default reviews;
