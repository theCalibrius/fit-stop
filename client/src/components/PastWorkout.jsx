import React from 'react'
import ReactDOM from 'react-dom'


var PastWorkout = (props) => (
  <div className="pastWorkout">
    <p> <span className="dateAndTime">{props.date}</span> | <span>{props.lengthOfWorkout} minutes</span> </p>
  </div>
);


export default PastWorkout;

