/**
 * A basic server for handling the Angular app and basic backend functions
 */

// Node lets us load in any json file as an object
// __dirname is a node variable that holds the current working directory path
var express = require('express');
var app = express();

// Middleware -- processes parts of the requests to make data more accessible
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var logger = require('morgan')('dev');

// Host the Angular app as a static folder to simulate frontend
// Express uses a middleware-type style: extensible and flexible
app.use(express.static(__dirname + '/app'));
// Parse json requests and write request logs to the console
app.use(jsonParser);
app.use(logger);

//Firebase Database
var firebase = require("firebase");
//User + Opportunity Classes
var User = require("./userClass.js");
var Opportunity = require("./oppsClass.js");

firebase.initializeApp({
  serviceAccount: __dirname + "/" + "serviceAccount.json",
  databaseURL: "https://step-5ffe5.firebaseio.com"
});

//Saving Data + Incorporating Database
var db = firebase.database();
var userRef = db.ref("users");
var opRef = db.ref("opportunities");


//USERS
//Creating a User
app.post('/users', function(request, response){
  user = new User(request.body);
  userRef.push(user);
  //console.log(request.body);
  response.status(201).send('Success!');
});

//For actual database logins, use FirebaseSimpleLogin system
//We will use a basic login method here.

/*
//Searches for a User, displays all info
app.get('/users/:userName', function(request, response){
  var userName = request.params.userName;
  userRef.orderByChild("userName").equalTo(userName).once("value",function(query){
    query.forEach(function(snapshot){
      response.status(201).send(new User(snapshot.val()));
    });
  }, function(error){
      console.log("ERROR" + error);
      response.status(400).send(error);
  });
});
*/

//Logging in
app.post('/login', function(request, response){
  //Gets email
  var email = request.body.email;
  var password = request.body.password;
  userRef.orderByChild("email").equalTo(email).once("value",function(query){
    query.forEach(function(snapshot){
      var user = new User(snapshot.val());
      //Checks password
      if (user.checkPassword(password)){
        response.status(201).send("You have successfully logged in!");
      }
      else {
        response.status(401).send("Incorrect username or password.");
      }
    });
  }, function(error){
      console.log("ERROR" + error);
      response.status(400).send(error);
  });
});



//OPPORTUNITIES
//Creating an Opportunity
app.post('/opportunities', function(request, response){
  opportunity = new Opportunity(request.body);
  opRef.push(opportunity);
  console.log(request.body);
  response.status(201).send('Success!');
});


// THIS SHOULD ALWAYS BE THE LAST CALL IN THIS FILE
// The first parameter is the port, the second is an optional callback on success.
app.listen(8080, function() {
    console.log("App is running on localhost:8080");
});
