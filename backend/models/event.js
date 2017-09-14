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

var titleValidator = [
  validate({
    validator: 'matches',
    //dd-mm-yyyy
    arguments: /(0[1-9]|[12][0-9]|3[01])[\- /](0[1-9]|1[012])[\- /][0-9]{4}/,
    message: 'Must provide date in format DD-MM-YYYY or DD/MM/YYYY'
  })
];




//do rest of validation after we confirm CRUD operations


var eventSchema = new Schema({
  uuid: { type:String, required:true, unique:true },
  title:{ type:String, lowercase:true, required:true, unique:true, validate : titleValidator },
  startDate:{ type:Date, required:true, validate: },
  // going to allow users to leave end date blank and handle accordingly. an event may have an indefinite period of days it runs for/over
  endDate:{ type:Date },
  location:{ type:String, lowercase:true, required:true },
  description:{ type:String, lowercase:true }
});

eventSchema.plugin(titlize, {
  paths: [ 'title' ]
});

module.exports = mongoose.model('Event', eventSchema);
