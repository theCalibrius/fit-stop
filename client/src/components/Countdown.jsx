import React from 'react'
import ReactDOM from 'react-dom'
import {
  Jumbotron
} from "react-bootstrap";


var Countdown = (props) => (
  <Jumbotron className="text-center">
    <h1>Get Ready!</h1>
    <div className="countdownCircle">
      <span className="countdownNumber">{props.countdown}</span>
    </div>
  </Jumbotron>
);


export default Countdown;
