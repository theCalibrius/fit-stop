import React from 'react'
import ReactDOM from 'react-dom'
import PastWorkout from './PastWorkout.jsx'




var History = (props) => (
  <div className="container-fluid history text-center">
    <h2> History </h2>
    {props.loggedIn && props.workoutHistory.map(indivWorkout => <PastWorkout date={indivWorkout.date} lengthOfWorkout={indivWorkout.lengthOfWorkout} key={indivWorkout._id}/>)}
    {!props.loggedIn && (<span className='historyNotLoggedIn'>You are not currently logged in. Please Log In or Sign Up to view Workout History.</span>)}
  </div>
);


export default History;
