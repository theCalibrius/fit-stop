// import React from 'react'
// import ReactDOM from 'react-dom'
//
//
//
// var Header = (props) => (
//   <div className="header">
//     {props.showButtons && props.loggedIn && (<button className='blackButton' onClick={props.logOut}>Log Out</button>)}
//     {props.showButtons && !props.loggedIn && (<button className='blackButton' onClick={props.goToLogin}>Log In</button>)}
//     {!props.loggedIn && props.showButtons && (<button className='blackButton' onClick={props.goToSignUp}>Sign Up</button>)}
//     <div>
//       <h1> FitStop <span className='username'>{props.username}</span></h1>
//     </div>
//   </div>
// );
//
// export default Header;

import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/Menuitem';
import NavItem from 'react-bootstrap/lib/Navitem';
import Button from 'react-bootstrap/lib/Button';

var Header = (props) => (

  <Navbar collapseOnSelect staticTop className="navbar">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Fit-Stop</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {props.showButtons && props.loggedIn && (
          <NavItem><Button bsStyle="danger" bsSize="medium" onClick={props.logOut}>Log Out</Button></NavItem>
        )}
        {props.showButtons && !props.loggedIn && (
          <NavItem><Button bsStyle="primary" bsSize="medium" onClick={props.goToLogin}>Log In</Button></NavItem>
        )}
        {!props.loggedIn && props.showButtons && (
          <NavItem><Button bsStyle="info" bsSize="medium" onClick={props.goToSignUp}>Sign Up</Button></NavItem>
        )}
        <NavItem><span className='username'>{props.username}</span></NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

);

export default Header;
