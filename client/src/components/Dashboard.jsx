import React from 'react'
import ReactDOM from 'react-dom'
import History from './History.jsx'
import {
  Jumbotron
} from "react-bootstrap";


var Dashboard = (props) => (
  <div>
  <Jumbotron className="text-center">
    <h1>Start Workout</h1>
    <div className="startButton">
      <img onClick= {props.goToCountdown} src="../img/pizzablue.png" alt="Start"/>
    </div>
  </Jumbotron>
    <History workoutHistory={props.workoutHistory} workoutDate={props.workoutDate} workoutLength={props.workoutLength} loggedIn={props.loggedIn}/>
  </div>
);


export default Dashboard
