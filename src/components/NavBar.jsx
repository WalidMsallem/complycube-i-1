import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#ddd' }}>
      <Link to="/home" style={{ margin: '0 1rem' }}>Home page</Link>
      <Link to="/" style={{ margin: '0 1rem' }}>Case 1</Link>
      <Link to="/case2" style={{ margin: '0 1rem' }}>Case 2</Link>
      <Link to="/case3" style={{ margin: '0 1rem' }}>Case 3</Link>
      <Link to="/case4" style={{ margin: '0 1rem' }}>Case 4</Link>
    </nav>
  );
};

export default NavBar;