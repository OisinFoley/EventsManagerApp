var User  		   = require('../models/user');
var Event  	   = require('../models/event');
var mongoose = require('mongoose');


module.exports = function(router,app){

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
