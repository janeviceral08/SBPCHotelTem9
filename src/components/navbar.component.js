import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {


  render() {
    return (
   
      
<div>

<a className="menu"><Link to="/">Hamburger Menu</Link></a>
<a className="menu"><Link to="/" >Website Logo</Link></a>
<a className="menu"><Link to="/">Hotel Name</Link></a>
<a className="menu"><Link to="/create" >Rooms & Suite</Link></a>
<a className="menu"><Link to="/user">Make Reservation</Link></a>
<a className="menu"><Link to="/Home">About Us</Link></a>

{/*
<Link to="/" className="navbar-brand">ExcerTracker</Link>
<Link to="/" className="nav-link">Exercises</Link>
<Link to="/create" className="nav-link">Create Exercise Log</Link>
<Link to="/user" className="nav-link">Create User</Link>
<Link to="/Home" className="nav-link">Home</Link>*/
  }
</div>

    );
  }
}