import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/nav/Nav';
import Movies from './pages/Movies';
import MovieDetailsPage from './pages/MovieDetailsPage';

const containerStyles = {
  maxWidth: 1170,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: 'padding: 0 16px',
};

const App = () => (
  <div style={containerStyles}>
    <Nav />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/movies/:id" component={MovieDetailsPage} />
      <Route path="/movies" component={Movies} />
    </Switch>
  </div>
);
export default App;
