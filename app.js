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
        // jwksUri: "https:///.well-known/jwks.json"
        jwksUri: "https://ofoleyend.eu/.well-known/jwks.json"
        // ofoleyend
    }),
    // This is the identifier we set when we created the API
    audience: 'https://ofoleyend.eu.auth0.com/api/v2/',
    issuer: "https://ofoleyend.eu.auth0.com",
    algorithms: ['RS256']
});

app.get('/api/battles/public', (req, res) => {
  let publicBattles = [
  {
    id: 1111,
    name: 'Startup NYC',
    sponsor: 'Alec Pesola',
    seedFund: '500k'
  },
  {
    id: 1112,
    name: 'Startup Ontario',
    sponsor: 'Ryan Chenkie',
    seedFund: '750k'
  },
  {
    id: 1113,
    name: 'Startup Uttah',
    sponsor: 'Diego Poza',
    seedFund: '550k'
  },
  {
    id: 1114,
    name: 'Startup Australia',
    sponsor: 'Eugene Kogan',
    seedFund: '500k'
  },
  {
    id: 1115,
    name: 'Startup Buenos Aires',
    sponsor: 'Sebastian Peyrott',
    seedFund: '600k'
  },
  {
    id: 1116,
    name: 'Startup Lagos',
    sponsor: 'Prosper Otemuyiwa',
    seedFund: '650k'
  },
  {
    id: 1117,
    name: 'Startup Oslo',
    sponsor: 'Mark Fish',
    seedFund: '600k'
  },
  {
    id: 1118,
    name: 'Startup Calabar',
    sponsor: 'Christian Nwamba',
    seedFund: '800k'
  },
  {
    id: 1119,
    name: 'Startup Nairobi',
    sponsor: 'Aniedi Ubong',
    seedFund: '700k'
  }];

  res.json(publicBattles);
})

app.get('/api/battles/private', authCheck, (req,res) => {
  let privateBattles = [
  {
    id: 2111,
    name: 'Startup Seattle',
    sponsor: 'Mark Zuckerberg',
    seedFund: '10M'
  },
  {
    id: 2112,
    name: 'Startup Vegas',
    sponsor: 'Bill Gates',
    seedFund: '20M'
  },
  {
    id: 2113,
    name: 'Startup Addis-Ababa',
    sponsor: 'Aliko Dangote',
    seedFund: '8M'
  },
  {
    id: 2114,
    name: 'Startup Abuja',
    sponsor: 'Femi Otedola',
    seedFund: '5M'
  },
  {
    id: 2115,
    name: 'Startup Paris',
    sponsor: 'Jeff Bezos',
    seedFund: '1.6M'
  },
  {
    id: 2116,
    name: 'Startup London',
    sponsor: 'Dave McClure',
    seedFund: '1M'
  },
  {
    id: 2117,
    name: 'Startup Oslo',
    sponsor: 'Paul Graham',
    seedFund: '2M'
  },
  {
    id: 2118,
    name: 'Startup Bangkok',
    sponsor: 'Jeff Clavier',
    seedFund: '5M'
  },
  {
    id: 2119,
    name: 'Startup Seoul',
    sponsor: 'Paul Buchheit',
    seedFund: '4M'
  }];

  res.json(privateBattles);
})

app.listen(3333);
console.log('Listening on localhost:3333');
