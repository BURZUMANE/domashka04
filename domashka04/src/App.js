import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';

// import SingleMovie from './components/SingleMovie/SingleMovie';
const AsyncHome = lazy(() => import('./pages/Home'));
const AsyncSingleMovie = lazy(() =>
  import('./components/SingleMovie/SingleMovie')
);
const AsyncMovie = lazy(() => import('./pages/Movies'));
const AsyncNotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <Nav />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact component={AsyncHome} />
          <Route path="/movies/:movieId" component={AsyncSingleMovie} />
          <Route path="/movies" component={AsyncMovie} />
          <Route component={AsyncNotFound} />} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
