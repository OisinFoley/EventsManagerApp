var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

var titleValidator = [
  validate({
    validator: 'matches',
    arguments: /^(([\sa-zA-Z0-9?\/,.!"'£#$€&%()])+)$/,
    message: 'The only valid symbols are: ? \ / , . ! " \' £ # $ € & % ( ) - : @.'
  }),
  validate({
    validator: 'isLength',
    arguments: [1,80], //first and last name can each be between 3 and 20, but overall length has to be less than 30
    message: 'Title must be between {ARGS[0]} and {ARGS[1]} in length'
  })
];

var dateValidator = [
  validate({
    validator: 'matches',
    //dd-mm-yyyy

    //Was having trouble passing validation with these for a while, even though it passed on regexpal.com
    //Turns out it's because I had set the datatypes of the dates to Date, so they wern't being read as strings when passed from client.
    //A lovely hour or so wasted. Have only persisted with a string datatype rather than date itself because of the time spent.
    //The native date type is probably the better option
    arguments: /(0[1-9]|[12][0-9]|3[01])[\- /](0[1-9]|1[012])[\- /][0-9]{4}$/,
    // arguments: /(0[1-9]|[12][0-9]|3[01])[\- /](0[1-9]|1[012])[\- /][0-9]{4}/,
    // arguments: /^(0[1-9]|[12][0-9]|3[01])[\-](0[1-9]|1[012])[\-][0-9]{4}$/,
    message: 'Must provide date in format DD-MM-YYYY or DD/MM/YYYY'
  })
];




//do rest of validation after we confirm CRUD operations


// going to allow users to leave end date blank and handle accordingly. an event may have an indefinite period of days it runs for/over
var eventSchema = new Schema({
  uuid: { type:String, required:true, unique:true },
  title:{ type:String, lowercase:true, required:true, unique:true, validate : titleValidator },
  startDate:{ type:String, required:true, validate: dateValidator },
  endDate:{ type:String, dateValidator },  
  location:{ type:String, lowercase:true, required:true },
  description:{ type:String, lowercase:true }
});

eventSchema.plugin(titlize, {
  paths: [ 'title' ]
});

module.exports = mongoose.model('Event', eventSchema);
