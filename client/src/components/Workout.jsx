import React from 'react'
import ReactDOM from 'react-dom'
import Timer from './Timer.jsx'
import Exercise from './Exercise.jsx'
import {
  Jumbotron,
  Button,
  Col,
  Grid,
  Row,
  ButtonToolbar
} from "react-bootstrap";

const wellStyles = {maxWidth: 400, margin: 'auto'};

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
      <div className="main-container">
      <Grid className="fluid">
      <Row>
        <Col xs={4}  md={4}>
          <span className={'warmupTitle ' + (this.state.warmupActive ? 'activeTitle' : null)}>Warmup</span>
        </Col>
        <Col  xs={4}  md={4}>
          <span className={'workoutTitle ' + (this.state.workoutActive ? 'activeTitle' : null)}>Workout</span>
        </Col>
        <Col  xs={4}  md={4}>
          <span className={'cooldownTitle ' + (this.state.cooldownActive ? 'activeTitle' : null)}>Cooldown</span>
        </Col>
      </Row>  
 
        <Timer timer= {this.props.timer} />
        <Exercise exercise={this.props.exercise} />
        <ButtonToolbar className="ButtonToolbar">
          <Button onClick={this.props.pauseWorkout} bsStyle={this.props.pauseButtonStyle} bsSize="large">{this.props.pauseButtonText}</Button>
          <Button onClick={this.props.goToDashboard} bsStyle="warning" bsSize="large">Quit & Back To Dashboard</Button>
          <Button onClick={this.props.goToSummary} bsStyle="info" bsSize="large">Summary</Button>
        </ButtonToolbar>
        </Grid>
        </div>


    );
  }

} // End of Class


export default Workout;
