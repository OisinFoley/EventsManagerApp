var User  		   = require('../models/user');
var Event  	   = require('../models/event');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var jwt 	   	   = require('jsonwebtoken');
var myTokenSecret	       = 'redlorryyellowlorry';

var util = require('util')


module.exports = function(router,app){

// //	{ "_id" : ObjectId("59bc6ede8fc5914119a7c0d7"),
// "endDate" : "14-12-2017",
// "startDate" : "12-12-2017",
// "description" : "bbbbbbbbbb",
// "location" : "ooooooooo",
// "title" : "lllllll",
// "uuid" : "2270d8d2-8b3e-4f7e-ac7b-c2762840f76c", "__v" : 0 }



	router.post('/publicTester', function(req,res){
		console.log("I'M IN PUBLIC TESTER API ROUTE");
		//Event.find({}).select(' uuid title location description startDate endDate').exec(function(err, EventsList){
		Event.find({}).select('endDate startDate description location title uuid').exec(function(err, EventsList){		
			if(err) throw err;

			try{
				res.json({ success:true, message: "We found Event data", listOfEvents:EventsList});
			} catch(err)	{
				console.log("Events list empty or else see next error ...");
				console.log("There was the following error : %s", err);
			}
		});
	});

//Wanted to have 2 separate api end points that client is pointed to, before reidrecting to /api/modifyEvents
//and performing appropriate action based on value of the 'action' key
//server flagging an error : 'no token provided', as no token is sent in the header
	router.post('/addEvent', function(req,res){
			console.log("hit path: /api/addEvent, redirecting to modifyEvents");
			console.log("THE WHOLE REQUEST IS ::: %s", util.inspect(req));

			var string = encodeURIComponent(JSON.stringify(req.body));
  		//res.redirect('/api/modifyEvents?valid=' + string);
			res.redirect('/api/modifyEvents?valid=' + string);
	});

	router.get('/editEvent', function(req,res){
		console.log("hit path: /api/editEvent, redirecting to modifyEvents");

		var string = encodeURIComponent(JSON.stringify(req.body));
		res.redirect('/api/modifyEvents?valid=' + string);
	});

	router.post('/modifyEvents', function(req,res){
		console.log("hit path: /api/modifyEvents, a CRUD operation will be attempted");
		var requestBody = req.query.valid;
		//console.log("requestbody is ::: %s", JSON.stringify(requestbody));

    var d = new Date();
		var currentDateTime = new Date().toLocaleString();

		var event = new Event();
		event.uuid = uuid.v4();
		event.title = req.body.title;
		event.location = req.body.location;
		event.description 	  = req.body.description;
		event.startDate 	  = req.body.startDate;
    event.endDate 	  = req.body.endDate;

		//this object would be created if our failed redirect had worked out, see /editEvent and /addEvent
		// event.title = requestBody.title;
		// event.location = requestBody.location;
		// event.description 	  = requestBody.description;
		// event.startDate 	  = requestBody.startDate;
    // event.endDate 	  = requestBody.endDate;


		if(req.body.title == null || req.body.title == '' || req.body.location == null || req.body.location == '' || req.body.description == null || req.body.description == '' || req.body.startDate == null || req.body.startDate == '' || req.body.action == null || req.body.action == '' ) {
			res.json({	success:false, message:'Ensure all textbox values were provided'	});
		} else {

			//now check action and perform appropriate action. this adheres to DRY.

			if(req.body.action == 'create'){

				event.save(function(err){
					if (err) { //check validation, then duplication, otherwise send the json response
						if(err.errors != null ){
							if(err.errors.event) {
								console.log(err.errors.title);
								res.json({	success:false, message: err.errors.title.message	});
							} else if(err.errors.location) {
								res.json({	success:false, message: err.errors.location.message	});
							} else if(err.errors.description) {
								res.json({	success:false, message: err.errors.description.message	});
							} else if(err.errors.startDate) {
								res.json({	success:false, message: err.errors.startDate.message	});
								//if err not validation-related, could be duplicate event
							} else{
								res.json({	success:false, message: err	});
							} //note we're checking for err.errors THEN simply just err as it could be an error not logged in the err.errors property
							  //maybe a loss of connection if this is hosted in the cloud
						} else if (err) {
							//signifies duplicate record
							if(err.code == 11000){
								//long message, simple check allows for dynamic message
								/* was gigivng an error, so gone with less specific error output
								if(err.errmsg[61] == "u"){
									res.json({	success:false, message: 'Username already taken'	});
								} else if(err.errmsg[61] == "e"){
									res.json({	success:false, message: 'Email already taken'	});
								}
								*/
								//we only marked uuid and title as unique when modelling schemas through mongoose
								res.json({ success: false, message: 'Event title already exists, try something different.' });
							} else{
								res.json({	success:false, message: err	});
							}
						}
					} else {
						res.json({	success:true, message:'Event added to list. Happy days!'	});

					}
				});
			} else if(req.body.action == 'edit'){
				//perform update...
				Event.update(
					//need to capture uuid from click event on home page when navigating to the edit event view
					//can use dummy value for now to check code integrity
						//{ "uuid": req.body.uuid },
						{ "uuid": "dac76271-96fd-439f-b1df-56d71fad9641" },
						{  $set:
							{
								"title" : req.body.title,
								"location" : req.body.location,
								"description" : req.body.description,
								"startDate" : req.body.startDate,
								"endDate" : req.body.endDate
							}
						},
						function(err, result) {
						    if (err){
						    	res.json({	success:false, message:'Error editing event, try again or come back later.'	});
						    	console.log("An error occurred when updating the event details");
						    }
						    else{
						    	res.json({	success:true, message:'Event details updated!'	});
						    	console.log("event update seems to have worked");
						    }
						});
			}
		}

	});


  /*	 USER REGISTRATION	*/
	//localhost:8080/api/users
	router.post('/users', function(req,res){

    var d = new Date();
		var currentDateTime = new Date().toLocaleString();

		var user = new User();
		user.uuid = uuid.v4();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email 	  = req.body.email;
		user.fullname 	  = req.body.fullname;
    user.joinDate 	  = currentDateTime;
    console.log("the datetime is : %s", currentDateTime);


    //Had wanted to use a switch for better readability, but only able to access object directly or individual property.
    //With that in mind, I opted against writing a switch for each of the properties that we're checking, ie - uname, password, email etc.
		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' || req.body.fullname == null || req.body.fullname == '') {
			res.json({	success:false, message:'Ensure username, password, email and fullname values were provided'	});
		} else {
			user.save(function(err){
				if (err) { //check validation, then duplication, otherwise send the json response
					if(err.errors != null ){
						//res.json({	success:false, message:'username or email already exists'	});
						if(err.errors.name) {
							console.log(err.errors.name);
							res.json({	success:false, message: err.errors.name.message	});
						} else if(err.errors.email) {
							res.json({	success:false, message: err.errors.email.message	});
						} else if(err.errors.username) {
							res.json({	success:false, message: err.errors.username.message	});
						} else if(err.errors.password) {
							res.json({	success:false, message: err.errors.password.message	});
							//if err not validation-related, could be duplicate user
						} else{
							res.json({	success:false, message: err	});
						} //note we're checking for err.errors THEN simply just err
					} else if (err) {
						//signifies duplicate record
						if(err.code == 11000){
							//long message, simple check allows for dynamic message
							/* was gigivng an error, so gone with less specific error output
							if(err.errmsg[61] == "u"){
								res.json({	success:false, message: 'Username already taken'	});
							} else if(err.errmsg[61] == "e"){
								res.json({	success:false, message: 'Email already taken'	});
							}
							*/

							res.json({ success: false, message: 'Username or E-mail already taken' });
						} else{
							res.json({	success:false, message: err	});
						}
					}
				} else {
					// res.json({	success:true, message:'User registered to Database. Let\'s try loggin in!'	});
					res.json({	success:true, message:'User registered to Database. Lets try loggin in!'	});

				}
			});
		}
	});

	//:port/api/login
	router.post('/login',function(req,res){
		console.log("Entered /api/login route");
		//res.send('testing authenticate route');
			User.findOne({ username: req.body.username}).select('uuid username email fullname password').exec(function(err, user){
				if(err) throw err;

				if(!user) { //if user does not exist
					res.json({ success:false, message: 'Could not authenticate user'});
				}
				else if(user) {
					if(req.body.password) { //if a value is provided
						var validPassword = user.comparePassword(req.body.password);
					}
					else {
						res.json({ success:false, message: 'No password provided'})
					}
					if(!validPassword) {
						res.json({ success:false, message: 'Could not authenticate password, try again'})
					}
					else {
						//we're going to decrypt this token, then send it back to the '/me' path, using the middleware directly below
						console.log("in '/api/login', details valid");
						var token = jwt.sign({ uuid: user.uuid, username: user.username, email: user.email }, myTokenSecret, { expiresIn: '1hr' });
						res.json({ success:true, message: 'User authenticated', token:token});
					}
				}
			});
		});


		router.use(function(req, res, next){
		//can get token through 1) request, 2) url, or 3) headers
			var token = req.body.token || req.body.query || req.headers['x-access-token'];

			if(token) { //ie - if there's a token
				// verify a token symmetric, secret defined above earlier
				jwt.verify(token, myTokenSecret, function(err, decoded) {
					//could land here if token has expired, as it'll still be detected..
					if(err) {
						res.json({ success: false, message:'token invalid, an error occurred: ' + err	});
					}
					else{
						req.decoded = decoded;
						next(); //allows program to continue, in our case, '/me' is where we'll see this
								//middleware in use
					}
				});

			} else {
				res.json({ success:false, message: 'no token provided'});
			}
		});


		router.post('/me',function(req,res){
				res.send(req.decoded);
		});




return router;
};
