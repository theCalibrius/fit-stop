import React from 'react'
import ReactDOM from 'react-dom'


var Countdown = (props) => (
  <div className="countdown">
    <h1>Get Ready!</h1>
    <div className="countdownCircle">
      <span className="countdownNumber">{props.countdown}</span>
    </div>
  </div>
);


export default Countdown;
