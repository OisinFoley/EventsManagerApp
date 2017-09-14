/*I've used var in the past but this SO answer gives weight toward the use of const instead
https://stackoverflow.com/questions/21237105/const-in-javascript-when-to-use-it-and-is-it-necessary*/

'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

//const port = process.env.PORT || 8080;
//morgan is for my own use, colours the terminal messages to make erros stand out
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();

const appRoutes  = require('./backend/appRoutes/api')(router,app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(morgan('dev'));

//app.use(express.static(__dirname + 'frontend'));


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


app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/', function(err){
	if(err){
		console.log("NOT connected to the db: " + err);
	} else {
		console.log("Successfully connected to db");
	}
});

app.listen(3333);
console.log('Listening on localhost:3333');
