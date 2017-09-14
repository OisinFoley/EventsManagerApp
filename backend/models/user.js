var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');


//need username validator RegExp
//bcrypt for pword
//need regex for dates too

var user = {
  uuid: { type:String, required:true, unique:true },
  username : { type:String, lowercase:true, required:true, unique:true },
  fullname : { type:Date,  required:true },
  // going to allow users to leave end date blank and handle accordingly. an event may have an indefinite period of days it runs for/over
  email : { type:Date },
  password : { type:String, lowercase:true, required:true },
  joinDate : { type:Date, lowercase:true }
}
