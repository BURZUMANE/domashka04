import React from 'react';
export default function SingleMovieItem({
  title,
  poster_path,
  overview,
  goBack,
}) {
  return (
    <article>
      <img
        src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + poster_path}
        alt=""
      ></img>
      <h2>{title}</h2>
      <p>{overview}</p>
      <button type="button" onClick={goBack}>
        Go back
      </button>
    </article>
  );
}
