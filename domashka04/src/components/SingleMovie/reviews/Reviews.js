import React, { Component } from 'react';
import { fetchMovieReviews } from '../../../services/fetchMovies';
class reviews extends Component {
  state = { reviews: null };
  componentDidMount() {
    this.updateState();
  }
  updateState = async () => {
    try {
      const movieId = this.props.id;
      const reviews = await fetchMovieReviews(movieId);
      const actualReviews = reviews.data.results;
      this.setState({ reviews: actualReviews });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { reviews } = this.state;
    console.log(this.state.reviews);

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
