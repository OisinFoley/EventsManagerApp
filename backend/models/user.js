var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');


//allows trailing spaces at end-only, but they're not persisted to db
var usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,25],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} in length'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain letters and numbers only only'
  })
];

var passwordValidator = [
  validate({
    validator: 'matches',
    // ^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}
    // \d is digit, \W not word, digit, or whitespace, ie - we expect a symbol
    //if we use .{3,}, we need a string length of at least 3, not 3 of each condition(a-z and A-Z)
    arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
    message: 'Password needs to have one of each: lowercase character, uppercase character, number, symbol, as well as being 8-35 characters long.'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'not a valid email.'
  }),
  validate({
    validator: 'isLength',
    arguments: [3,25],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} in length'
  })
];


//need username validator RegExp
//bcrypt for pword
//need regex for dates too

var userSchema = new Schema({
  uuid: { type:String, required:true, unique:true },
  username : { type:String, lowercase:true, required:true, unique:true, validate:usernameValidator },
  fullname : { type:Date,  required:true },
  // going to allow users to leave end date blank and handle accordingly. an event may have an indefinite period of days it runs for/over
  email : { type:Date, validate:emailValidator },
  password : { type:String, lowercase:true, required:true, validate:passwordValidator },
  joinDate : { type:Date }
});

userSchema.pre('save', function(next) {
  var user = this; /*whoever comes through this middleware, we have neater access to properties using 'this'*/
  bcrypt.hash(user.password,null,null, function(err,hash){ //encrypts for sending and storing
      if(err) return next(err);
      user.password = hash;
      next(); //allows us to exit function
  });
});

// userSchema.plugin(titlize, {
//   paths: [ 'username' ]
// });

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password); // this.password being the hashed password stored away
}

module.exports = mongoose.model('User', userSchema);
