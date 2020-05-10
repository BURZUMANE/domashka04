import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const fetchMovieByQuery = async (query) => {
  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
  try {
    const fetchStr = `search/movie?api_key=${process.env.REACT_APP_UNIQUE_KEY}&language=en-US&page=1&include_adult=false&query=${query}`;
    const fetchResult = await axios.get(fetchStr);
    return fetchResult.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieReviews = async (id) => {
  // https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1;
  try {
    const fetchStr = `/movie/${id}/reviews?api_key=${process.env.REACT_APP_UNIQUE_KEY}`;
    const fetchMovieCast = await axios.get(fetchStr);
    return fetchMovieCast;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieCast = async (id) => {
  try {
    const fetchStr = `/movie/${id}/credits?api_key=${process.env.REACT_APP_UNIQUE_KEY}`;
    const fetchMovieCast = await axios.get(fetchStr);
    return fetchMovieCast;
  } catch (error) {
    console.log(error);
  }
};
export const fetchMovie = async (id) => {
  try {
    const fetchStr = `movie/${id}?api_key=${process.env.REACT_APP_UNIQUE_KEY}&language=en-US`;
    const fetchMovieInfo = await axios.get(fetchStr);
    return fetchMovieInfo;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = async () => {
  try {
    const fetchStr = `discover/movie?api_key=${process.env.REACT_APP_UNIQUE_KEY}&language=en-US&sort_by=popularity.desc&page=1`;
    const fetchResult = await axios.get(fetchStr);
    return fetchResult;
  } catch (error) {
    console.log(error);
  }
};
