var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
//morgan is for my own use, colours the terminal messages to make erros stand out
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

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

app.get('*', function(req,res){
	// res.sendFile(path.join(__dirname + '/public/app/views/index.html' ));
  res.sendFile(path.join(__dirname + '/frontend/index.html' ));
})

// server.listen(port, function(){
app.listen(port, function(){
	console.log('running NodeJs server on port : ' + port);
});
