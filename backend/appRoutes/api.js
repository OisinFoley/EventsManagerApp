var User  		   = require('../models/user');
var Event  	   = require('../models/event');
var mongoose = require('mongoose');
var uuid = require('node-uuid');


module.exports = function(router,app){

  /*	 USER REGISTRATION	*/
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

  // app.get('/api/events/private', authCheck, (req,res) => {
  app.get('/api/events/private', (req,res) => {

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
  });

return router;
};
