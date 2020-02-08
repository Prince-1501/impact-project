var mongoose = require('mongoose');
var validator = require('validator');

var User = mongoose.model('User',{
  name:{
    type:String,
    required:true,
    trim:true,
    minlength:2
  },
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:2,
    unique:true,
    validate:{
      validator: validator.isEmail,
      message: '{VALUE} is not Valid Email'
    }
  },
  message:{
    type:String
  }
});

module.exports = {User};
