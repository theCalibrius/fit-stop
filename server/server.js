const express = require('express')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const config = require('../webpack.common.js');
const compiler = webpack(config);
const path = require('path');
const cors =  require('cors');
const db = require('./db').mongoose;
const Exercise = require('./db').exerciseModel;
const User = require('./db').userModel;
const Location = require('./db').userLocationModel;
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
console.log('server is running');
app.use(express.static(__dirname));

app.use(webpackDevMiddleware( compiler, {
  publicPath: config.output.publicPath
}));



app.listen(port || 3000);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/workout', getWorkout);
app.get('/history', getHistory);
app.get('/location', getLocations);

app.post('/addWorkout', addWorkout);
app.post('/login', checkLogin);
app.post('/signup', addSignup);
app.post('/addLocation', addLocation);


/************** fallback route **************************/
app.get('*', (req,res) =>{
  res.sendFile(path.resolve(__dirname, 'index.html'))
});



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Request Handlers
* * * * * * * * * * * * * * * * * * * * * * * * * * */

function getHistory(req, res) {
  var name = req.query.username;
  User.findOne({username: name}, function(err, data) {
    if(err) {
      console.log('err happened with cooldown retrieval: ' + err);
    } else{
      res.send(data.workoutHistory);
    }
  });
}

function getLocations(req, res) {
  var locations = [];
  Location.find({}, (err, data)=> {
    if(err){
      console.log('Error in getting user locations');
    } else {
      res.status(200).send(data);
    }
  });
}

//maybe use this for code repitition in getWorkout function?
function getXtimes(cb,num){
  for(var i = 0; i < num; i++) {
    cb();
  }
}


function getWorkout(req, res) {
  var returnObj = [];

  Exercise.find({type: 'warmup'}, function(err,data) {
    if(err) {
      console.log('err happened with cooldown retrieval: ' + err);
    } else {

      // getXtimes(()=> {
      //   returnObj.push(data[Math.floor(Math.random()*data.length)]);
      // }, 3);


      returnObj.push(data[Math.floor(Math.random()*data.length)]);
      returnObj.push(data[Math.floor(Math.random()*data.length)]);
      returnObj.push(data[Math.floor(Math.random()*data.length)]);

      Exercise.find({type: 'workout'}, function(err,data) {
        if(err) {
          console.log('err happened with cooldown retrieval: ' + err);
        } else {


          // getXtimes(()=> {
          //   returnObj.push(data[Math.floor(Math.random()*data.length)]);
          // }, 9);

          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);

          Exercise.find({type: 'cooldown'}, function(err,data) {
            if(err) {
              console.log('err happened with cooldown retrieval: ' + err);
            } else {

              // getXtimes(()=> {
              //   returnObj.push(data[Math.floor(Math.random()*data.length)]);
              // }, 3);

              returnObj.push(data[Math.floor(Math.random()*data.length)]);
              returnObj.push(data[Math.floor(Math.random()*data.length)]);
              returnObj.push(data[Math.floor(Math.random()*data.length)]);

              console.log('exercise data sent succesfully');
              res.status('200').send(returnObj);
            }
          });
        }
      });
    }
  });
}


function addWorkout(req, res) {
  var name = req.body.username;
  var workoutObj = {};
  workoutObj.currentWorkout = req.body.currentWorkout;
  workoutObj.date = req.body.date;
  workoutObj.lengthOfWorkout = req.body.lengthOfWorkout;

  User.findOne({username: name}, function(err, user) {
    if (err) {
      console.log('err happened with cooldown retrieval: ' + err);
    } else {
      user.workoutHistory.unshift(workoutObj);
      user.save(function(err) {
        if (err) {
          console.log(err + ' error happened!');
        } else {
          console.log('user workouts updated');
          res.status(202).send('user workout history updated');
        }
      });
    }
  });
}


function checkLogin(req, res) {
  var name = req.body.username;
  var pass = req.body.password;

  User.findOne({username:name}, function(err, data) {
    if (err) {
      console.log("Database access error" + err);
    } else {
      if (data) {
        if (bcrypt.compareSync(pass, data.password)=== true) {
          res.status(200).send('Log in success');
        } else {
          res.status(400).send('Login attempt failed');
        }
      } else {
        res.status(400).send('User doesn\'t exist');
      }
    }
  });
}

function addLocation(req, res) {
  var userLocation = req.body.location;
  var lat = req.body.latitude;
  var long = req.body.longitude;
  var id = new ObjectID();

  Location.find({location: userLocation}, (err, data)=>{
    if(err) {
      console.log('DB access error' + err);
    } else {
      if (!data[0]) {
        var newLocation = new Location({
          _id: id,
          latitude: lat,
          longitude: long,
          location: userLocation
        });
        newLocation.save((err)=>{
          if (err) {
            console.log(err);
          } else {
            res.status(200).send('Location Added');
          }
        })

      } else {
        res.status(400).send('Location Exists');
      }
    }
  });
}


function addSignup(req, res) {
  console.log('hitSignup')
  var name = req.body.username;
  var pass = req.body.password;
  var hash = bcrypt.hashSync(pass, salt);
  var id = new ObjectID();

  User.find({username: name}, function(err, user) {
    if (err) {
      console.log("Database access error" + err);
    } else {
      if (!user[0]) {
        var newUser = new User({
          _id: id,
          username: name,
          password: hash,
          preferences: {}
        });
        newUser.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send('User Created');
          }
        });
      } else {
        res.status(400).send('User exists');
      }
    }
  });
}


