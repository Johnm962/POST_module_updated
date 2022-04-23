import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css';

function NavBar() {
 return (
  <nav>
    <ul>
      <li><Link to='/' >Add</Link></li>
      <li><Link to='/list' >List</Link></li>
    </ul>
  </nav>
 );
}

export default NavBar;
