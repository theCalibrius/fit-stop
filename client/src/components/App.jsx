import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header.jsx'
import Timer from './Timer.jsx'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import Countdown from './Countdown.jsx'
import Workout from './Workout.jsx'
import History from './History.jsx'
import Summary from './Summary.jsx'

import PastWorkout from './PastWorkout.jsx'
//import exampleExerciseData from './src/exampleExerciseData.js'
import '../css/style.css'
import $ from 'jQuery'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentState: 'Dashboard',
      currentWorkout: window.exampleExerciseData,
      currentExercise: 0,
      workoutDate: null,
      workoutHistory: [],
      username: null,
      loggedIn: false,
      countdown: 3,
      time: null,
      showButtons: true,
      workoutLengthInMins: 15,
      alertDisplay: "hide-alert",
      alert: ''
    };

    this.goToWorkout = this.goToWorkout.bind(this);
    this.goToSummary = this.goToSummary.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
    this.goToCountdown = this.goToCountdown.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.getWorkoutHistory = this.getWorkoutHistory.bind(this);
    this.sendWorkoutData = this.sendWorkoutData.bind(this);
    this.logOut = this.logOut.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this. hideAlert = this. hideAlert.bind(this);

  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  The following functions change the view on the app
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  goToDashboard() {
    this.setState({currentState: 'Dashboard'});
    this.setState({showButtons: true});
    if (this.state.loggedIn) {
      this.getWorkoutHistory();
    }
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }

  goToLogin() {
    this.setState({currentState: 'Login'})
  }

  goToSignUp() {
    this.setState({currentState: 'SignUp'})
  }

  goToCountdown() {
    this.setState({currentState: 'Countdown'});
    this.setState({showButtons: false});
    this.setState({currentExercise: 0});
   // this.getExercises(); //uncomment to fetch from db
    this.startCountdown();
  }

  goToWorkout() {
    this.setState({currentState: 'Workout'});
    this.startTimer();
  }

  goToSummary() {
    this.setState({currentState: 'Summary'});
    this.setState({showButtons: true});
    var currentDate = Date();
    this.setState({workoutDate: currentDate});
    clearInterval(this.state.interval);
    if (this.state.loggedIn) {
      this.sendWorkoutData();
    }
  }

  hideAlert(){
    let status = "hide-alert"
    this.setState({alertDisplay:status})
  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  The following functions send requests to the server ////
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  getWorkoutHistory() {
    $.ajax({
      method: 'GET',
      url: '/history',
      dataType: 'json',
      data: {
        username: this.state.username
      },
      complete: (data) => {
        var firstFive = JSON.parse(data.responseText).slice(0, 5);
        this.setState({workoutHistory: firstFive})
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  getExercises() {
    $.ajax({
      method: 'GET',
      url: '/workout',
      dataType: 'json',
      data: {
        lengthOfWorkout: this.state.workoutLengthInMins
      },
      complete: (data) => {
        console.log('exercise data:', data);
        this.setState({currentWorkout: JSON.parse(data.responseText)})
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  sendWorkoutData() {
    $.ajax({
      type: 'POST',
      url: '/addWorkout',
      data: JSON.stringify({
        username: this.state.username,
        date: Date(),
        currentWorkout: this.state.currentWorkout,
        lengthOfWorkout: this.state.workoutLengthInMins
      }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        console.log('succesfully posted data!');
      }
    });
  };

  login(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var username = data.get('username');
    var password = data.get('password');

    $.ajax({
      type: "POST",
      url: '/login',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: 'application/json',
      dataType: 'json',
      complete: data => {
        if (data.responseText === "Log in success") {
          this.setState({username: username});
          this.setState({loggedIn: true});
          this.goToDashboard();
        } else {
          let status = "show-alert"
          let alertText = data.responseText
          this.setState({alertDisplay:status})
          this.setState({alert: alertText })
          this.goToLogin();
        }
      }
    });
  }

  signup(event) {
    console.log('client wants to signup')
    event.preventDefault();
    const data = new FormData(event.target);
    var username = data.get('username');
    var password = data.get('password');

    $.ajax({
      type: "POST",
      url: '/signup',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: 'application/json',
      dataType: 'json',
      complete: data => {
        if (data.responseText === "User Created") {
          this.setState({username: username});
          this.setState({loggedIn: true});
          this.goToDashboard();
        } else {
          let status = "show-alert"
          let alertText = data.responseText
          this.setState({alertDisplay:status})
          this.setState({alert: alertText })
          this.goToSignUp();
        }
      }
    });
  }

  logOut() {
    this.setState({loggedIn: false});
    this.setState({username: null});
    this.goToDashboard();
  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Countdown and Timer Functions
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  startCountdown() {
    this.setState({countdown: 3});
    var interval= setInterval(this.countdown.bind(this), 1000);
    this.setState({interval: interval});
  }

  countdown() {
    var current = this.state.countdown;
    current--;
    this.setState({countdown: current});
    if (this.state.countdown === 0) {
      clearInterval(this.state.interval);
      this.goToWorkout();
    }
  }

  startTimer() {
    var current = this.state.workoutLengthInMins * 60;
    this.setState({time: current});
    var interval = setInterval(this.timer.bind(this), 1000);
    this.setState({interval: interval});
  }

  timer() {
    var current = this.state.time;
    current--;
    this.setState({time: current});
    if (this.state.time <= 0) {
      this.goToSummary();
    } else if (this.state.time % 60 === 0) {
      var next = this.state.currentExercise;
      next++;
      this.setState({currentExercise: next});
      this.refs.workoutPage.highlightActiveTitle();
    }
  }

  formatTime(seconds) {
    var mm = Math.floor(seconds / 60);
    var ss = seconds % 60;
    if (ss < 10) {
      ss = '0' + ss;
    }
    return mm + ':' + ss;
  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Renders the components based ot the current state
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  render() {
    var toBeRendered = () => {
      if (this.state.currentState === 'Dashboard') {
        return (<Dashboard goToCountdown={this.goToCountdown} workoutHistory={this.state.workoutHistory} loggedIn={this.state.loggedIn} />);
      }
      if (this.state.currentState === 'Login') {
          return (<Login login={this.login} 
          alert={this.state.alertDisplay } 
          alertText = {this.state.alert}
          hideAlert={ this.hideAlert} />);
      }
      if (this.state.currentState === 'SignUp') {
          return (<SignUp signup={this.signup} 
          alert={this.state.alertDisplay } 
          alertText = {this.state.alert}
          hideAlert={ this.hideAlert}

           />);
      }
      if (this.state.currentState === 'Countdown') {
          return (<Countdown countdown={this.state.countdown} />);
      }
      if (this.state.currentState === 'Workout') {
        return (<Workout exercise={this.state.currentWorkout[this.state.currentExercise]} timer={this.formatTime(this.state.time)} countdown={this.state.countdown} goToSummary={this.goToSummary} goToDashboard={this.goToDashboard} ref="workoutPage" />);
      }
      if (this.state.currentState === 'Summary') {
        return (<Summary goToDashboard={this.goToDashboard} currentWorkout={this.state.currentWorkout} workoutDate={this.state.workoutDate} workoutLengthInMins={this.state.workoutLengthInMins} loggedIn={this.state.loggedIn} />);
      }
    }

    return (
      <div className = "App">
        <Header username={this.state.username} goToLogin={this.goToLogin} goToSignUp={this.goToSignUp} loggedIn={this.state.loggedIn} logOut={this.logOut} showButtons={this.state.showButtons}/>
        {toBeRendered()}
      </div>
    )
  }

} // End of Class

export default App


/* * * * * * * * * * * * * * * * * * * * * * * * * *
  This file saves an example workout with 15 exercises to an array

  The format of the exercises should be:
  var exercise = {
    name: String,
    description: String,
    type: String (one of the following: cooldown, warmup, exercise)
    picture: String (url of image),
    environment: String (either outdoor or indoor)
    muscleGroup: String
    difficulty: String
  }

* * * * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Warm Up Exercises
* * * * * * * * * * * * * * * * * * * * * * * * * * */

var highKnees = {
  name: 'High Knees',
  description: 'Begin jogging in place, lifting the knees as high as you can. Try to lift your knees up to hip level but keep the core tight to support your back. For a more advanced move, hold your hands straight at hip level and try to touch the knees to your hands as you lift them.Bring the knees towards your hands instead of reaching the hands to the knees!',
  type: 'warmup',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/High_Knees1.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'easy'
}

var catCow = {
  name: 'Cat Cow',
  description: 'Kneel on a mat with your hands and knees shoulder-width apart.Pull your abs in, hunch your back up and flex your spine.Hold the stretch and then release to the starting position.',
  type: 'warmup',
  picture: 'http://dingo.care2.com/pictures/greenliving/uploads/2013/03/Cat-Cow-Poses.jpg',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'easy'
}

var hipCircles = {
  name: 'Hip Circles',
  description: 'Stand tall with your chest up. Move your feet to shoulder-width apart. Place your hands on your hips.Begin the movement by shifting your hips to the left. Bring them forward and to the right in a circular motion. From the right, shift your hips back and to the left.Continue in this circular motion. Stop once to switch directions.',
  type: 'warmup',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Hip_Circles-1.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'easy'
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Workout Exercises
* * * * * * * * * * * * * * * * * * * * * * * * * * */

var flutterKicks = {
  name: 'Flutter kicks',
  description: 'Lie on a mat with your hands under your buttocks and raise your legs slightly, keeping knees straight and ankles together.Keep abs engaged and perform short kicks in an alternating fashion.Repeat as needed and then lower legs to the ground.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Flutter_Kicks_M_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

var plank = {
  name: 'Plank',
  description: 'Get into a face down position on the floor supporting your upper body on your forearms. Your elbows should be bent at 90 degrees.Extend your legs straight out behind you, supporting them on your toes and balls of your feet.Keep your body in a straight line by tightening your abdominal and oblique muscles.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Plank_F_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

var plankKneeToElbow = {
  name: 'Plank Knee to Elbow',
  description: 'Lay face down on the ground with extended legs.Point your toes while you place your hands beneath your shoulders.Push yourself up into the plank position.Maintaining a tight core and flat back, bring your left knee to your right elbow.Pause and slowly return each to the starting point.Repeat with the other side and keep alternating.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Plank_Knee_to_Elbow_F_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

var windshieldWipers = {
  name: 'Windshield Wipers',
  description: 'Lie on an exercise mat, keeping your back flat with no arching of the spine.Extend your arms out beside you at shoulder level, with your palms pressed firmly to the floor. Your upper body should form a “T” shape.Raise your feet off the floor by bending your hips and knees to 90 degree angles. This is the start position.As you exhale, rotate both your thighs to one side until the outer thigh touches the ground or until you feel a stretch in your abs and lower back.Pause briefly, then rotate to the other side without pausing in the start position.When you have rotated to both sides, that is one repetition.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Windshield_wipers_M_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

var reverseCrunch = {
  name: 'Reverse Crunch',
  description: 'Lie flat on an exercise mat on the floor.Extend your legs fully and place your hands palms down, flat on the floor beside you.Keeping your feet together, draw your knees up towards your chest, until your thighs are at 90 degrees to the floor and your calves are parallel to it. This is the start position.As you inhale, curl your hips up off the floor while bringing your knees further towards your chest.Continue the movement until your knees are touching your chest, or as far as comfortable.Hold for a count of one.In a controlled movement, return your legs to the start position, exhaling as you do so.Repeat.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Reverse_Crunch_F_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

var sitUps = {
  name: 'Sit Ups',
  description: 'Lie with knees bent and feet flat on the floor. You can have someone hold your feet or place them under something to keep them steady.Place your hands behind your head, elbows pointing out.Engage your abs and lift your head, neck and shoulders up. Pretend you are holding a small ball under your chin.Hold and then return to starting position.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Sit-up_F_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

var standingCrossBodyCrunches = {
  name: 'Standing Cross-Body Crunches',
  description: 'Standing up straight, bring your hands behind your head so that your elbows are pointed to the sides.Twisting your body, bring your left elbow down and across your body. At the same time, raise your right knee up and across to meet the left elbow.Return to the starting position.Repeat on the other side and continue alternating.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Standing_Cross-body_Crunch1.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

var bicycleCrunches = {
  name: 'Bicycle Crunches',
  description: 'Lie flat on an exercise mat on the floor keeping your lower back straight with no arching of your spine and with your knees bent and feet flat on the floor.Place your hands lightly on the sides of your head.Curl your torso upwards so your shoulders are slightly raised off the floor..Raise your knees until your thighs are at a right angle to the floor and your calves are parallel to the floor. This is the start position.Slowly move your legs in a pedaling action as if you are riding a bicycle.As you do so, exhale and bring your opposing elbow close to each knee by crunching to one side. Left elbow to right knee. Right elbow to left knee.After each crunch, return to the start position inhaling as you do so.Without pausing, repeat the movement to the other side.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Bicycle_Crunches_Air-Bikes_M_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

var doubleSideJacknifes = {
  name: 'Double Side Jacknifes',
  description: 'Bring yourself to the ground and lie on your left side. Be sure to stack your feet.Place your left hand on your side while raising your right arm above your head so that the elbow is pointing towards the sky.Focusing all of the tension and contraction in the obliques, bring your feet up while you raise your upper body. Lead with the right elbow.Hold the contraction and slowly return to the starting position. Do not allow your feet or shoulder to touch the ground.Repeat.',
  type: 'workout',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Double-Side_Jackknife.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'intermediate'
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Cooldown Exercises
* * * * * * * * * * * * * * * * * * * * * * * * * * */

var cobra = {
  name: 'cobra stretch',
  description: 'Lie face down with your hands under your shoulders.Point your feet downwards to lengthen your spine.Slowly push your torso up as far as you comfortably can – try to get your hips to rise off the floor slightly.Hold the stretch and then lower down to starting position.',
  type: 'cooldown',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Cobra_Stretch_M_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'easy'
}

var ragdoll = {
  name: 'Rag Doll',
  description: 'Stand tall with your feet together and arms at your sides.Slowly, bend at the hips while keeping your knees engaged. Allow your upper body to hang over. Let your arms drop as well, dangling in front of you.Once you’re fully bent over and your hands are at your toes, pause and feel the stretch in your hamstrings.',
  type: 'cooldown',
  picture: 'https://www.oxygenmag.com/.image/t_share/MTQ1MzQ3MzE1Njg4Mjg1NzUx/image-placeholder-title.jpg',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'easy'
}

var scorpionStretch = {
  name: 'Scorpion Stretch',
  description: 'Lie face down on a mat or soft surface.Place your hands at your sides for balance.Keeping your shoulders touching the ground, raise the left foot straight up into the air.Bend at the knee and bring your left foot over to your right side. Tap the ground with your toes.Return the left leg to the ground and repeat on the other side.',
  type: 'cooldown',
  picture: 'http://workoutlabs.com/wp-content/uploads/watermarked/Scorpion_M_WorkoutLabs.png',
  environment: 'indoor',
  muscleGroup: 'core',
  difficulty: 'easy'
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Add all the exercises to an array
* * * * * * * * * * * * * * * * * * * * * * * * * * */

window.exampleExerciseData = [highKnees, flutterKicks, cobra, catCow, hipCircles,  plank, plankKneeToElbow, windshieldWipers, reverseCrunch, sitUps, standingCrossBodyCrunches, bicycleCrunches, doubleSideJacknifes,  ragdoll, scorpionStretch];