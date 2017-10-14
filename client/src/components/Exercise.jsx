import React from 'react'
import ReactDOM from 'react-dom'
import {
  Jumbotron
} from "react-bootstrap"


var Exercise = (props) => (
  <div className="container-fluid text-center">
    <Jumbotron>
      <img src={props.exercise.picture} className="img-responsive center-block"/>
      <p className="container"><span className="exerciseName">{props.exercise.name}</span></p>
      {props.exercise.description}
    </Jumbotron>
  </div>
);


export default Exercise;
