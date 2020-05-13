import React from 'react';
import { NavLink } from 'react-router-dom';

const navStyles = {
  backgroundColor: 'pink',
  display: 'flex',
  listStyle: 'none',
};
const ativeStyle = {
  color: 'palevioletred',
};

const Nav = () => (
  <ul style={navStyles}>
    <li>
      <NavLink to="/" exact activeStyle={ativeStyle}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/movies" activeStyle={ativeStyle}>
        Movies
      </NavLink>
    </li>
  </ul>
);

export default Nav;
