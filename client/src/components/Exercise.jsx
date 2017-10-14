import React from 'react'
import ReactDOM from 'react-dom'
import {
  Jumbotron
} from "react-bootstrap"


var Exercise = (props) => (
  <Jumbotron>
    <div className="exerciseDescription">
      <img src={props.exercise.picture} className="img-responsive center-block"/>
      <p><span className="exerciseName">{props.exercise.name}</span></p>
      {props.exercise.description}
    </div>
  </Jumbotron>
);


export default Exercise;
