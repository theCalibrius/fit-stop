import React from 'react'
import ReactDOM from 'react-dom'
import {
  Jumbotron
} from "react-bootstrap";


var PastWorkout = (props) => (
  <div>
    <p> <span className="dateAndTime">{props.date}</span> | <span>{props.lengthOfWorkout} minutes</span> </p>
  </div>
);


export default PastWorkout;
