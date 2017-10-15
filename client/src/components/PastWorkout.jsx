import React from 'react'
import ReactDOM from 'react-dom'
import {
  Jumbotron
} from "react-bootstrap";
import Moment from 'react-moment';


var PastWorkout = (props) => (
  <div>
    <p> <span className="dateAndTime">{props.date}</span> | <span>{props.lengthOfWorkout} minutes</span> </p>
  </div>
);


export default PastWorkout;
