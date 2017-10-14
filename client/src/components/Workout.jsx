import React from 'react'
import ReactDOM from 'react-dom'
import Timer from './Timer.jsx'
import Exercise from './Exercise.jsx'
import {
  Jumbotron,
  Button,
  Col,
  ButtonToolbar
} from "react-bootstrap";

class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warmupActive: false,
      workoutActive: false,
      cooldownActive: false
    }
    this.highlightActiveTitle.bind(this);
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  sets css on mount and updates with current exercise (triggered on timer() on App.js)
* * * * * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * *  * * * * * * * * * * */

  componentDidMount() {
    this.highlightActiveTitle();
  }

  highlightActiveTitle() {
    if (this.props.exercise.type === 'warmup') {
      this.setState({warmupActive: true, workoutActive: false, cooldownActive: false});
    } else if (this.props.exercise.type === 'workout') {
      this.setState({warmupActive: false, workoutActive: true, cooldownActive: false});
    } else if (this.props.exercise.type === 'cooldown') {
      this.setState({warmupActive: false, workoutActive: false, cooldownActive: true});
    } else {
      console.log('workout type does not exist')
    }
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Change css based on which exercise type
* * * * * * * * * * * * * * * * * * * * * * * * * * */

   render() {
    return (
      <Jumbotron className="text-center">
        <span className={'warmupTitle ' + (this.state.warmupActive ? 'activeTitle' : null)}>Warmup</span>
        <span className={'workoutTitle ' + (this.state.workoutActive ? 'activeTitle' : null)}>Workout</span>
        <span className={'cooldownTitle ' + (this.state.cooldownActive ? 'activeTitle' : null)}>Cooldown</span>

        <Timer timer= {this.props.timer} />
        <Exercise exercise={this.props.exercise} />


        <div className="well">
            <ButtonToolbar>
              <Button onClick={this.props.goToDashboard} bsStyle="primary" block>Quit & Back To Dashboard</Button>

              <Button onClick={this.props.goToSummary} bsStyle="primary" block>Summary</Button>
            </ButtonToolbar>
        </div>




      </Jumbotron>
    );
  }

} // End of Class


export default Workout;
