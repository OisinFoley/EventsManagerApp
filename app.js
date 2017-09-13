/*I've used var in the past but this SO answer gives weight toward the use of const instead
https://stackoverflow.com/questions/21237105/const-in-javascript-when-to-use-it-and-is-it-necessary*/

/*
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
//morgan is for my own use, colours the terminal messages to make erros stand out
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const appRoutes = require('./backend/appRoutes/api');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + 'frontend'));



mongoose.connect('mongodb://localhost:27017/', function(err){
	if(err){
		console.log("NOT connected to the db: " + err);
	} else {
		console.log("Successfully connected to db");
	}
});


//app.get('/', function(req,res){
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/frontend/index.html' ));
})

// server.listen(port, function(){
app.listen(port, function(){
	console.log('running NodeJs server on port : ' + port);
});

*/

'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://ofoleyend.eu.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'https://VueEventsAPI.com',
    iss: "ofoleyend.eu.auth0.com",
    algorithms: ['RS256']
});

app.get('/api/events/public', (req, res) => {
  let publicEvents = [
  {
    id: 1111,
    title: "Chelsea Flower Show",
    startdate: "28/09/2017",
    enddate: "29/09/2017",
    location: "Royal Hospital Chelsea",
    description: "Come take in the last of the beauties of Summer before the Winter kicks in."
  },
  {
    id: 1112,
    title: "Antique Roadshow",
    startdate: "24/09/2017",
    enddate: "26/09/2017",
    location: "Stanley Park, Liverpool",
    description: "The Anti Roadshow comes to the outdoors across 3days this September."
  },
  {
    id: 1119,
    title: "Grand Opening of XYZ Centre",
    startdate: "15/09/2017",
    enddate: "15/09/2017",
    location: "XYZ Centre, Brentford",
    description: "Grand opening of the newly renovated XYZ centre. Come along for an enjoyable evening with refreshments."
  }];

  res.json(publicEvents);
})

app.get('/api/events/private', authCheck, (req,res) => {
  let privateEvents = [
  {
    id: 2111,
    title: "ABC Memorial Vigil",
    startdate: "17/09/2017",
    enddate: "17/09/2017",
    location: "ABC Grand Hall",
    description: "Vigil for those who perished in the great something of 1899"
  },
  {
    id: 2112,
    title: "An evening with Mr. M N O",
    startdate: "21/09/2017",
    enddate: "23/09/2017",
    location: "Haberdashers' Hall",

    description: "3 Nights with the legendary M N O as he entertains with anecdotes from his earlier career"
  },
  {
    title: "Science Museum Exhibition",
    startdate: "23/09/2017",
    enddate: "30/09/2017",
    location: "Science Museum, London",
    description: "Free exhibition all this week at SM, London. Normally £14pp"
  }];

  res.json(privateEvents);
})

app.listen(3333);
console.log('Listening on localhost:3333');
